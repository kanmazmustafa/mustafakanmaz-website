// [2026-01-07] File: lib/features/setup/setup_screen.dart
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:easy_localization/easy_localization.dart';

import '../../core/constants/app_keys.dart';
import '../../core/constants/app_colors.dart';
import 'disclaimer_screen.dart';

class SetupScreen extends StatefulWidget {
  const SetupScreen({super.key});

  @override
  State<SetupScreen> createState() => _SetupScreenState();
}

class _SetupScreenState extends State<SetupScreen> {
  String selectedState = "Berlin";

  late String selectedLang;
  bool _isInit = true;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    if (_isInit) {
      selectedLang = context.locale.languageCode;
      _isInit = false;
    }
  }

  final List<String> allStates = [
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

  final List<Map<String, String>> allLanguages = [
    {"code": "ar", "name": "العربية", "flag": "🇸🇦"},
    {"code": "bg", "name": "Български", "flag": "🇧🇬"},
    {"code": "bs", "name": "Bosanski", "flag": "🇧🇦"},
    {"code": "de", "name": "Deutsch", "flag": "🇩🇪"},
    {"code": "el", "name": "Ελληνικά", "flag": "🇬🇷"},
    {"code": "en", "name": "English", "flag": "🇬🇧"},
    {"code": "es", "name": "Español", "flag": "🇪🇸"},
    {"code": "fa", "name": "فارسی", "flag": "🇮🇷"},
    {"code": "fr", "name": "Français", "flag": "🇫🇷"},
    {"code": "he", "name": "עברית", "flag": "🇮🇱"},
    {"code": "hi", "name": "हिन्दी", "flag": "🇮🇳"},
    {"code": "hr", "name": "Hrvatski", "flag": "🇭🇷"},
    {"code": "hu", "name": "Magyar", "flag": "🇭🇺"},
    {"code": "it", "name": "Italiano", "flag": "🇮🇹"},
    {"code": "ja", "name": "日本語", "flag": "🇯🇵"},
    {"code": "ku", "name": "Kurdî", "flag": "☀️"},
    {"code": "nl", "name": "Nederlands", "flag": "🇳🇱"},
    {"code": "pl", "name": "Polski", "flag": "🇵🇱"},
    {"code": "ps", "name": "پښتو", "flag": "🇦🇫"},
    {"code": "pt", "name": "Português", "flag": "🇵🇹"},
    {"code": "ro", "name": "Română", "flag": "🇷🇴"},
    {"code": "ru", "name": "Русский", "flag": "🇷🇺"},
    {"code": "sq", "name": "Shqip", "flag": "🇦🇱"},
    {"code": "sr", "name": "Српски", "flag": "🇷🇸"},
    {"code": "th", "name": "ไทย", "flag": "🇹🇭"},
    {"code": "tr", "name": "Türkçe", "flag": "🇹🇷"},
    {"code": "uk", "name": "Українська", "flag": "🇺🇦"},
    {"code": "vi", "name": "Tiếng Việt", "flag": "🇻🇳"},
    {"code": "zh", "name": "中文", "flag": "🇨🇳"},
  ];

  void _showElitePicker({
    required String title,
    required List<dynamic> items,
    required String currentSelection,
    required Function(String) onSelect,
    bool isLanguage = false,
  }) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) {
        return DraggableScrollableSheet(
          initialChildSize: 0.6,
          maxChildSize: 0.9,
          minChildSize: 0.4,
          expand: false,
          builder: (context, scrollController) {
            return Container(
              decoration: const BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.vertical(top: Radius.circular(32)),
              ),
              padding: const EdgeInsets.symmetric(horizontal: 24),
              child: Column(
                children: [
                  const SizedBox(height: 12),
                  Container(
                    width: 45,
                    height: 5,
                    decoration: BoxDecoration(
                        color: Colors.grey[300],
                        borderRadius: BorderRadius.circular(10)),
                  ),
                  const SizedBox(height: 25),
                  Text(title,
                      style: GoogleFonts.poppins(
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                          color: const Color(0xFF0F172A))),
                  const SizedBox(height: 20),
                  Expanded(
                    child: ListView.builder(
                      controller: scrollController,
                      itemCount: items.length,
                      itemBuilder: (context, index) {
                        final item = items[index];
                        final String code = isLanguage ? item['code']! : item;
                        final String name = isLanguage ? item['name']! : item;
                        final String? flag = isLanguage ? item['flag'] : null;
                        final isSelected = currentSelection == code;

                        return GestureDetector(
                          onTap: () {
                            onSelect(code);
                            Navigator.pop(context);
                          },
                          child: Container(
                            margin: const EdgeInsets.only(bottom: 12),
                            padding: const EdgeInsets.all(18),
                            decoration: BoxDecoration(
                              color: isSelected
                                  ? AppColors.primary.withOpacity(0.05)
                                  : Colors.white,
                              borderRadius: BorderRadius.circular(20),
                              border: Border.all(
                                color: isSelected
                                    ? AppColors.primary
                                    : Colors.grey.shade200,
                                width: 2,
                              ),
                            ),
                            child: Row(
                              children: [
                                if (flag != null) ...[
                                  Text(flag,
                                      style: const TextStyle(fontSize: 24)),
                                  const SizedBox(width: 15),
                                ],
                                Text(
                                  name,
                                  style: GoogleFonts.poppins(
                                    fontSize: 16,
                                    fontWeight: isSelected
                                        ? FontWeight.bold
                                        : FontWeight.w600,
                                    color: isSelected
                                        ? AppColors.primary
                                        : Colors.blueGrey,
                                  ),
                                ),
                                const Spacer(),
                                Icon(
                                  isSelected
                                      ? Icons.check_circle_rounded
                                      : Icons.radio_button_off_rounded,
                                  color: isSelected
                                      ? AppColors.primary
                                      : Colors.grey[300],
                                ),
                              ],
                            ),
                          ),
                        );
                      },
                    ),
                  ),
                ],
              ),
            );
          },
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    // Stat bar'ı şeffaf yap
    SystemChrome.setSystemUIOverlayStyle(
        const SystemUiOverlayStyle(statusBarColor: Colors.transparent));

    final langData = allLanguages.firstWhere((e) => e['code'] == selectedLang,
        orElse: () => allLanguages.first);

    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      body: Stack(
        children: [
          // Background Header Design
          Positioned(
            top: 0,
            left: 0,
            right: 0,
            height: 300,
            child: Container(
              decoration: const BoxDecoration(
                gradient: LinearGradient(
                  colors: AppColors.splashGradient,
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                borderRadius:
                    BorderRadius.vertical(bottom: Radius.circular(40)),
              ),
            ),
          ),
          // Decorative Circles
          Positioned(
            top: -50,
            right: -50,
            child: CircleAvatar(
              radius: 100,
              backgroundColor: Colors.white.withOpacity(0.05),
            ),
          ),

          // Main Content
          SafeArea(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const SizedBox(height: 40),
                  // Header Text
                  Center(
                    child: Column(
                      children: [
                        Container(
                          padding: const EdgeInsets.all(16),
                          decoration: BoxDecoration(
                            color: Colors.white.withOpacity(0.1),
                            shape: BoxShape.circle,
                          ),
                          child: const Icon(Icons.verified_user_outlined,
                              color: Colors.white, size: 48),
                        ),
                        const SizedBox(height: 20),
                        Text(
                          "setup.welcome_title".tr(),
                          style: GoogleFonts.poppins(
                            fontSize: 28,
                            fontWeight: FontWeight.bold,
                            color: Colors.white,
                          ),
                        ),
                        const SizedBox(height: 10),
                        Text(
                          "setup.welcome_sub".tr(),
                          textAlign: TextAlign.center,
                          style: GoogleFonts.poppins(
                            color: Colors.white70,
                            fontSize: 14,
                            height: 1.5,
                          ),
                        ),
                      ],
                    ),
                  ),

                  const SizedBox(height: 60),

                  // Selection Forms
                  Expanded(
                    child: Container(
                      padding: const EdgeInsets.all(24),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(30),
                        boxShadow: [
                          BoxShadow(
                            color: Colors.black.withOpacity(0.05),
                            blurRadius: 30,
                            offset: const Offset(0, 10),
                          ),
                        ],
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.stretch,
                        children: [
                          _buildEliteLabel("setup.select_state".tr()),
                          _buildEliteSelectionCard(
                            icon: Icons.map_rounded,
                            title: selectedState,
                            onTap: () => _showElitePicker(
                              title: "setup.select_state".tr(),
                              items: allStates,
                              currentSelection: selectedState,
                              onSelect: (v) =>
                                  setState(() => selectedState = v),
                            ),
                          ),
                          const SizedBox(height: 24),
                          _buildEliteLabel("setup.select_lang".tr()),
                          _buildEliteSelectionCard(
                            icon: Icons.language_rounded,
                            title: langData['name']!,
                            leadingText: langData['flag'],
                            onTap: () => _showElitePicker(
                              title: "setup.select_lang".tr(),
                              items: allLanguages,
                              currentSelection: selectedLang,
                              isLanguage: true,
                              onSelect: (v) {
                                setState(() => selectedLang = v);
                                context.setLocale(
                                    Locale(v)); // Dil değişimini anında uygula
                              },
                            ),
                          ),
                          const Spacer(),
                          ElevatedButton(
                            onPressed: () async {
                              final prefs =
                                  await SharedPreferences.getInstance();
                              await prefs.setString(
                                  AppKeys.userState, selectedState);
                              await prefs.setString(
                                  AppKeys.userLang, selectedLang);

                              if (mounted) {
                                Navigator.pushReplacement(
                                  context,
                                  MaterialPageRoute(
                                      builder: (c) => DisclaimerScreen(
                                          selectedLang: selectedLang)),
                                );
                              }
                            },
                            style: ElevatedButton.styleFrom(
                              backgroundColor: AppColors.primary,
                              foregroundColor: Colors.white,
                              minimumSize: const Size(double.infinity, 56),
                              shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(16)),
                              elevation: 10,
                              shadowColor: AppColors.primary.withOpacity(0.4),
                              textStyle: GoogleFonts.poppins(
                                fontSize: 16,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Text("setup.start_btn".tr()),
                                const SizedBox(width: 8),
                                const Icon(Icons.arrow_forward_rounded,
                                    size: 20),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(height: 24),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildEliteLabel(String title) => Padding(
        padding: const EdgeInsetsDirectional.only(start: 4, bottom: 8),
        child: Text(
          title,
          style: GoogleFonts.poppins(
            fontSize: 12,
            fontWeight: FontWeight.w600,
            color: AppColors.secondary,
            letterSpacing: 0.5,
          ),
        ),
      );

  Widget _buildEliteSelectionCard(
      {required IconData icon,
      required String title,
      String? leadingText,
      required VoidCallback onTap}) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: const Color(0xFFF8FAFC),
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: Colors.grey.shade200),
        ),
        child: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(10),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(12),
                boxShadow: [
                  BoxShadow(
                      color: Colors.black.withOpacity(0.03), blurRadius: 5)
                ],
              ),
              child: leadingText != null
                  ? Text(leadingText, style: const TextStyle(fontSize: 20))
                  : Icon(icon, color: AppColors.primary, size: 22),
            ),
            const SizedBox(width: 16),
            Expanded(
              child: Text(
                title,
                style: GoogleFonts.poppins(
                  fontSize: 16,
                  fontWeight: FontWeight.w600,
                  color: AppColors.eliteDark,
                ),
              ),
            ),
            const Icon(Icons.keyboard_arrow_down_rounded,
                color: AppColors.secondary),
          ],
        ),
      ),
    );
  }
}
