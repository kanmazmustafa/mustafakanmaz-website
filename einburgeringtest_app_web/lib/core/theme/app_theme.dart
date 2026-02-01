// [2026-01-07] File: lib/core/theme/app_theme.dart
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../constants/app_colors.dart';

class AppTheme {
  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      
      // Renk Paleti
      primaryColor: AppColors.primary,
      scaffoldBackgroundColor: AppColors.background,
      colorScheme: ColorScheme.fromSeed(
        seedColor: AppColors.primary,
        primary: AppColors.primary,
        secondary: AppColors.secondary,
        surface: AppColors.background,
      ),

      // Tipografi (Google Fonts - Poppins)
      textTheme: GoogleFonts.poppinsTextTheme().copyWith(
        displayLarge: const TextStyle(fontWeight: FontWeight.bold, color: AppColors.eliteDark),
        displayMedium: const TextStyle(fontWeight: FontWeight.bold, color: AppColors.eliteDark),
        bodyLarge: const TextStyle(color: AppColors.eliteDark),
        bodyMedium: const TextStyle(color: AppColors.secondary),
      ),

      // Kart Teması (Premium Soft Shadow)
      cardTheme: CardThemeData(
        color: AppColors.cardBg,
        elevation: 10,
        shadowColor: Colors.black.withOpacity(0.05),
        margin: const EdgeInsets.symmetric(vertical: 8),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
      ),

      // AppBar Teması (Temiz)
      appBarTheme: const AppBarTheme(
        backgroundColor: Colors.transparent,
        elevation: 0,
        centerTitle: true,
        scrolledUnderElevation: 0,
        titleTextStyle: TextStyle(
          color: AppColors.primary,
          fontSize: 20,
          fontWeight: FontWeight.bold,
        ),
        iconTheme: IconThemeData(color: Colors.white),
      ),

      // Buton Teması (Modern)
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: AppColors.primary,
          foregroundColor: Colors.white,
          minimumSize: const Size(double.infinity, 56),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
          elevation: 4,
          shadowColor: AppColors.primary.withOpacity(0.4),
          textStyle: GoogleFonts.poppins(
            fontSize: 16,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),
      
      // Icon Teması
      iconTheme: const IconThemeData(
        color: AppColors.primary,
      ),
    );
  }
}