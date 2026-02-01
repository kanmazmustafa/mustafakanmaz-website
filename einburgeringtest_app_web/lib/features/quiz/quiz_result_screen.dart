// [2026-01-07] File: lib/features/quiz/quiz_result_screen.dart
import 'package:flutter/material.dart';
import 'package:confetti/confetti.dart';
import 'package:google_mobile_ads/google_mobile_ads.dart';
import 'package:easy_localization/easy_localization.dart';
import '../../core/constants/app_colors.dart';
import '../../services/quiz_service.dart';
import '../../services/ad_service.dart';
import 'quiz_review_screen.dart';

class QuizResultScreen extends StatefulWidget {
  final int score;
  final int totalQuestions;
  final QuizService service;

  const QuizResultScreen({
    super.key,
    required this.score,
    required this.totalQuestions,
    required this.service,
  });

  @override
  State<QuizResultScreen> createState() => _QuizResultScreenState();
}

class _QuizResultScreenState extends State<QuizResultScreen> {
  late ConfettiController _confettiController;
  final AdService _adService = AdService();

  BannerAd? _bannerAd;
  bool _isBannerAdLoaded = false;
  bool _isAdFree = false; // Premium durumu

  @override
  void initState() {
    super.initState();
    _confettiController =
        ConfettiController(duration: const Duration(seconds: 5));

    if (widget.score >= 17) {
      _confettiController.play();
    }

    _initializeAds();
  }

  // Reklam ve Premium Mantığı Başlatma
  Future<void> _initializeAds() async {
    final adFreeStatus = await _adService.isAdFree();
    if (mounted) {
      setState(() {
        _isAdFree = adFreeStatus;
      });
    }

    // Eğer kullanıcı premium DEĞİLSE reklamları yönet
    if (!adFreeStatus) {
      _loadBannerAd();
      _adService.loadInterstitial();
      // Otomatik reklam gösterme (Future.delayed) KALDIRILDI.
      // Artık butonlara basınca tetiklenecek.
    }
  }

  @override
  void dispose() {
    _confettiController.dispose();
    _bannerAd?.dispose();
    super.dispose();
  }

  void _loadBannerAd() {
    _bannerAd = BannerAd(
      adUnitId: _adService.bannerId,
      size: AdSize.banner,
      request: const AdRequest(),
      listener: BannerAdListener(
        onAdLoaded: (ad) => setState(() => _isBannerAdLoaded = true),
        onAdFailedToLoad: (ad, error) => ad.dispose(),
      ),
    )..load();
  }

  @override
  Widget build(BuildContext context) {
    bool isPassed = widget.score >= 17;

    return Scaffold(
      extendBodyBehindAppBar: true, // Full screen effect if needed, but we rely on container gradient
      body: Container(
        width: double.infinity,
        height: double.infinity,
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: AppColors.splashGradient,
          ),
        ),
        child: SafeArea(
          child: Stack(
            alignment: Alignment.topCenter,
            children: [
              ConfettiWidget(
                confettiController: _confettiController,
                blastDirectionality: BlastDirectionality.explosive,
                shouldLoop: false,
                colors: const [
                  Colors.white,
                  Colors.amber,
                  Colors.lightBlueAccent,
                ],
              ),
              SingleChildScrollView(
                padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 40),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const SizedBox(height: 40),
                    // Icon Container
                    Container(
                      padding: const EdgeInsets.all(24),
                      decoration: BoxDecoration(
                        color: Colors.white.withOpacity(0.15),
                        shape: BoxShape.circle,
                        border: Border.all(color: Colors.white30, width: 2)
                      ),
                      child: Icon(
                        isPassed
                            ? Icons.emoji_events_rounded
                            : Icons.sentiment_dissatisfied_rounded,
                        size: 80,
                        color: Colors.white,
                      ),
                    ),
                    const SizedBox(height: 32),
                    
                    // Main Title
                    Text(
                      isPassed ? "result.congrats".tr() : "result.failed".tr(),
                      textAlign: TextAlign.center,
                      style: const TextStyle(
                          fontSize: 32,
                          fontWeight: FontWeight.bold,
                          color: Colors.white,
                          letterSpacing: 1.5),
                    ),
                    const SizedBox(height: 12),
                    Text(
                      isPassed
                          ? "result.success_msg".tr()
                          : "result.failed_msg".tr(),
                      textAlign: TextAlign.center,
                      style: TextStyle(fontSize: 16, color: Colors.white.withOpacity(0.9), height: 1.5),
                    ),
                    
                    const SizedBox(height: 50),
                    _buildScoreCard(),
                    const SizedBox(height: 50),
                    _buildButtons(),
                    
                    const SizedBox(height: 80), // Bottom padding for ads
                  ],
                ),
              ),
              // Back Button (Custom positioning)
              /* 
              Positioned(
                top: 10,
                left: 10,
                child: IconButton(icon: Icon(Icons.close, color: Colors.white), onPressed: () => ...),
              ) 
              */
              // We rely on "Home" button for exit, per premium design patterns usually don't have messy appbars.
            ],
          ),
        ),
      ),
      bottomNavigationBar: (!_isAdFree && _isBannerAdLoaded && _bannerAd != null)
          ? Container(
              color: Colors.transparent, // Keep transparent or match gradient? Material Banner needs bg usually
              child: SafeArea(
                child: Container(
                  width: _bannerAd!.size.width.toDouble(),
                  height: _bannerAd!.size.height.toDouble(),
                  alignment: Alignment.center,
                  child: AdWidget(ad: _bannerAd!),
                ),
              ),
            )
          : null,
    );
  }

  Widget _buildScoreCard() {
    return Container(
      width: double.infinity,
      constraints: const BoxConstraints(maxWidth: 400),
      padding: const EdgeInsets.symmetric(vertical: 30, horizontal: 20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(30),
        boxShadow: [
          BoxShadow(color: Colors.black.withOpacity(0.2), blurRadius: 20, offset: const Offset(0, 10))
        ],
      ),
      child: Column(
        children: [
          Text("result.score_label".tr().toUpperCase(),
              style: TextStyle(
                  fontSize: 13,
                  color: AppColors.secondary,
                  fontWeight: FontWeight.bold,
                  letterSpacing: 1.2)),
          const SizedBox(height: 10),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
               Text("${widget.score}",
                  style: const TextStyle(
                      fontSize: 56,
                      fontWeight: FontWeight.bold,
                      color: AppColors.eliteDark,
                      height: 1.0)),
               Padding(
                 padding: const EdgeInsets.only(bottom: 12, left: 8),
                 child: Text("/ ${widget.totalQuestions}",
                    style: TextStyle(
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                        color: Colors.grey.shade400)),
               ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildButtons() {
    return ConstrainedBox(
      constraints: const BoxConstraints(maxWidth: 400),
      child: Column(
        children: [
          if (widget.score < widget.totalQuestions)
            SizedBox(
              width: double.infinity,
              child: OutlinedButton.icon(
                onPressed: () {
                  // Önce reklam göster, sonra yönlendir
                  _adService.showInterstitial(() {
                    Navigator.push(
                        context,
                        MaterialPageRoute(
                            builder: (context) => QuizReviewScreen(
                                questions: widget.service.questions,
                                userAnswers: widget.service.userAnswers)));
                  });
                },
                icon: const Icon(Icons.list_alt),
                label: Text("result.review_errors".tr(),
                    style: const TextStyle(fontWeight: FontWeight.bold)),
                style: OutlinedButton.styleFrom(
                  foregroundColor: Colors.white,
                  padding: const EdgeInsets.symmetric(vertical: 18),
                  side: const BorderSide(color: Colors.white60, width: 2),
                  shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(20)),
                ),
              ),
            ),
          const SizedBox(height: 16),
          SizedBox(
            width: double.infinity,
            child: ElevatedButton(
              onPressed: () {
                // Önce reklam göster, sonra ana sayfaya dön
                _adService.showInterstitial(() {
                  Navigator.of(context).popUntil((route) => route.isFirst);
                });
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.white,
                foregroundColor: AppColors.primary, // Premium Contrast
                padding: const EdgeInsets.symmetric(vertical: 18),
                shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(20)),
                elevation: 10,
                shadowColor: Colors.black26, 
              ),
              child: Text("result.home_btn".tr(),
                  style: const TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 16)),
            ),
          ),
        ],
      ),
    );
  }
}
