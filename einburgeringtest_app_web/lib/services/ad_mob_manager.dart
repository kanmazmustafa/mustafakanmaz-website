// File: lib/services/ad_mob_manager.dart
import 'package:flutter/foundation.dart'; // kIsWeb ve defaultTargetPlatform için
import 'package:google_mobile_ads/google_mobile_ads.dart';

class AdMobManager {
  // Web'de çökmemesi için Platform.isAndroid yerine defaultTargetPlatform kullanıyoruz
  static String get bannerAdUnitId {
    if (kIsWeb) return ""; 
    if (defaultTargetPlatform == TargetPlatform.android) {
      return 'ca-app-pub-7011720768538565/6137482526'; // Real Android ID
    }
    return "";
  }

  static String get interstitialAdUnitId {
    if (kIsWeb) return ""; 
    if (defaultTargetPlatform == TargetPlatform.android) {
      return 'ca-app-pub-7011720768538565/3894462564'; // Real Android ID
    }
    return "";
  }

  static BannerAd? createBannerAd(Function(Ad) onAdLoaded) {
    if (kIsWeb) return null; // Web'de asla reklam oluşturma
    
    return BannerAd(
      adUnitId: bannerAdUnitId,
      size: AdSize.banner,
      request: const AdRequest(),
      listener: BannerAdListener(
        onAdLoaded: onAdLoaded,
        onAdFailedToLoad: (ad, error) {
          ad.dispose();
          debugPrint('Ad failed to load: $error');
        },
      ),
    );
  }
}