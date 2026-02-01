import 'package:flutter/material.dart';
import 'package:google_mobile_ads/google_mobile_ads.dart';
import '../../services/ad_service.dart';

class BottomBannerAd extends StatefulWidget {
  const BottomBannerAd({super.key});

  @override
  State<BottomBannerAd> createState() => _BottomBannerAdState();
}

class _BottomBannerAdState extends State<BottomBannerAd> {
  BannerAd? _bannerAd;
  bool _isLoaded = false;
  final AdService _adService = AdService();

  @override
  void initState() {
    super.initState();
    _loadAd();
  }

  Future<void> _loadAd() async {
    // Premium kontrolü
    if (await _adService.isAdFree()) return;

    _bannerAd = BannerAd(
      adUnitId: _adService.bannerId,
      size: AdSize.banner,
      request: const AdRequest(),
      listener: BannerAdListener(
        onAdLoaded: (ad) {
          if (mounted) {
            setState(() => _isLoaded = true);
          }
        },
        onAdFailedToLoad: (ad, error) {
          ad.dispose();
          debugPrint('Banner failed to load: $error');
        },
      ),
    )..load();
  }

  @override
  void dispose() {
    _bannerAd?.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return ValueListenableBuilder<bool>(
      valueListenable: _adService.premiumStatusNotifier,
      builder: (context, isPremium, child) {
        // Eğer premium ise veya reklam henüz yüklenmediyse gösterme
        if (isPremium || !_isLoaded || _bannerAd == null) return const SizedBox.shrink();

        return SafeArea(
          child: Container(
            width: _bannerAd!.size.width.toDouble(),
            height: _bannerAd!.size.height.toDouble(),
            alignment: Alignment.center,
            child: AdWidget(ad: _bannerAd!),
          ),
        );
      },
    );
  }
}
