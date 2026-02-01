// [2026-01-07] Premium Redesigned Drawer
import 'package:flutter/material.dart';
import 'package:share_plus/share_plus.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../../core/constants/app_colors.dart';

class MainDrawer extends StatelessWidget {
  final String selectedState;
  final String selectedLang;
  final double overallProgress;
  final VoidCallback onStateTap;
  final VoidCallback onLangTap;
  final VoidCallback onRestoreTap;
  final VoidCallback onPremiumTap;
  final VoidCallback onLogoutTap;
  final VoidCallback onDeleteAccountTap;
  final String? userEmail;
  final bool isPremium;

  const MainDrawer({
    super.key,
    required this.selectedState,
    required this.selectedLang,
    required this.overallProgress,
    required this.onStateTap,
    required this.onLangTap,
    required this.onRestoreTap,
    required this.onPremiumTap,
    required this.onLogoutTap,
    required this.onDeleteAccountTap,
    this.userEmail,
    this.isPremium = false,
  });

  @override
  Widget build(BuildContext context) {
    return Drawer(
      backgroundColor: Colors.white,
      surfaceTintColor: Colors.white,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.only(
            topRight: Radius.circular(30), bottomRight: Radius.circular(30)),
      ),
      child: Column(
        children: [
          _buildHeader(),

          // SCROLLABLE MENU ITEMS
          Expanded(
            child: ListView(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 20),
              children: [
                _buildSectionTitle("drawer.settings".tr()),
                _buildDrawerItem(
                  icon: Icons.map_rounded,
                  title: "drawer.state_selection".tr(),
                  subtitle: selectedState,
                  onTap: onStateTap,
                  color: Colors.blue.shade700,
                ),
                _buildDrawerItem(
                  icon: Icons.language_rounded,
                  title: "drawer.lang_selection".tr(),
                  subtitle: selectedLang.toUpperCase(),
                  onTap: onLangTap,
                  color: Colors.purple.shade700,
                ),
                const SizedBox(height: 24),
                _buildSectionTitle("drawer.other".tr()),
                _buildDrawerItem(
                  icon: Icons.history_rounded,
                  title: "premium.restore_title".tr(),
                  onTap: onRestoreTap,
                  color: Colors.grey.shade700,
                ),
                _buildDrawerItem(
                  icon: Icons.share_rounded,
                  title: "drawer.share".tr(),
                  onTap: () {
                    Share.share(
                        "https://play.google.com/store/apps/details?id=com.kanmazmustafa.einbuergerungstest");
                  },
                  color: Colors.grey.shade700,
                ),
                _buildDrawerItem(
                  icon: Icons.logout_rounded,
                  title: "auth.logout".tr(),
                  onTap: onLogoutTap,
                  color: Colors.red.shade700,
                ),
                _buildDrawerItem(
                  icon: Icons.delete_forever_rounded,
                  title: "auth.delete_account".tr(),
                  onTap: onDeleteAccountTap,
                  color: Colors.red.shade300,
                ),
              ],
            ),
          ),

          // PREMIUM BUTTON AT BOTTOM (Footer)
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: const Color(0xFFF8FAFC),
              border: Border(top: BorderSide(color: Colors.grey.shade200)),
            ),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                if (!isPremium) _buildPremiumCard(),
                if (!isPremium) const SizedBox(height: 16),
                Text("v1.0.1 (Build 10)",
                    style: GoogleFonts.poppins(
                        color: Colors.grey.shade400, fontSize: 11)),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildHeader() {
    return Container(
      padding: const EdgeInsets.fromLTRB(24, 60, 24, 24),
      decoration: BoxDecoration(
          gradient: const LinearGradient(
            colors: AppColors.splashGradient,
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
          boxShadow: [
            BoxShadow(
                color: AppColors.primary.withOpacity(0.3),
                blurRadius: 15,
                offset: const Offset(0, 5))
          ]),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(3),
            decoration: BoxDecoration(
              color: Colors.white.withOpacity(0.2),
              shape: BoxShape.circle,
            ),
            child: const CircleAvatar(
              backgroundColor: Colors.white,
              radius: 32,
              child: Icon(Icons.person_rounded,
                  color: AppColors.primary, size: 36),
            ),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  userEmail ?? "drawer.user_profile".tr(),
                  style: GoogleFonts.poppins(
                      color: Colors.white,
                      fontWeight: FontWeight.bold,
                      fontSize: userEmail != null ? 14 : 18),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
                if (isPremium)
                  Padding(
                    padding: const EdgeInsets.only(top: 4, bottom: 4),
                    child: Container(
                      padding: const EdgeInsets.symmetric(
                          horizontal: 8, vertical: 2),
                      decoration: BoxDecoration(
                        color: AppColors.premiumGold,
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          const Icon(Icons.star_rounded,
                              color: Colors.black, size: 12),
                          const SizedBox(width: 4),
                          Text(
                            "premium.member".tr(),
                            style: GoogleFonts.poppins(
                                color: Colors.black,
                                fontSize: 10,
                                fontWeight: FontWeight.bold),
                          ),
                        ],
                      ),
                    ),
                  ),
                const SizedBox(height: 4),
                Container(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                  decoration: BoxDecoration(
                      color: Colors.white.withOpacity(0.2),
                      borderRadius: BorderRadius.circular(12)),
                  child: Text(
                    "%${(overallProgress * 100).toStringAsFixed(0)} ${'drawer.success'.tr()}",
                    style: GoogleFonts.poppins(
                        color: Colors.white,
                        fontSize: 12,
                        fontWeight: FontWeight.w600),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSectionTitle(String title) {
    return Padding(
      padding: const EdgeInsetsDirectional.only(start: 12, bottom: 8),
      child: Text(
        title.toUpperCase(),
        style: GoogleFonts.poppins(
            fontSize: 11,
            fontWeight: FontWeight.bold,
            color: Colors.grey.shade400,
            letterSpacing: 1.2),
      ),
    );
  }

  Widget _buildDrawerItem({
    required IconData icon,
    required String title,
    String? subtitle,
    required VoidCallback onTap,
    required Color color,
  }) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: ListTile(
        onTap: onTap,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
        tileColor: Colors.grey.shade50,
        leading: Container(
          padding: const EdgeInsets.all(10),
          decoration: BoxDecoration(
              color: color.withOpacity(0.1), shape: BoxShape.circle),
          child: Icon(icon, color: color, size: 22),
        ),
        title: Text(title,
            style: GoogleFonts.poppins(
                fontWeight: FontWeight.w600,
                fontSize: 14,
                color: AppColors.eliteDark)),
        subtitle: subtitle != null
            ? Text(subtitle,
                style: GoogleFonts.poppins(
                    fontSize: 12, color: Colors.grey.shade600))
            : null,
        trailing: Icon(Icons.chevron_right_rounded,
            size: 20, color: Colors.grey.shade400),
      ),
    );
  }

  Widget _buildPremiumCard() {
    return GestureDetector(
      onTap: onPremiumTap,
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
            gradient: const LinearGradient(colors: [
              Color(0xFFFFD700),
              Color(0xFFFFA500)
            ]), // Gold Gradient
            borderRadius: BorderRadius.circular(20),
            boxShadow: [
              BoxShadow(
                  color: Colors.orange.withOpacity(0.3),
                  blurRadius: 15,
                  offset: const Offset(0, 8))
            ]),
        child: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                  color: Colors.white.withOpacity(0.3), shape: BoxShape.circle),
              child: const Icon(Icons.workspace_premium_rounded,
                  color: Colors.white, size: 24),
            ),
            const SizedBox(width: 16),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text("premium.upgrade_btn".tr(),
                      style: GoogleFonts.poppins(
                          color: Colors.white,
                          fontWeight: FontWeight.bold,
                          fontSize: 16)),
                  Text("premium.lifetime_sub".tr(),
                      style: GoogleFonts.poppins(
                          color: Colors.white.withOpacity(0.9), fontSize: 12)),
                ],
              ),
            ),
            const Icon(Icons.arrow_forward_rounded, color: Colors.white),
          ],
        ),
      ),
    );
  }
}
