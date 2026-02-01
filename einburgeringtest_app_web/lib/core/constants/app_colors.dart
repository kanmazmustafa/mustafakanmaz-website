// [2026-01-06] File: lib/core/constants/app_colors.dart
import 'package:flutter/material.dart';

class AppColors {
  // Ana Renkler
  static const Color primary = Color(0xFF1E3A8A); // Elite Lacivert
  static const Color secondary = Color(0xFF64748B);
  static const Color background = Color(0xFFF8FAFC);
  static const Color success = Color(0xFF10B981);
  static const Color error = Color(0xFFEF4444);
  static const Color cardBg = Colors.white;

  // Premium & Elite Accents
  static const Color premiumGold = Color(0xFFFFD700);
  static const Color eliteDark = Color(0xFF0F172A);

  // Splash Ekranı Gradyen Renkleri
  static const List<Color> splashGradient = [
    Color(0xFF0F172A), // Daha derin bir başlangıç
    Color(0xFF1E3A8A),
    Color(0xFF1E40AF),
  ];
}
