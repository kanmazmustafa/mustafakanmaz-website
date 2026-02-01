// [2026-01-06] File: lib/services/premium_service.dart
import 'package:shared_preferences/shared_preferences.dart';

class PremiumService {
  static const String _lifetimeKey = "is_lifetime_premium";
  static const String _expiryKey = "premium_expiry_time";

  // Kullanıcı herhangi bir şekilde premium mu?
  Future<bool> isPremiumActive() async {
    final prefs = await SharedPreferences.getInstance();

    // 1. Ömür boyu satın almış mı?
    if (prefs.getBool(_lifetimeKey) ?? false) return true;

    // 2. Süreli premiumu var mı ve süresi dolmamış mı?
    int? expiry = prefs.getInt(_expiryKey);
    if (expiry != null) {
      final expiryDate = DateTime.fromMillisecondsSinceEpoch(expiry);
      if (DateTime.now().isBefore(expiryDate)) {
        return true;
      }
    }
    return false;
  }

  // Ömür boyu premium yap (Satın alma sonrası)
  Future<void> setLifetimePremium() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool(_lifetimeKey, true);
  }

  // 2 Saatlik Premium Ver (Reklam izleme sonrası)
  Future<void> setTemporaryPremium(int hours) async {
    final prefs = await SharedPreferences.getInstance();
    final expiryDate = DateTime.now().add(Duration(hours: hours));
    await prefs.setInt(_expiryKey, expiryDate.millisecondsSinceEpoch);
  }

  // Kalan süreyi yazdır (Opsiyonel - UI'da göstermek için)
  Future<String> getRemainingTime() async {
    final prefs = await SharedPreferences.getInstance();
    int? expiry = prefs.getInt(_expiryKey);
    if (expiry == null) return "";
    final diff =
        DateTime.fromMillisecondsSinceEpoch(expiry).difference(DateTime.now());
    if (diff.isNegative) return "";
    return "${diff.inMinutes} dk kaldı";
  }
}
