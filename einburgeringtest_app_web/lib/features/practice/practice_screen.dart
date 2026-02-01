// [2026-01-07] File: lib/features/practice/practice_screen.dart
import 'package:flutter/material.dart';
import 'package:google_mobile_ads/google_mobile_ads.dart';
import 'package:easy_localization/easy_localization.dart';

import '../../services/practice_service.dart';
import '../../services/ad_service.dart'; // Yeni eklendi
import '../../core/widgets/bottom_banner_ad.dart'; // Eklendi
import '../../core/constants/app_colors.dart';
import '../../models/question_model.dart';

class PracticeScreen extends StatefulWidget {
  final PracticeService service;
  final String title;

  const PracticeScreen({super.key, required this.service, required this.title});

  @override
  State<PracticeScreen> createState() => _PracticeScreenState();
}

class _PracticeScreenState extends State<PracticeScreen> {
  final AdService _adService = AdService(); // Reklam servisi eklendi
  int? tappedIndex;
  bool showAnswer = false;
  BannerAd? _bannerAd;
  bool _isBannerAdLoaded = false;
  bool _isAdFree = false; // Premium durumunu tutar
  final ScrollController _scrollController = ScrollController();

  @override
  void initState() {
    super.initState();
    _checkPremiumAndLoadAds();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (widget.service.currentIndex > 0) {
        _scrollToIndex(widget.service.currentIndex);
      }
    });
  }

  void _scrollToIndex(int index) {
    if (!_scrollController.hasClients) return;

    // Estimate: ChoiceChip width ~50px + 8px padding = 58px.
    // Using 60px as a safe average stride.
    double screenWidth = MediaQuery.of(context).size.width;
    double itemWidth = 60.0;
    double offset =
        (10 + (index * itemWidth) + (itemWidth / 2)) - (screenWidth / 2);

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
    _bannerAd?.dispose();
    _scrollController.dispose();
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
        onAdFailedToLoad: (ad, error) => ad.dispose(),
      ),
    )..load();
  }

  void _jumpToQuestion(int index) {
    if (index < 0 || index >= widget.service.questions.length) return;
    setState(() {
      widget.service.currentIndex = index;
      tappedIndex = null;
      showAnswer = false;
      _scrollToIndex(index);
      widget.service.saveCurrentProgress();
    });
  }

  void _handleTap(int index, QuestionModel q) {
    if (showAnswer) return;
    setState(() {
      tappedIndex = index;
      showAnswer = true;
    });

    if (index == q.correctAnswerIndex) {
      widget.service.addToMastered(q.id);
      widget.service.removeFromFailed(q.id);
    } else {
      widget.service.removeFromMastered(q.id);
      widget.service.addToFailed(q.id);
    }
  }

  void _toggleBookmark(QuestionModel q) {
    setState(() {
      if (widget.service.isBookmarked(q.id)) {
        widget.service.removeFromBookmarks(q.id);
      } else {
        widget.service.addToBookmarks(q.id);
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    // Liste boşsa hata mesajı göster
    if (widget.service.questions.isEmpty) {
      return Scaffold(
        appBar: AppBar(
            backgroundColor: AppColors.primary, title: Text(widget.title.tr())),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Icon(Icons.search_off_rounded,
                  size: 64, color: Colors.grey),
              const SizedBox(height: 16),
              Text("home.no_questions".tr(),
                  style: const TextStyle(color: Colors.grey, fontSize: 16)),
              TextButton(
                  onPressed: () => Navigator.pop(context),
                  child: Text("common.close".tr()))
            ],
          ),
        ),
      );
    }

    final q = widget.service.currentQuestion;
    final double screenWidth = MediaQuery.of(context).size.width;

    return Scaffold(
      backgroundColor: const Color(0xFFF1F5F9),
      appBar: AppBar(
        backgroundColor: AppColors.primary,
        title: Text(widget.title.tr(),
            style: const TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
                color: Colors.white)),
        centerTitle: true,
        iconTheme: const IconThemeData(color: Colors.white),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,
      floatingActionButton: _buildActionButtons(),
      bottomNavigationBar: _buildBottomNavWithAds(),
      body: Column(
        children: [
          _buildProgressBar(),
          Expanded(
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(20),
              child: Column(
                children: [
                  _buildQuestionCard(q, screenWidth),
                  const SizedBox(height: 20),
                  ...List.generate(q.options.length,
                      (i) => _buildOptionCard(i, q, screenWidth)),
                  if (showAnswer) ...[
                    const SizedBox(height: 15),
                    _buildExplanationArea(q),
                  ],
                  const SizedBox(height: 120),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  // --- MODÜLER WIDGETLAR ---

  Widget _buildProgressBar() {
    return LinearProgressIndicator(
        value: ((widget.service.currentIndex + 1) /
                widget.service.questions.length)
            .clamp(0.0, 1.0),
        backgroundColor: Colors.white,
        color: Colors.orange);
  }

  Widget _buildActionButtons() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Opacity(
            opacity: widget.service.currentIndex > 0 ? 1.0 : 0.0,
            child: FloatingActionButton.extended(
              heroTag: "pracPrev",
              onPressed: widget.service.currentIndex > 0
                  ? () => _jumpToQuestion(widget.service.currentIndex - 1)
                  : null,
              backgroundColor: Colors.orange,
              icon: const Icon(Icons.arrow_back, color: Colors.white),
              label: Text("practice.prev".tr(),
                  style: const TextStyle(
                      color: Colors.white, fontWeight: FontWeight.bold)),
            ),
          ),
          FloatingActionButton.extended(
            heroTag: "pracNext",
            onPressed: () {
              if (widget.service.isFinished) {
                // Video reklam göster, sonra kapat
                _adService
                    .loadInterstitial(); // Emin olmak için yüklemeyi tetikle
                _adService.showInterstitial(() {
                  if (mounted) Navigator.pop(context);
                });
              } else {
                _jumpToQuestion(widget.service.currentIndex + 1);
              }
            },
            backgroundColor: Colors.orange,
            icon: Icon(
                widget.service.isFinished ? Icons.check : Icons.arrow_forward,
                color: Colors.white),
            label: Text(
                widget.service.isFinished
                    ? "practice.finish".tr()
                    : "practice.next".tr(),
                style: const TextStyle(
                    color: Colors.white, fontWeight: FontWeight.bold)),
          ),
        ],
      ),
    );
  }

  Widget _buildBottomNavWithAds() {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Container(
          height: 65,
          decoration: BoxDecoration(
              color: Colors.white,
              border: Border(top: BorderSide(color: Colors.grey.shade300))),
          child: ListView.builder(
            controller: _scrollController,
            scrollDirection: Axis.horizontal,
            itemCount: widget.service.questions.length,
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
            itemBuilder: (context, index) {
              bool isCurrent = widget.service.currentIndex == index;
              return Padding(
                padding: const EdgeInsets.symmetric(horizontal: 4),
                child: ChoiceChip(
                  label: Text('${index + 1}'),
                  selected: isCurrent,
                  onSelected: (_) => _jumpToQuestion(index),
                  selectedColor: AppColors.primary,
                  labelStyle: TextStyle(
                      color: isCurrent ? Colors.white : Colors.black,
                      fontWeight: FontWeight.bold),
                ),
              );
            },
          ),
        ),
        // Merkezi Banner Bileşeni
        BottomBannerAd(),
      ],
    );
  }

  Widget _buildQuestionCard(QuestionModel q, double width) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(22),
      decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(16),
          boxShadow: [
            BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 10)
          ]),
      child: Column(
        children: [
          if (q.image != null && q.image!.isNotEmpty) ...[
            ClipRRect(
                borderRadius: BorderRadius.circular(10),
                child: Image.asset(
                    q.image!.startsWith('assets/')
                        ? q.image!
                        : "assets/images/${q.image}",
                    height: 150,
                    fit: BoxFit.contain)),
            const SizedBox(height: 15),
          ],

          // Question Header with ID and Bookmark
          Stack(
            alignment: Alignment.center,
            children: [
              Align(
                alignment: Alignment.center,
                child: Text(q.questionText,
                    textAlign: TextAlign.center,
                    style: const TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                        color: Color(0xFF1E293B))),
              ),
              Align(
                alignment: Alignment.topRight,
                child: IconButton(
                  icon: Icon(
                    widget.service.isBookmarked(q.id)
                        ? Icons.star
                        : Icons.star_border,
                    color: Colors.amber,
                    size: 32,
                  ),
                  onPressed: () => _toggleBookmark(q),
                ),
              )
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildOptionCard(int i, QuestionModel q, double width) {
    bool isCorrect = i == q.correctAnswerIndex;
    bool isTapped = i == tappedIndex;
    Color cardColor = Colors.white;
    Color borderColor = Colors.grey.shade200;
    if (showAnswer) {
      if (isCorrect) {
        cardColor = Colors.green.shade50;
        borderColor = Colors.green;
      } else if (isTapped) {
        cardColor = Colors.red.shade50;
        borderColor = Colors.red;
      }
    }
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: GestureDetector(
        onTap: () => _handleTap(i, q),
        child: Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
              color: cardColor,
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: borderColor, width: 2)),
          child: Row(
            children: [
              CircleAvatar(
                  radius: 14,
                  backgroundColor: borderColor.withOpacity(0.1),
                  child: Text(String.fromCharCode(65 + i),
                      style: const TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.bold,
                          color: Colors.grey))),
              const SizedBox(width: 15),
              Expanded(
                  child: Text(q.options[i],
                      style: const TextStyle(
                          fontSize: 15, fontWeight: FontWeight.w500))),
              if (showAnswer && isCorrect)
                const Icon(Icons.check_circle, color: Colors.green, size: 22),
              if (showAnswer && isTapped && !isCorrect)
                const Icon(Icons.cancel, color: Colors.red, size: 22),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildExplanationArea(QuestionModel q) {
    if (q.explanation != null && q.explanation!.isNotEmpty) {
      return Container(
        width: double.infinity,
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
            color: Colors.blue.shade50,
            borderRadius: BorderRadius.circular(15),
            border: Border.all(color: Colors.blue.shade200, width: 1.5)),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                const Icon(Icons.info_outline, color: Colors.blue, size: 22),
                const SizedBox(width: 8),
                Text("practice.explanation".tr(),
                    style: const TextStyle(
                        fontWeight: FontWeight.bold,
                        color: Colors.blue,
                        fontSize: 15)),
              ],
            ),
            const SizedBox(height: 10),
            Text(q.explanation!,
                style: TextStyle(
                    color: Colors.blue.shade900, fontSize: 14, height: 1.5)),
          ],
        ),
      );
    }
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
          color: Colors.grey.shade200, borderRadius: BorderRadius.circular(10)),
      child: Text("practice.no_explanation".tr(),
          style: const TextStyle(
              color: Colors.grey, fontSize: 12, fontStyle: FontStyle.italic)),
    );
  }
}
