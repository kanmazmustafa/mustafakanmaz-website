import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'dart:async'; // Added for StreamSubscription
import 'package:shared_preferences/shared_preferences.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:google_fonts/google_fonts.dart';

// Servisler
import '../../services/practice_service.dart';
import '../../services/quiz_service.dart';
import '../../services/ad_service.dart';
import '../../services/iap_service.dart';
import '../../services/auth_service.dart';

// Modeller ve Sabitler
import '../../core/constants/app_colors.dart';
import '../../core/constants/app_keys.dart';
import '../../core/widgets/bottom_banner_ad.dart';
import '../../core/widgets/premium_dialog.dart'; // Ensure correct import

// Ekranlar
import '../practice/practice_screen.dart';
import '../quiz/quiz_screen.dart';

// Widgetlar
import 'widgets/main_drawer.dart';
import 'widgets/premium_action_button.dart';
import 'widgets/language_selector.dart';
import '../auth/login_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final AdService _adService = AdService();
  final PracticeService _practiceService = PracticeService();
  final QuizService _quizService = QuizService();
  final IAPService _iapService = IAPService();
  final AuthService _authService = AuthService();

  double _overallProgress = 0.0;
  String _selectedState = "Berlin";
  String _selectedLang = "tr";
  bool _isAdFreeNow = false;

  StreamSubscription? _iapSubscription;

  @override
  void initState() {
    super.initState();
    _initializeHomeScreen();

    // Listen to IAP Feedback
    _iapSubscription = _iapService.statusStream.listen((status) {
      if (!mounted) return;

      String? message;
      Color? bgColor;

      switch (status) {
        case "LOADING":
          // Loading indicator eklenebilir
          break;
        case "RESTORE_SUCCESS":
          message = "premium.restore_success".tr();
          bgColor = Colors.green;
          break;
        case "RESTORE_NOT_FOUND":
          message = "premium.restore_not_found".tr();
          bgColor = Colors.orange;
          break;
        case "STORE_UNAVAILABLE":
          message = "premium.store_unavailable".tr();
          bgColor = Colors.red;
          break;
        case "PRODUCT_NOT_FOUND":
          message = "premium.product_not_found".tr();
          bgColor = Colors.red;
          break;
        case "ERROR":
          message = "premium.restore_error".tr();
          bgColor = Colors.red;
          break;
      }

      if (message != null) {
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(
          content: Text(message!),
          backgroundColor: bgColor,
          duration: const Duration(seconds: 3),
          behavior: SnackBarBehavior.floating,
        ));
      }
    });
  }

  Future<void> _initializeHomeScreen() async {
    _isAdFreeNow = await _adService.isAdFree();
    await _loadInitialData();
  }

  Future<void> _loadInitialData() async {
    final prefs = await SharedPreferences.getInstance();
    if (mounted) {
      setState(() {
        _selectedState = prefs.getString(AppKeys.userState) ?? "Berlin";
        _selectedLang =
            prefs.getString(AppKeys.userLang) ?? context.locale.languageCode;
      });
    }
    _refreshProgress();
  }

  Future<void> _refreshProgress() async {
    double progress = await _practiceService.getOverallProgress();
    if (mounted) setState(() => _overallProgress = progress);
  }

  // --- DIALOGS ---

  void _openLanguageSelector() {
    LanguageSelector.show(context, _selectedLang, (newLang) {
      _loadInitialData(); // Reload lang
    });
  }

  void _openStateSelectionDialog() {
    final List<String> states = [
      "Baden-Württemberg",
      "Bayern",
      "Berlin",
      "Brandenburg",
      "Bremen",
      "Hamburg",
      "Hessen",
      "Mecklenburg-Vorpommern",
      "Niedersachsen",
      "Nordrhein-Westfalen",
      "Rheinland-Pfalz",
      "Saarland",
      "Sachsen",
      "Sachsen-Anhalt",
      "Schleswig-Holstein",
      "Thüringen"
    ];

    PremiumDialog.show(
      context: context,
      title: "drawer.state_selection".tr(),
      confirmText: "common.close".tr(),
      confirmColor: Colors.grey,
      onConfirm: () => Navigator.pop(context),
      showCancel: false,
      contentWidget: SizedBox(
        height: 350,
        width: double.maxFinite,
        child: Scrollbar(
          thumbVisibility: true,
          child: ListView.separated(
            padding: const EdgeInsets.symmetric(vertical: 8),
            itemCount: states.length,
            separatorBuilder: (ctx, i) =>
                Divider(height: 1, color: Colors.grey.shade100),
            itemBuilder: (context, index) {
              final state = states[index];
              final isSelected = state == _selectedState;
              return Material(
                color: Colors.transparent,
                child: ListTile(
                  title: Text(state,
                      style: GoogleFonts.poppins(
                          fontWeight:
                              isSelected ? FontWeight.bold : FontWeight.normal,
                          color:
                              isSelected ? AppColors.primary : Colors.black87)),
                  tileColor:
                      isSelected ? AppColors.primary.withOpacity(0.05) : null,
                  trailing: isSelected
                      ? const Icon(Icons.check_circle, color: AppColors.primary)
                      : null,
                  shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10)),
                  onTap: () async {
                    final prefs = await SharedPreferences.getInstance();
                    await prefs.setString(AppKeys.userState, state);
                    if (mounted) {
                      setState(() => _selectedState = state);
                      Navigator.pop(context); // Close dialog
                      _loadInitialData(); // Refresh app data with new state if needed
                    }
                  },
                ),
              );
            },
          ),
        ),
      ),
    );
  }

  void _openPremiumSelection() {
    // Re-implemented slightly to be safe, assuming imports are correct
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      builder: (context) => Container(
        decoration: const BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
        ),
        padding: const EdgeInsets.all(24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
                width: 40,
                height: 4,
                decoration: BoxDecoration(
                    color: Colors.grey.shade300,
                    borderRadius: BorderRadius.circular(2))),
            const SizedBox(height: 20),
            Text("premium.selection_title".tr(),
                style: GoogleFonts.poppins(
                    fontSize: 20, fontWeight: FontWeight.bold)),
            const SizedBox(height: 20),
            _buildPremiumTile(
              title: "premium.lifetime_title".tr(),
              subtitle: "premium.lifetime_sub".tr(),
              icon: Icons.workspace_premium,
              color: AppColors.premiumGold,
              isRecommended: true,
              onTap: () {
                Navigator.pop(context);
                _iapService.buyLifetime();
              },
            ),
            const SizedBox(height: 15),
            _buildPremiumTile(
              title: "premium.temp_title".tr(),
              subtitle: "premium.temp_sub".tr(),
              icon: Icons.bolt,
              color: Colors.blueAccent,
              onTap: () {
                Navigator.pop(context);
                _adService.showRewardedAd(
                  () => _initializeHomeScreen(),
                  () {
                    showDialog(
                      context: context,
                      builder: (c) => AlertDialog(
                        title: const Icon(Icons.sentiment_dissatisfied,
                            size: 40, color: Colors.grey),
                        content: Text("premium.ad_not_ready".tr(),
                            textAlign: TextAlign.center),
                        actions: [
                          TextButton(
                            onPressed: () => Navigator.pop(c),
                            child: Text("common.close".tr()),
                          )
                        ],
                      ),
                    );
                  },
                );
              },
            ),
            const SizedBox(height: 15),
            // RESTORE PURCHASES TILE
            TextButton.icon(
              onPressed: () {
                Navigator.pop(context);
                _iapService.restorePurchases();
              },
              icon: const Icon(Icons.restore, size: 20, color: Colors.grey),
              label: Text("premium.restore_title".tr(),
                  style: const TextStyle(
                      color: Colors.grey,
                      decoration: TextDecoration.underline)),
            ),
            const SizedBox(height: 20),
          ],
        ),
      ),
    );
  }

  // --- ACTIONS ---

  Future<void> _handleStartPractice(
      {String? categoryId,
      bool onlyFailed = false,
      bool onlyBookmarks = false,
      String? titleKey}) async {
    try {
      if (categoryId == "STATE_QUESTIONS") {
        // Logic for state questions
      }

      await _practiceService.loadAndFilterQuestions(
        selectedState: _selectedState,
        selectedLang: _selectedLang,
        categoryId: categoryId,
        onlyFailed: onlyFailed,
        onlyBookmarks: onlyBookmarks,
      );

      if (mounted && _practiceService.questions.isNotEmpty) {
        // Determine Title
        String screenTitle = "home.practice"; // Default
        if (titleKey != null) {
          screenTitle = titleKey;
        } else if (categoryId == "STATE_QUESTIONS") {
          screenTitle = _selectedState;
        }

        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => PracticeScreen(
              service: _practiceService,
              title: screenTitle,
            ),
          ),
        ).then((_) => _refreshProgress());
      } else if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text("home.no_questions".tr()), // 'No questions found'
            behavior: SnackBarBehavior.floating,
            backgroundColor: AppColors.error,
          ),
        );
      }
    } catch (e) {
      debugPrint("Navigation Error: $e");
    }
  }

  Future<void> _handleLogout() async {
    final shouldLogout = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: Text("auth.logout".tr()),
        content: Text("auth.logout_confirm".tr()),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context, false),
            child: Text("common.cancel".tr()),
          ),
          ElevatedButton(
            onPressed: () => Navigator.pop(context, true),
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.red,
              foregroundColor: Colors.white,
            ),
            child: Text("auth.logout".tr()),
          ),
        ],
      ),
    );

    if (shouldLogout == true) {
      try {
        await _authService.signOut();
        if (mounted) {
          Navigator.of(context).pushAndRemoveUntil(
            MaterialPageRoute(builder: (context) => const LoginScreen()),
            (route) => false,
          );
        }
      } catch (e) {
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: Text("Error: $e"),
              backgroundColor: Colors.red,
              behavior: SnackBarBehavior.floating,
            ),
          );
        }
      }
    }
  }

  Future<void> _handleDeleteAccount() async {
    final shouldDelete = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: Text("auth.delete_confirm_title".tr()),
        content: Text("auth.delete_confirm_body".tr()),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context, false),
            child: Text("common.cancel".tr()),
          ),
          ElevatedButton(
            onPressed: () => Navigator.pop(context, true),
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.red,
              foregroundColor: Colors.white,
            ),
            child: Text("auth.delete_btn".tr()),
          ),
        ],
      ),
    );

    if (shouldDelete == true) {
      try {
        await _authService.deleteAccount();
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: Text("common.success".tr()),
              backgroundColor: Colors.green,
              behavior: SnackBarBehavior.floating,
            ),
          );
          Navigator.of(context).pushAndRemoveUntil(
            MaterialPageRoute(builder: (context) => const LoginScreen()),
            (route) => false,
          );
        }
      } catch (e) {
        if (mounted) {
          String errorMsg = AuthService.getFriendlyErrorMessage(e);
          showDialog(
            context: context,
            builder: (ctx) => AlertDialog(
              title: const Text("Error"),
              content: Text(errorMsg),
              actions: [
                TextButton(
                  onPressed: () => Navigator.pop(ctx),
                  child: const Text("OK"),
                )
              ],
            ),
          );
        }
      }
    }
  }

  // --- BUILD UI ---

  @override
  Widget build(BuildContext context) {
    SystemChrome.setSystemUIOverlayStyle(
        const SystemUiOverlayStyle(statusBarColor: Colors.transparent));

    return Scaffold(
      backgroundColor: const Color(0xFFF1F5F9),
      drawer: ValueListenableBuilder<bool>(
          valueListenable: _adService.premiumStatusNotifier,
          builder: (context, isPremium, child) {
            return MainDrawer(
              selectedState: _selectedState,
              selectedLang: _selectedLang,
              overallProgress: _overallProgress,
              isPremium: isPremium,
              userEmail: _authService.currentUser?.email,
              onStateTap: () {
                Navigator.pop(context); // Close Drawer
                _openStateSelectionDialog(); // Open Dialog
              },
              onLangTap: () {
                Navigator.pop(context); // Close Drawer
                _openLanguageSelector(); // Open Dialog
              },
              onRestoreTap: () => _adService.restorePurchases(),
              onPremiumTap: () {
                Navigator.pop(context);
                _openPremiumSelection();
              },
              onLogoutTap: () {
                Navigator.pop(context);
                _handleLogout();
              },
              onDeleteAccountTap: () {
                Navigator.pop(context);
                _handleDeleteAccount();
              },
            );
          }),
      bottomNavigationBar: BottomBannerAd(),
      body: CustomScrollView(
        physics: const BouncingScrollPhysics(),
        slivers: [
          _buildSliverAppBar(context),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.all(24.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _buildProgressSection(),
                  const SizedBox(height: 30),

                  // MAIN MODES HEADER
                  Text("home.main_modes".tr(),
                      style: GoogleFonts.poppins(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                          color: AppColors.eliteDark)),
                  const SizedBox(height: 16),

                  // MAIN CARDS
                  Column(
                    children: [
                      _buildHeroCard(
                        title: "home.quiz_simulation".tr(),
                        icon: Icons.timer_outlined,
                        color: const Color(0xFF6366F1),
                        onTap: () async {
                          await _quizService.loadQuestions(
                              _selectedState, _selectedLang,
                              isSimulation: true);
                          if (mounted) {
                            Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                        builder: (c) =>
                                            QuizScreen(service: _quizService)))
                                .then((_) => _refreshProgress());
                          }
                        },
                      ),
                      const SizedBox(height: 16),
                      Row(
                        children: [
                          Expanded(
                            child: _buildHeroCard(
                              title: "home.my_errors".tr(),
                              icon: Icons.dangerous_outlined,
                              color: const Color(0xFFEF4444),
                              height: 120, // Slightly smaller
                              onTap: () => _handleStartPractice(
                                  onlyFailed: true, titleKey: "home.my_errors"),
                            ),
                          ),
                          const SizedBox(width: 16),
                          Expanded(
                            child: _buildHeroCard(
                              title: "home.my_bookmarks".tr(),
                              icon: Icons.star_rounded,
                              color: Colors.amber,
                              height: 120, // Slightly smaller
                              onTap: () => _handleStartPractice(
                                  onlyBookmarks: true,
                                  titleKey: "home.my_bookmarks"),
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                  const SizedBox(height: 30),

                  // CATEGORIES HEADER
                  Text("home.categories_label".tr(),
                      style: GoogleFonts.poppins(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                          color: AppColors.eliteDark)),
                  const SizedBox(height: 16),
                  _buildCategoryGrid(),
                  const SizedBox(height: 100),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  // --- SUB-WIDGETS ---

  Widget _buildSliverAppBar(BuildContext context) {
    return SliverAppBar(
      expandedHeight: 180.0,
      floating: false,
      pinned: true,
      backgroundColor: AppColors.primary,
      stretch: true,
      leading: Builder(
        builder: (context) => IconButton(
          icon: const Icon(Icons.grid_view_rounded, color: Colors.white),
          onPressed: () => Scaffold.of(context).openDrawer(),
        ),
      ),
      actions: [
        PremiumActionButton(
            adService: _adService, onOpenSelection: _openPremiumSelection),
        const SizedBox(width: 12),
      ],
      flexibleSpace: FlexibleSpaceBar(
        background: Container(
          decoration: const BoxDecoration(
            gradient: LinearGradient(
              colors: AppColors.splashGradient,
              begin: AlignmentDirectional.topStart,
              end: AlignmentDirectional.bottomEnd,
            ),
          ),
          child: Stack(
            children: [
              Positioned.directional(
                  textDirection: Directionality.of(context),
                  top: -50,
                  end: -50,
                  child: CircleAvatar(
                      radius: 100,
                      backgroundColor: Colors.white.withOpacity(0.05))),
              Positioned.directional(
                  textDirection: Directionality.of(context),
                  bottom: -30,
                  start: -20,
                  child: CircleAvatar(
                      radius: 70,
                      backgroundColor: Colors.white.withOpacity(0.05))),
              Align(
                alignment: AlignmentDirectional.bottomStart,
                child: Padding(
                  padding: const EdgeInsets.all(24.0),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text("home.welcome".tr(),
                          style: GoogleFonts.poppins(
                              color: Colors.white70, fontSize: 14)),
                      Text("home.app_title".tr(),
                          style: GoogleFonts.poppins(
                              color: Colors.white,
                              fontSize: 24,
                              fontWeight: FontWeight.bold)),
                    ],
                  ),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildProgressSection() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(24),
        boxShadow: [
          BoxShadow(
              color: Colors.black.withOpacity(0.03),
              blurRadius: 20,
              offset: const Offset(0, 10))
        ],
      ),
      child: Row(
        children: [
          CircularProgressIndicator(
            value: _overallProgress,
            strokeWidth: 8,
            backgroundColor: Colors.grey.shade100,
            color: AppColors.success,
            strokeCap: StrokeCap.round,
          ),
          const SizedBox(width: 20),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text("home.progress_card_title".tr(),
                    style: GoogleFonts.poppins(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                        color: AppColors.eliteDark)),
                Text(
                    "%${(_overallProgress * 100).toInt()} ${'common.completed'.tr()}",
                    style: GoogleFonts.poppins(
                        fontSize: 14, color: AppColors.secondary)),
              ],
            ),
          ),
          Container(
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(
                color: AppColors.success.withOpacity(0.1),
                shape: BoxShape.circle),
            child: const Icon(Icons.emoji_events_rounded,
                color: AppColors.success),
          )
        ],
      ),
    );
  }

  Widget _buildHeroCard(
      {required String title,
      required IconData icon,
      required Color color,
      double? height,
      required VoidCallback onTap}) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        height: height ?? 140,
        decoration: BoxDecoration(
          color: color,
          borderRadius: BorderRadius.circular(28),
          boxShadow: [
            BoxShadow(
                color: color.withOpacity(0.4),
                blurRadius: 15,
                offset: const Offset(0, 8))
          ],
        ),
        child: Stack(
          children: [
            Positioned.directional(
                textDirection: Directionality.of(context),
                end: -20,
                top: -20,
                child: Icon(icon,
                    size: 100, color: Colors.white.withOpacity(0.15))),
            Padding(
              padding: const EdgeInsets.all(20.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Container(
                    padding: const EdgeInsets.all(10),
                    decoration: BoxDecoration(
                        color: Colors.white.withOpacity(0.2),
                        shape: BoxShape.circle),
                    child: Icon(icon, color: Colors.white, size: 24),
                  ),
                  Text(title,
                      style: GoogleFonts.poppins(
                          color: Colors.white,
                          fontSize: 16,
                          fontWeight: FontWeight.bold)),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildCategoryGrid() {
    final categories = [
      {
        "id": PracticeService.catDemocracy,
        "name": "home.categories.democracy",
        "icon": Icons.account_balance_rounded,
        "color": Colors.indigo
      },
      {
        "id": PracticeService.catHistory,
        "name": "home.categories.history",
        "icon": Icons.auto_stories_rounded,
        "color": Colors.brown
      },
      {
        "id": PracticeService.catSociety,
        "name": "home.categories.society",
        "icon": Icons.diversity_3_rounded,
        "color": Colors.orange
      },
      {
        "id": "STATE_QUESTIONS",
        "name": "home.categories.state_questions",
        "icon": Icons.map_rounded,
        "color": Colors.teal
      },
    ];

    return GridView.builder(
      padding: EdgeInsets.zero,
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        crossAxisSpacing: 16,
        mainAxisSpacing: 16,
        childAspectRatio: 1.1,
      ),
      itemCount: categories.length,
      itemBuilder: (context, index) {
        final cat = categories[index];
        final color = cat['color'] as Color;

        return InkWell(
          onTap: () => _handleStartPractice(
              categoryId: cat['id'] as String,
              titleKey: (cat['id'] as String) == "STATE_QUESTIONS"
                  ? _selectedState
                  : cat['name'] as String),
          borderRadius: BorderRadius.circular(24),
          child: Container(
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(24),
              border: Border.all(color: Colors.grey.shade100),
              boxShadow: [
                BoxShadow(
                    color: Colors.black.withOpacity(0.04),
                    blurRadius: 10,
                    offset: const Offset(0, 4))
              ],
            ),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                      color: color.withOpacity(0.1), shape: BoxShape.circle),
                  child: Icon(cat['icon'] as IconData, color: color, size: 32),
                ),
                const SizedBox(height: 12),
                Text(
                  (cat['name'] as String).tr(),
                  style: GoogleFonts.poppins(
                      fontSize: 14,
                      fontWeight: FontWeight.w600,
                      color: AppColors.eliteDark),
                  textAlign: TextAlign.center,
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  Widget _buildPremiumTile(
      {required String title,
      required String subtitle,
      required IconData icon,
      required Color color,
      required VoidCallback onTap,
      bool isRecommended = false}) {
    return Container(
      decoration: BoxDecoration(
        color:
            isRecommended ? AppColors.primary.withOpacity(0.05) : Colors.white,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(
            color: isRecommended
                ? AppColors.primary.withOpacity(0.3)
                : Colors.grey.shade200,
            width: isRecommended ? 1.5 : 1),
      ),
      child: ListTile(
        contentPadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
        leading: Container(
          padding: const EdgeInsets.all(12),
          decoration: BoxDecoration(
              color: color.withOpacity(0.15), shape: BoxShape.circle),
          child: Icon(icon, color: color, size: 28),
        ),
        title: Text(title,
            style: GoogleFonts.poppins(fontWeight: FontWeight.bold)),
        subtitle: Text(subtitle, style: GoogleFonts.poppins(fontSize: 12)),
        trailing: isRecommended
            ? Container(
                padding:
                    const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                    color: AppColors.premiumGold,
                    borderRadius: BorderRadius.circular(20)),
                child: Text("BEST",
                    style: GoogleFonts.poppins(
                        fontSize: 10,
                        fontWeight: FontWeight.bold,
                        color: Colors.black)),
              )
            : null,
        onTap: onTap,
      ),
    );
  }

  @override
  void dispose() {
    _iapSubscription?.cancel();
    super.dispose();
  }
}
