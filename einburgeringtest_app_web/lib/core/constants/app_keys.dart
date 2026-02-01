// [2026-01-07] File: lib/core/constants/app_keys.dart

class AppKeys {
  // Kullanıcı Tercihleri
  static const String userState = "user_state";
  static const String userLang = "user_lang";
  static const String isPremium = "is_premium";

  // Sınav Verileri
  static const String solvedQuestions =
      "solved_questions"; // Çözülen toplam sorular
  static const String failedQuestions =
      "failed_questions"; // Yanlış yapılan sorular
  static const String masteredQuestions =
      "mastered_questions"; // Uzmanlaşılan (öğrenilen) sorular
  static const String bookmarkedQuestions =
      "bookmarked_questions"; // Favorilenen sorular

  // Premium Mod (2 Saatlik)
  static const String premiumExpiry = "premium_expiry";
}
