// [2026-01-07] File: lib/services/ad_service.dart
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:google_mobile_ads/google_mobile_ads.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:in_app_purchase/in_app_purchase.dart';

class AdService {
  static final AdService _instance = AdService._internal();
  factory AdService() => _instance;
  AdService._internal() {
    // Başlangıçta durumu kontrol et
    checkPremiumStatus();
  }

  InterstitialAd? _interstitialAd;
  RewardedAd? _rewardedAd;
  bool _isRewardedReady = false;

  // Premium durumu değişikliğini dinlemek için Notifier
  // true = Premium (Reklamsız), false = Normal (Reklamlı)
  final ValueNotifier<bool> premiumStatusNotifier = ValueNotifier<bool>(false);


  // Test ID'leri (Yayına çıkarken gerçek ID'ler ile değiştirilmelidir)
  String get bannerId => Platform.isAndroid
      ? 'ca-app-pub-7011720768538565/6137482526' // Real Android ID
      : 'ca-app-pub-3940256099942544/2934735716';

  String get interstitialId => Platform.isAndroid
      ? 'ca-app-pub-7011720768538565/3894462564' // Real Android ID
      : 'ca-app-pub-3940256099942544/4411468910';

  String get rewardedId => Platform.isAndroid
      ? 'ca-app-pub-7011720768538565/2817362222' // Real Android ID
      : 'ca-app-pub-3940256099942544/1712485313';

  // --- PREMIUM DURUM KONTROLLERİ ---

  /// Kullanıcının ömür boyu premium alıp almadığını kontrol eder.
  Future<bool> isLifetimePremium() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getBool('is_lifetime_premium') ?? false;
  }

  /// 2 saatlik reklamsız modun bitiş zamanını döndürür.
  Future<DateTime?> getAdFreeExpiration() async {
    final prefs = await SharedPreferences.getInstance();
    final timeStr = prefs.getString('ad_free_until');
    if (timeStr == null) return null;
    return DateTime.parse(timeStr);
  }

  /// 2 saatlik reklamsız modun şu an aktif olup olmadığını kontrol eder.
  Future<bool> isTemporaryAdFreeActive() async {
    final expiration = await getAdFreeExpiration();
    if (expiration == null) return false;
    return DateTime.now().isBefore(expiration);
  }

  /// Herhangi bir premium modun (Ömür boyu veya 2 saatlik) aktif olup olmadığını kontrol eder.
  Future<bool> isAdFree() async {
    final isPremium = await isLifetimePremium() || await isTemporaryAdFreeActive();
    premiumStatusNotifier.value = isPremium;
    return isPremium;
  }

  /// Premium durumunu kontrol eder ve notifier'ı günceller
  Future<void> checkPremiumStatus() async {
    await isAdFree();
  }

  // --- AKTİVASYON İŞLEMLERİ ---

  /// Ömür boyu premium modunu kalıcı olarak aktif eder.
  Future<void> activateLifetimePremium() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool('is_lifetime_premium', true);
    // Durumu güncelle
    premiumStatusNotifier.value = true;
  }

  /// Ödüllü reklam sonrası 2 saatlik reklamsız süreyi başlatır.
  Future<void> activateTwoHoursAdFree() async {
    final prefs = await SharedPreferences.getInstance();
    final expireTime = DateTime.now().add(const Duration(hours: 2));
    await prefs.setString('ad_free_until', expireTime.toIso8601String());
    // Durumu güncelle
    premiumStatusNotifier.value = true;
  }

  // --- REKLAM YÜKLEME VE GÖSTERME ---

  /// Geçiş reklamını (Interstitial) yükler.
  void loadInterstitial() {
    InterstitialAd.load(
      adUnitId: interstitialId,
      request: const AdRequest(),
      adLoadCallback: InterstitialAdLoadCallback(
        onAdLoaded: (ad) => _interstitialAd = ad,
        onAdFailedToLoad: (err) => _interstitialAd = null,
      ),
    );
  }

  /// Ödüllü reklamı (Rewarded) yükler.
  void loadRewardedAd() {
    _isRewardedReady = false;
    RewardedAd.load(
      adUnitId: rewardedId,
      request: const AdRequest(),
      rewardedAdLoadCallback: RewardedAdLoadCallback(
        onAdLoaded: (ad) {
          _rewardedAd = ad;
          _isRewardedReady = true;
        },
        onAdFailedToLoad: (err) {
          _isRewardedReady = false;
          // Başarısız olursa bir süre sonra tekrar dene
          Future.delayed(const Duration(seconds: 10), () => loadRewardedAd());
        },
      ),
    );
  }

  /// Geçiş reklamını gösterir (Premium kullanıcılar otomatik atlar).
  Future<void> showInterstitial(VoidCallback onComplete) async {
    if (await isAdFree() || _interstitialAd == null) {
      onComplete();
      return;
    }

    _interstitialAd!.fullScreenContentCallback = FullScreenContentCallback(
      onAdDismissedFullScreenContent: (ad) {
        ad.dispose();
        loadInterstitial(); // Bir sonraki için hazırla
        onComplete();
      },
      onAdFailedToShowFullScreenContent: (ad, err) {
        ad.dispose();
        onComplete();
      },
    );
    _interstitialAd!.show();
    _interstitialAd = null;
  }

  /// Ödüllü reklamı gösterir ve başarılıysa 2 saatlik süreyi başlatır.
  void showRewardedAd(VoidCallback onRewardEarned, VoidCallback onAdNotReady) {
    if (_isRewardedReady && _rewardedAd != null) {
      _rewardedAd!.fullScreenContentCallback = FullScreenContentCallback(
        onAdDismissedFullScreenContent: (ad) {
          ad.dispose();
          loadRewardedAd(); // Yeni reklam yükle
        },
      );

      _rewardedAd!.show(onUserEarnedReward: (ad, reward) async {
        await activateTwoHoursAdFree();
        onRewardEarned();
      });
      _rewardedAd = null;
    } else {
      onAdNotReady();
      loadRewardedAd();
    }
  }

  // --- SATIN ALIMLARI GERİ YÜKLE (RESTORE) ---

  /// Google Play'den daha önce satın alınmış ürünleri sorgular.
  Future<void> restorePurchases() async {
    await InAppPurchase.instance.restorePurchases();
    // Not: Geri yükleme sonuçları IAPService içindeki stream'e düşer.
  }
}
