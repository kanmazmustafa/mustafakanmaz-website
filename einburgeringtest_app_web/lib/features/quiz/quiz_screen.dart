// [2026-01-07] Refined Premium QuizScreen - Local Dialogs
import 'package:flutter/material.dart';
import 'dart:async';
import 'dart:ui';
import 'package:google_mobile_ads/google_mobile_ads.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:google_fonts/google_fonts.dart';

import '../../services/quiz_service.dart';
import '../../services/ad_service.dart';
import '../../core/constants/app_colors.dart';
import '../../models/question_model.dart';
import 'quiz_result_screen.dart';

class QuizScreen extends StatefulWidget {
  final QuizService service;
  const QuizScreen({super.key, required this.service});

  @override
  State<QuizScreen> createState() => _QuizScreenState();
}

class _QuizScrollBehavior extends MaterialScrollBehavior {
  @override
  Set<PointerDeviceKind> get dragDevices => {
        PointerDeviceKind.touch,
        PointerDeviceKind.mouse,
        PointerDeviceKind.trackpad,
      };
}

class _QuizScreenState extends State<QuizScreen> {
  final AdService _adService = AdService();
  int? selectedOptionIndex;
  Timer? _timer;
  int _startSeconds = 60 * 60;
  late DateTime _endTime;

  BannerAd? _bannerAd;
  bool _isBannerAdLoaded = false;
  bool _isAdFree = false;

  final ScrollController _scrollController = ScrollController();

  @override
  void initState() {
    super.initState();

    // ERROR HANDLING: Check for empty questions
    if (widget.service.questions.isEmpty) {
      WidgetsBinding.instance.addPostFrameCallback((_) {
        _showStyledDialog(
          title: "home.no_questions".tr(),
          content: "practice.no_explanation".tr(),
          confirmText: "common.close".tr(),
          icon: Icons.error_outline_rounded,
          confirmColor: Colors.red,
          onConfirm: () => Navigator.pop(context),
        );
      });
      return; // Stop initialization
    }

    _checkPremiumAndLoadAds();
    _startTimer();
    // Sync local state if needed
    if (widget.service.currentIndex >= 0 &&
        widget.service.currentIndex < widget.service.questions.length) {
      selectedOptionIndex =
          widget.service.userAnswers[widget.service.currentIndex];
      // Initial scroll
      WidgetsBinding.instance.addPostFrameCallback(
          (_) => _scrollToIndex(widget.service.currentIndex));
    }
  }

  void _scrollToIndex(int index) {
    if (!_scrollController.hasClients) return;

    // Calculation:
    // PaddingLeft (16) + (Index * ItemWidthWithPadding (48)) + (ItemWidth(40)/2)
    // - ScreenWidth/2
    double screenWidth = MediaQuery.of(context).size.width;
    double itemWidth = 48.0;
    double offset = (16 + (index * itemWidth) + 20) - (screenWidth / 2);

    // Clamp logic handled by scroll controller safely usually, but explicit clamp is good
    if (offset < 0) offset = 0;
    if (offset > _scrollController.position.maxScrollExtent) {
      offset = _scrollController.position.maxScrollExtent;
    }

    _scrollController.animateTo(
      offset,
      duration: const Duration(milliseconds: 300),
      curve: Curves.easeInOut,
    );
  }

  @override
  void dispose() {
    _timer?.cancel();
    _bannerAd?.dispose();
    _scrollController.dispose();
    super.dispose();
  }

  Future<void> _checkPremiumAndLoadAds() async {
    try {
      final adFreeStatus = await _adService.isAdFree();
      if (mounted) setState(() => _isAdFree = adFreeStatus);
      if (!adFreeStatus) _loadBannerAd();
    } catch (e) {
      debugPrint("Premium Check Error: $e");
    }
  }

  void _loadBannerAd() {
    _bannerAd = BannerAd(
      adUnitId: _adService.bannerId,
      size: AdSize.banner,
      request: const AdRequest(),
      listener: BannerAdListener(
        onAdLoaded: (ad) {
          if (mounted) setState(() => _isBannerAdLoaded = true);
        },
        onAdFailedToLoad: (ad, error) {
          debugPrint('Banner Error: $error');
          ad.dispose();
        },
      ),
    )..load();
  }

  void _startTimer() {
    _endTime = DateTime.now().add(const Duration(minutes: 60));

    _timer = Timer.periodic(const Duration(seconds: 1), (timer) {
      final remaining = _endTime.difference(DateTime.now()).inSeconds;

      if (remaining <= 0) {
        timer.cancel();
        if (mounted) setState(() => _startSeconds = 0);
        _goToResult();
      } else {
        if (mounted) setState(() => _startSeconds = remaining);
      }
    });
  }

  // --- LOCAL DIALOG IMPL (Guaranteed to work) ---

  void _showStyledDialog({
    required String title,
    required String content,
    required String confirmText,
    required VoidCallback onConfirm,
    Color confirmColor = AppColors.primary,
    IconData? icon,
  }) {
    showDialog(
      context: context,
      barrierDismissible: true,
      builder: (context) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        backgroundColor: Colors.white,
        titlePadding: const EdgeInsets.fromLTRB(24, 24, 24, 0),
        contentPadding: const EdgeInsets.fromLTRB(24, 12, 24, 24),
        title: Column(
          children: [
            if (icon != null) ...[
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                    color: confirmColor.withOpacity(0.1),
                    shape: BoxShape.circle),
                child: Icon(icon, color: confirmColor, size: 32),
              ),
              const SizedBox(height: 16),
            ],
            Text(title,
                textAlign: TextAlign.center,
                style: GoogleFonts.poppins(
                    fontWeight: FontWeight.bold,
                    fontSize: 20,
                    color: AppColors.eliteDark)),
          ],
        ),
        content: Text(content,
            textAlign: TextAlign.center,
            style: GoogleFonts.poppins(
                fontSize: 15, color: Colors.blueGrey.shade700, height: 1.5)),
        actions: [
          Row(
            children: [
              Expanded(
                child: TextButton(
                  onPressed: () => Navigator.pop(context),
                  style: TextButton.styleFrom(
                    padding: const EdgeInsets.symmetric(vertical: 12),
                  ),
                  child: Text("common.cancel".tr(),
                      textAlign: TextAlign.center,
                      style: GoogleFonts.poppins(
                          color: Colors.grey.shade600,
                          fontWeight: FontWeight.bold)),
                ),
              ),
              const SizedBox(width: 8),
              Expanded(
                child: ElevatedButton(
                  onPressed: () {
                    Navigator.pop(context); // Close dialog first
                    onConfirm();
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: confirmColor,
                    foregroundColor: Colors.white,
                    elevation: 0,
                    padding: const EdgeInsets.symmetric(vertical: 12),
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12)),
                  ),
                  child: Text(confirmText,
                      textAlign: TextAlign.center,
                      style: GoogleFonts.poppins(fontWeight: FontWeight.bold)),
                ),
              ),
            ],
          )
        ],
      ),
    );
  }

  void _confirmExit() {
    _showStyledDialog(
      title: "quiz.exit_title".tr(),
      content: "quiz.exit_content".tr(),
      confirmText: "quiz.exit_confirm".tr(),
      confirmColor: Colors.red,
      icon: Icons.exit_to_app_rounded,
      onConfirm: () => Navigator.pop(context), // Close Screen
    );
  }

  void _confirmFinish() {
    int answeredCount = 0;
    for (int i = 0; i < widget.service.questions.length; i++) {
      if (widget.service.userAnswers.containsKey(i) &&
          widget.service.userAnswers[i] != null) {
        answeredCount++;
      }
    }

    int total = widget.service.questions.length;
    bool isComplete = answeredCount == total;

    _showStyledDialog(
      title: "quiz.finish_title".tr(),
      content: isComplete
          ? "quiz.finish_content".tr()
          : "quiz.finish_incomplete"
              .tr(args: [(total - answeredCount).toString()]),
      confirmText: "quiz.finish_btn".tr(),
      icon:
          isComplete ? Icons.check_circle_outline : Icons.warning_amber_rounded,
      confirmColor: isComplete ? AppColors.primary : Colors.orange,
      onConfirm: _goToResult,
    );
  }

  // --- LOGIC ---

  void _jumpToQuestion(int index) {
    if (index < 0 || index >= widget.service.questions.length) return;
    setState(() {
      widget.service.jumpTo(index);
      selectedOptionIndex = widget.service.userAnswers[index];
      _scrollToIndex(index);
    });
  }

  void _handleOptionTap(int index) {
    setState(() => selectedOptionIndex = index);
    widget.service.submitAnswer(index);
  }

  void _goToResult() async {
    _timer?.cancel();
    if (!_isAdFree) {
      try {
        await _adService.showInterstitial(() {});
      } catch (_) {}
    }

    await widget.service.saveResults();
    int finalScore = widget.service.calculateFinalScore();
    if (mounted) {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(
          builder: (context) => QuizResultScreen(
            score: finalScore,
            totalQuestions: widget.service.questions.length,
            service: widget.service,
          ),
        ),
      );
    }
  }

  // --- BUILD UI ---

  @override
  Widget build(BuildContext context) {
    final question = widget.service.currentQuestion;
    final double screenWidth = MediaQuery.of(context).size.width;

    return PopScope(
      canPop: false,
      onPopInvokedWithResult: (didPop, result) {
        if (!didPop) _confirmExit();
      },
      child: ScrollConfiguration(
        behavior: _QuizScrollBehavior(),
        child: Scaffold(
          backgroundColor: const Color(0xFFF1F5F9),
          appBar: AppBar(
            backgroundColor: AppColors.primary,
            elevation: 0,
            leading: IconButton(
              icon: const Icon(Icons.close, color: Colors.white),
              onPressed: _confirmExit,
            ),
            title: Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
              decoration: BoxDecoration(
                color: Colors.white.withOpacity(0.2),
                borderRadius: BorderRadius.circular(20),
              ),
              child: Text(
                '${(_startSeconds ~/ 60).toString().padLeft(2, '0')}:${(_startSeconds % 60).toString().padLeft(2, '0')}',
                style: GoogleFonts.poppins(
                    color: Colors.white,
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                    letterSpacing: 1.0),
              ),
            ),
            centerTitle: true,
            actions: [
              TextButton(
                onPressed: _confirmFinish,
                child: Text("quiz.finish_btn".tr(),
                    style: GoogleFonts.poppins(
                        color: Colors.white, fontWeight: FontWeight.bold)),
              ),
            ],
          ),
          floatingActionButtonLocation:
              FloatingActionButtonLocation.centerFloat,
          floatingActionButton: _buildActionButtons(),
          bottomNavigationBar: _buildBottomNavWithAds(),
          body: Column(
            children: [
              LinearProgressIndicator(
                value: (widget.service.currentIndex + 1) /
                    widget.service.questions.length,
                backgroundColor: Colors.white,
                color: AppColors.primary,
                minHeight: 4,
              ),
              Expanded(
                child: LayoutBuilder(builder: (context, constraints) {
                  return SingleChildScrollView(
                    physics: const BouncingScrollPhysics(),
                    padding: const EdgeInsets.fromLTRB(
                        20, 20, 20, 100), // Bottom padding for FAB
                    child: Center(
                      child: Container(
                        constraints: const BoxConstraints(maxWidth: 700),
                        child: Column(
                          children: [
                            _buildQuestionCard(question, screenWidth),
                            const SizedBox(height: 20),
                            ...List.generate(
                              question.options.length,
                              (index) => _buildOptionButton(index, question),
                            ),
                          ],
                        ),
                      ),
                    ),
                  );
                }),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildActionButtons() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 10),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          // PREV
          Opacity(
            opacity: widget.service.currentIndex > 0 ? 1.0 : 0.0,
            child: FloatingActionButton.extended(
              heroTag: "prevBtn",
              elevation: 4,
              onPressed: widget.service.currentIndex > 0
                  ? () => _jumpToQuestion(widget.service.currentIndex - 1)
                  : null,
              backgroundColor: Colors.white,
              foregroundColor: AppColors.primary,
              icon: const Icon(Icons.arrow_back),
              label: Text("quiz.prev".tr(),
                  style: GoogleFonts.poppins(fontWeight: FontWeight.bold)),
            ),
          ),

          // NEXT
          FloatingActionButton.extended(
            heroTag: "nextBtn",
            elevation: 4,
            onPressed: widget.service.isFinished
                ? _confirmFinish
                : () => _jumpToQuestion(widget.service.currentIndex + 1),
            backgroundColor: AppColors.primary,
            foregroundColor: Colors.white,
            icon: Icon(
                widget.service.isFinished ? Icons.check : Icons.arrow_forward),
            label: Text(
                widget.service.isFinished
                    ? "quiz.finish_btn".tr()
                    : "quiz.next".tr(),
                style: GoogleFonts.poppins(
                    fontWeight: FontWeight.bold, color: Colors.white)),
          ),
        ],
      ),
    );
  }

  Widget _buildBottomNavWithAds() {
    return Container(
      decoration: BoxDecoration(color: Colors.white, boxShadow: [
        BoxShadow(
            color: Colors.black.withOpacity(0.05),
            blurRadius: 10,
            offset: const Offset(0, -5))
      ]),
      child: SafeArea(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Container(
              height: 60,
              decoration: BoxDecoration(
                border: Border(top: BorderSide(color: Colors.grey.shade100)),
              ),
              child: ListView.builder(
                controller: _scrollController,
                scrollDirection: Axis.horizontal,
                itemCount: widget.service.questions.length,
                padding:
                    const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
                itemBuilder: (context, index) {
                  bool isCurrent = widget.service.currentIndex == index;
                  bool isAnswered = widget.service.userAnswers[index] != null;

                  return Padding(
                    padding: const EdgeInsetsDirectional.only(end: 8),
                    child: GestureDetector(
                      onTap: () => _jumpToQuestion(index),
                      child: AnimatedContainer(
                        duration: const Duration(milliseconds: 200),
                        width: 40,
                        alignment: Alignment.center,
                        decoration: BoxDecoration(
                            color: isCurrent
                                ? AppColors.primary
                                : (isAnswered
                                    ? const Color(0xFFDCFCE7)
                                    : Colors.grey.shade100),
                            borderRadius: BorderRadius.circular(10),
                            border: Border.all(
                                color: isCurrent
                                    ? AppColors.primary
                                    : (isAnswered
                                        ? Colors.green.shade300
                                        : Colors.transparent))),
                        child: Text(
                          '${index + 1}',
                          style: GoogleFonts.poppins(
                              fontWeight: FontWeight.bold,
                              fontSize: 14,
                              color: isCurrent
                                  ? Colors.white
                                  : (isAnswered
                                      ? Colors.green.shade700
                                      : Colors.grey.shade600)),
                        ),
                      ),
                    ),
                  );
                },
              ),
            ),
            if (!_isAdFree && _isBannerAdLoaded && _bannerAd != null)
              Container(
                alignment: Alignment.center,
                width: _bannerAd!.size.width.toDouble(),
                height: _bannerAd!.size.height.toDouble(),
                child: AdWidget(ad: _bannerAd!),
              ),
          ],
        ),
      ),
    );
  }

  Widget _buildQuestionCard(QuestionModel q, double width) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(20),
          boxShadow: [
            BoxShadow(
                color: Colors.black.withOpacity(0.05),
                blurRadius: 20,
                offset: const Offset(0, 5))
          ]),
      child: Column(
        children: [
          if (q.image != null && q.image!.isNotEmpty) ...[
            ClipRRect(
              borderRadius: BorderRadius.circular(12),
              child: Image.asset(
                q.image!.startsWith('assets/')
                    ? q.image!
                    : "assets/images/${q.image}",
                height: 180,
                fit: BoxFit.contain,
                errorBuilder: (ctx, err, stack) => const SizedBox(
                    height: 150,
                    child: Center(
                        child: Icon(Icons.broken_image, color: Colors.grey))),
              ),
            ),
            const SizedBox(height: 20),
          ],
          Text(q.questionText,
              textAlign: TextAlign.center,
              style: GoogleFonts.poppins(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                  color: AppColors.eliteDark,
                  height: 1.4)),
        ],
      ),
    );
  }

  Widget _buildOptionButton(int index, QuestionModel q) {
    bool isSelected = selectedOptionIndex == index;
    return Padding(
      padding: const EdgeInsets.only(bottom: 14),
      child: InkWell(
        onTap: () => _handleOptionTap(index),
        borderRadius: BorderRadius.circular(16),
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 200),
          padding: const EdgeInsets.all(18),
          decoration: BoxDecoration(
              color: isSelected
                  ? AppColors.primary.withOpacity(0.08)
                  : Colors.white,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(
                  color: isSelected ? AppColors.primary : Colors.grey.shade200,
                  width: isSelected ? 2 : 1.5),
              boxShadow: [
                if (!isSelected)
                  BoxShadow(
                      color: Colors.black.withOpacity(0.02),
                      blurRadius: 5,
                      offset: const Offset(0, 2))
              ]),
          child: Row(
            children: [
              Container(
                width: 32,
                height: 32,
                alignment: Alignment.center,
                decoration: BoxDecoration(
                  color: isSelected ? AppColors.primary : Colors.grey.shade100,
                  shape: BoxShape.circle,
                ),
                child: Text(String.fromCharCode(65 + index),
                    style: GoogleFonts.poppins(
                        fontSize: 14,
                        fontWeight: FontWeight.bold,
                        color:
                            isSelected ? Colors.white : Colors.grey.shade600)),
              ),
              const SizedBox(width: 16),
              Expanded(
                  child: Text(q.options[index],
                      style: GoogleFonts.poppins(
                          fontSize: 15,
                          fontWeight:
                              isSelected ? FontWeight.w600 : FontWeight.w500,
                          color: isSelected
                              ? AppColors.eliteDark
                              : Colors.blueGrey.shade800))),
              if (isSelected)
                const Padding(
                  padding: EdgeInsetsDirectional.only(start: 8),
                  child: Icon(Icons.check_circle,
                      color: AppColors.primary, size: 22),
                )
            ],
          ),
        ),
      ),
    );
  }
}
