// [2026-01-07] File: lib/features/setup/disclaimer_screen.dart
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:easy_localization/easy_localization.dart';

import '../../core/constants/app_colors.dart';
import '../../core/constants/app_keys.dart'; // AppKeys importunu ekledim
import '../home/home_screen.dart';

class DisclaimerScreen extends StatefulWidget {
  final String selectedLang;

  const DisclaimerScreen({super.key, required this.selectedLang});

  @override
  State<DisclaimerScreen> createState() => _DisclaimerScreenState();
}

class _DisclaimerScreenState extends State<DisclaimerScreen> {
  bool _isAccepted = false;

  Future<void> _acceptAndStart(BuildContext context) async {
    if (!_isAccepted) return;

    final prefs = await SharedPreferences.getInstance();
    // Kurulumun ve uyarının tamamlandığını mühürleyelim
    await prefs.setBool('is_setup_done', true);

    if (context.mounted) {
      Navigator.pushReplacement(
          context, MaterialPageRoute(builder: (c) => const HomeScreen()));
    }
  }

  @override
  Widget build(BuildContext context) {
    return PopScope(
      canPop: false, // Geri tuşunu engelle
      child: Scaffold(
        backgroundColor: const Color(0xFFF8FAFC),
        body: Stack(
          children: [
             // Background Header Design
            Positioned(
              top: 0,
              left: 0,
              right: 0,
              height: 250,
              child: Container(
                decoration: const BoxDecoration(
                  gradient: LinearGradient(
                    colors: AppColors.splashGradient,
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                  borderRadius: BorderRadius.vertical(bottom: Radius.circular(40)),
                ),
              ),
            ),
            
            SafeArea(
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 20),
                child: Column(
                  children: [
                     const SizedBox(height: 20),
                     // Üst Kısım: Dikkat/Bilgi İkonu
                    Container(
                      padding: const EdgeInsets.all(20),
                      decoration: BoxDecoration(
                        color: Colors.white.withOpacity(0.15),
                        shape: BoxShape.circle,
                        border: Border.all(color: Colors.white24, width: 2)
                      ),
                      child: const Icon(Icons.gavel_rounded,
                          size: 48, color: Colors.white),
                    ),
                    const SizedBox(height: 24),

                    // Başlık
                    Text(
                      "setup.disclaimer_title".tr(),
                      textAlign: TextAlign.center,
                      style: GoogleFonts.poppins(
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                    ),
                    
                     const SizedBox(height: 50),

                    // İçerik Metni (Kart İçinde)
                    Expanded(
                      child: Container(
                        padding: const EdgeInsets.all(24),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(24),
                          boxShadow: [
                            BoxShadow(
                                color: Colors.black.withOpacity(0.05),
                                blurRadius: 30,
                                offset: const Offset(0, 10))
                          ],
                        ),
                        child: Column(
                          children: [
                             const Icon(Icons.info_outline_rounded, size: 32, color: AppColors.primary),
                             const SizedBox(height: 16),
                             Expanded(
                               child: SingleChildScrollView(
                                 physics: const BouncingScrollPhysics(),
                                 child: Text(
                                  "setup.disclaimer_body".tr(),
                                  textAlign: TextAlign.center,
                                  style: GoogleFonts.poppins(
                                    fontSize: 15,
                                    color: const Color(0xFF64748B),
                                    height: 1.6,
                                    fontWeight: FontWeight.w500,
                                  ),
                                 ),
                               ),
                             ),
                             const SizedBox(height: 10),
                             const Divider(),
                             // ONAY KUTUSU (CHECKBOX)
                             CheckboxListTile(
                               value: _isAccepted,
                               onChanged: (val) {
                                 setState(() {
                                   _isAccepted = val ?? false;
                                 });
                               },
                               activeColor: AppColors.primary,
                               contentPadding: EdgeInsets.zero,
                               controlAffinity: ListTileControlAffinity.leading,
                               title: Text(
                                 "setup.accept_continue".tr(),
                                 style: GoogleFonts.poppins(
                                   fontSize: 14,
                                   fontWeight: FontWeight.w600,
                                   color: const Color(0xFF0F172A),
                                 ),
                               ),
                             )
                          ],
                        ),
                      ),
                    ),

                    const SizedBox(height: 30),

                    // Anladım Butonu
                    ElevatedButton(
                      onPressed: _isAccepted ? () => _acceptAndStart(context) : null,
                      style: ElevatedButton.styleFrom(
                        backgroundColor: AppColors.primary,
                        disabledBackgroundColor: Colors.grey.shade300,
                        minimumSize: const Size(double.infinity, 60),
                        shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(16)),
                        elevation: _isAccepted ? 10 : 0,
                        shadowColor: AppColors.primary.withOpacity(0.4),
                      ),
                      child: Text(
                        "setup.understand_btn".tr(),
                        style: GoogleFonts.poppins(
                          color: _isAccepted ? Colors.white : Colors.grey.shade500,
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                          letterSpacing: 1,
                        ),
                      ),
                    ),
                    const SizedBox(height: 10),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
