// [2026-01-07] File: lib/features/home/widgets/language_selector.dart
import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:google_fonts/google_fonts.dart'; // Font consistency
import '../../../core/constants/app_colors.dart';
import '../../../core/widgets/premium_dialog.dart'; // Import Reusable UI

class LanguageSelector {
  static void show(BuildContext context, String currentLang,
      Function(String) onLanguageChanged) {
        
    final List<Map<String, String>> languages = [
      {'code': 'ar', 'name': 'العربية'},
      {'code': 'bg', 'name': 'Български'},
      {'code': 'bs', 'name': 'Bosanski'},
      {'code': 'de', 'name': 'Deutsch'},
      {'code': 'el', 'name': 'Ελληνικά'},
      {'code': 'en', 'name': 'English'},
      {'code': 'es', 'name': 'Español'},
      {'code': 'fa', 'name': 'فارسی'},
      {'code': 'fr', 'name': 'Français'},
      {'code': 'he', 'name': 'עברית'},
      {'code': 'hi', 'name': 'हिन्दी'},
      {'code': 'hr', 'name': 'Hrvatski'},
      {'code': 'hu', 'name': 'Magyar'},
      {'code': 'it', 'name': 'Italiano'},
      {'code': 'ja', 'name': '日本語'},
      {'code': 'ku', 'name': 'Kurdî'},
      {'code': 'nl', 'name': 'Nederlands'},
      {'code': 'pl', 'name': 'Polski'},
      {'code': 'ps', 'name': 'پښتو'},
      {'code': 'pt', 'name': 'Português'},
      {'code': 'ro', 'name': 'Română'},
      {'code': 'ru', 'name': 'Русский'},
      {'code': 'sq', 'name': 'Shqip'},
      {'code': 'sr', 'name': 'Српски'},
      {'code': 'th', 'name': 'ไทย'},
      {'code': 'tr', 'name': 'Türkçe'},
      {'code': 'uk', 'name': 'Українська'},
      {'code': 'vi', 'name': 'Tiếng Việt'},
      {'code': 'zh', 'name': '中文'},
    ];

    PremiumDialog.show(
      context: context,
      title: "drawer.lang_selection".tr(),
      confirmText: "common.close".tr(),
      confirmColor: Colors.grey, // Sadece kapatma butonu olsun
      onConfirm: () => Navigator.pop(context), 
      showCancel: false, // Cancel butonuna gerek yok, confirm "Kapat" görevi görecek
      contentWidget: Column(
        mainAxisSize: MainAxisSize.min,
        children: languages.map((lang) {
          final bool isSelected = lang['code'] == currentLang;
          return Padding(
            padding: const EdgeInsets.only(bottom: 8.0),
            child: InkWell(
              onTap: () {
                Navigator.pop(context); // Close selection dialog
                _showConfirmDialog(context, lang['code']!, onLanguageChanged);
              },
              borderRadius: BorderRadius.circular(12),
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                decoration: BoxDecoration(
                  color: isSelected ? AppColors.primary.withOpacity(0.1) : Colors.white,
                  border: Border.all(
                    color: isSelected ? AppColors.primary : Colors.grey.shade200
                  ),
                  borderRadius: BorderRadius.circular(12)
                ),
                child: Row(
                  children: [
                    Text(lang['code']!.toUpperCase(),
                        style: GoogleFonts.poppins(
                            fontWeight: FontWeight.bold,
                            color: isSelected ? AppColors.primary : Colors.grey.shade600)),
                    const SizedBox(width: 16),
                    Text(lang['name']!, 
                         style: GoogleFonts.poppins(fontWeight: FontWeight.w500)),
                    const Spacer(),
                    if (isSelected)
                      const Icon(Icons.check_circle_rounded, color: AppColors.primary)
                  ],
                ),
              ),
            ),
          );
        }).toList(),
      ), 
    );
  }

  static void _showConfirmDialog(
      BuildContext context, String langCode, Function(String) onConfirmed) {
    
    PremiumDialog.show(
      context: context,
      title: "drawer.lang_change_title".tr(),
      content: "drawer.lang_change_content".tr(args: [langCode.toUpperCase()]),
      confirmText: "common.confirm".tr(),
      icon: Icons.language,
      onConfirm: () async {
          // 1. Locale güncelle
          await context.setLocale(Locale(langCode));
          // 2. Local Storage güncelle
          final prefs = await SharedPreferences.getInstance();
          await prefs.setString('user_lang', langCode);

          Navigator.pop(context); // Close dialog
          onConfirmed(langCode);
      },
    );
  }
}
