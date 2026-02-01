// [2026-01-07] File: lib/features/quiz/quiz_review_screen.dart
import 'package:flutter/material.dart';
import 'package:google_mobile_ads/google_mobile_ads.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../models/question_model.dart';
import '../../core/constants/app_colors.dart';
import '../../services/ad_service.dart'; // AdService eklendi

class QuizReviewScreen extends StatefulWidget {
  final List<QuestionModel> questions;
  final Map<int, int?> userAnswers;

  const QuizReviewScreen({
    super.key,
    required this.questions,
    required this.userAnswers,
  });

  @override
  State<QuizReviewScreen> createState() => _QuizReviewScreenState();
}

class _QuizReviewScreenState extends State<QuizReviewScreen> {
  final AdService _adService = AdService(); // Servis tanımlandı
  BannerAd? _bannerAd;
  bool _isBannerAdLoaded = false;
  bool _isAdFree = false; // Premium durumu

  @override
  void initState() {
    super.initState();
    _checkPremiumAndLoadAds();
  }

  @override
  void dispose() {
    _bannerAd?.dispose();
    super.dispose();
  }

  // Reklamsız mod kontrolü ve reklam yükleme mantığı
  Future<void> _checkPremiumAndLoadAds() async {
    final adFreeStatus = await _adService.isAdFree();
    if (mounted) {
      setState(() {
        _isAdFree = adFreeStatus;
      });
    }

    // Eğer kullanıcı premium DEĞİLSE reklamı yükle
    if (!adFreeStatus) {
      _loadBannerAd();
    }
  }

  void _loadBannerAd() {
    _bannerAd = BannerAd(
      adUnitId: _adService.bannerId,
      size: AdSize.banner,
      request: const AdRequest(),
      listener: BannerAdListener(
        onAdLoaded: (ad) => setState(() => _isBannerAdLoaded = true),
        onAdFailedToLoad: (ad, error) {
          ad.dispose();
        },
      ),
    )..load();
  }

  @override
  Widget build(BuildContext context) {
    final List<int> failedIndices = [];
    for (int i = 0; i < widget.questions.length; i++) {
      if (widget.userAnswers[i] != widget.questions[i].correctAnswerIndex) {
        failedIndices.add(i);
      }
    }

    return Scaffold(
      backgroundColor: const Color(0xFFF1F5F9),
      appBar: AppBar(
        backgroundColor: AppColors.primary,
        title: Text("review.app_bar_title".tr(),
            style: GoogleFonts.poppins(
                fontWeight: FontWeight.bold, color: Colors.white, fontSize: 20)),
        centerTitle: true,
        iconTheme: const IconThemeData(color: Colors.white),
        actions: [
          IconButton(
            icon: const Icon(Icons.home_rounded, color: Colors.white),
            onPressed: () =>
                Navigator.of(context).popUntil((route) => route.isFirst),
            tooltip: "common.home_tooltip".tr(),
          ),
          const SizedBox(width: 8),
        ],
      ),
      // REKLAM KONTROLÜ: Sadece premium değilse banner göster
      bottomNavigationBar:
          (!_isAdFree && _isBannerAdLoaded && _bannerAd != null)
              ? SafeArea(
                  child: Container(
                    width: _bannerAd!.size.width.toDouble(),
                    height: _bannerAd!.size.height.toDouble(),
                    alignment: Alignment.center,
                    child: AdWidget(ad: _bannerAd!),
                  ),
                )
              : null,
      body: Center(
        child: Container(
          constraints: const BoxConstraints(maxWidth: 750),
          child: failedIndices.isEmpty
              ? _buildTebrikEkrani()
              : ListView.builder(
                  padding: const EdgeInsets.all(16),
                  itemCount: failedIndices.length,
                  itemBuilder: (context, i) {
                    int qIndex = failedIndices[i];
                    return _buildErrorCard(
                        widget.questions[qIndex], widget.userAnswers[qIndex]);
                  },
                ),
        ),
      ),
    );
  }

  Widget _buildTebrikEkrani() {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        const Icon(Icons.stars_rounded, size: 120, color: Colors.orange),
        const SizedBox(height: 20),
        Text("review.perfect_title".tr(),
            style: const TextStyle(
                fontSize: 28,
                fontWeight: FontWeight.bold,
                color: Color(0xFF1E293B))),
        const SizedBox(height: 10),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 40),
          child: Text(
            "review.perfect_desc".tr(),
            textAlign: TextAlign.center,
            style: const TextStyle(fontSize: 16, color: Colors.blueGrey),
          ),
        ),
        const SizedBox(height: 30),
        ElevatedButton.icon(
          onPressed: () =>
              Navigator.of(context).popUntil((route) => route.isFirst),
          icon: const Icon(Icons.home, color: Colors.white),
          label: Text("common.back_home".tr(),
              style: const TextStyle(color: Colors.white)),
          style: ElevatedButton.styleFrom(
            backgroundColor: AppColors.primary,
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
            shape:
                RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
          ),
        ),
      ],
    );
  }

  Widget _buildErrorCard(QuestionModel q, int? userAnswer) {
    return Container(
      margin: const EdgeInsets.only(bottom: 25),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
              color: Colors.black.withOpacity(0.05),
              blurRadius: 30,
              offset: const Offset(0, 10))
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (q.image != null && q.image!.isNotEmpty)
            Padding(
              padding: const EdgeInsets.only(bottom: 12),
              child: ClipRRect(
                borderRadius: BorderRadius.circular(8),
                child: Image.asset(
                  q.image!.startsWith('assets/')
                      ? q.image!
                      : "assets/images/${q.image}",
                  height: 140,
                  width: double.infinity,
                  fit: BoxFit.contain,
                ),
              ),
            ),
          Text(q.questionText,
              style: GoogleFonts.poppins(
                  fontWeight: FontWeight.bold, fontSize: 16)),
          const SizedBox(height: 16),
          ...List.generate(q.options.length, (index) {
            bool isCorrect = index == q.correctAnswerIndex;
            bool isUserWrong = index == userAnswer && !isCorrect;

            Color borderColor = isCorrect
                ? Colors.green
                : (isUserWrong ? Colors.red : Colors.grey.shade200);
            Color bgColor = isCorrect
                ? Colors.green.shade50
                : (isUserWrong ? Colors.red.shade50 : Colors.white);

            return Container(
              margin: const EdgeInsets.only(bottom: 8),
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: bgColor,
                borderRadius: BorderRadius.circular(10),
                border: Border.all(color: borderColor, width: 1.5),
              ),
              child: Row(
                children: [
                  Text("${String.fromCharCode(65 + index)}) ",
                      style: const TextStyle(fontWeight: FontWeight.bold)),
                  Expanded(child: Text(q.options[index])),
                  if (isCorrect)
                    const Icon(Icons.check_circle,
                        color: Colors.green, size: 20),
                  if (isUserWrong)
                    const Icon(Icons.cancel, color: Colors.red, size: 20),
                ],
              ),
            );
          }),
          if (q.explanation != null && q.explanation!.isNotEmpty)
            _buildExplanationCard(q.explanation!),
          if (userAnswer == null)
            Padding(
              padding: const EdgeInsets.only(top: 10),
              child: Text("review.empty_answer".tr(),
                  style: const TextStyle(
                      color: Colors.orange,
                      fontSize: 12,
                      fontWeight: FontWeight.bold)),
            ),
        ],
      ),
    );
  }

  Widget _buildExplanationCard(String text) {
    return Container(
      margin: const EdgeInsets.only(top: 15),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: Colors.blue.shade50,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.blue.shade200, width: 1),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              const Icon(Icons.info_outline, color: Colors.blue, size: 20),
              const SizedBox(width: 8),
              Text("review.explanation".tr(),
                  style: const TextStyle(
                      fontWeight: FontWeight.bold, color: Colors.blue)),
            ],
          ),
          const SizedBox(height: 6),
          Text(text,
              style: TextStyle(
                  color: Colors.blue.shade900, fontSize: 13, height: 1.4)),
        ],
      ),
    );
  }
}
