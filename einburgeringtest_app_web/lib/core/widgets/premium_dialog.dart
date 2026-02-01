import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:easy_localization/easy_localization.dart';
import '../constants/app_colors.dart';

class PremiumDialog extends StatelessWidget {
  final String title;
  final String? content;
  final Widget? contentWidget;
  final String confirmText;
  final Color confirmColor;
  final VoidCallback onConfirm;
  final bool showCancel;
  final String? cancelText;
  final IconData? icon;

  const PremiumDialog({
    super.key,
    required this.title,
    this.content,
    this.contentWidget,
    required this.confirmText,
    required this.onConfirm,
    this.confirmColor = AppColors.primary,
    this.showCancel = true,
    this.cancelText,
    this.icon,
  });

  static Future<T?> show<T>({
    required BuildContext context,
    required String title,
    String? content,
    Widget? contentWidget,
    required String confirmText,
    required VoidCallback onConfirm,
    Color confirmColor = AppColors.primary,
    bool showCancel = true,
    String? cancelText,
    IconData? icon,
    bool barrierDismissible = true,
  }) {
    return showDialog<T>(
      context: context,
      barrierDismissible: barrierDismissible,
      builder: (context) => PremiumDialog(
        title: title,
        content: content,
        contentWidget: contentWidget,
        confirmText: confirmText,
        onConfirm: onConfirm,
        confirmColor: confirmColor,
        showCancel: showCancel,
        cancelText: cancelText,
        icon: icon,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
      backgroundColor: Colors.white,
      elevation: 0, // Remove default elevation to control shadow via shape if needed, but AlertDialog handles it well.
      titlePadding: const EdgeInsets.fromLTRB(24, 24, 24, 16),
      contentPadding: const EdgeInsets.fromLTRB(24, 0, 24, 24),
      
      // TITLE SECTION
      title: Column(
        children: [
          if (icon != null) ...[
             Container(
               padding: const EdgeInsets.all(16),
               decoration: BoxDecoration(
                 color: confirmColor.withOpacity(0.1),
                 shape: BoxShape.circle
               ),
               child: Icon(icon, color: confirmColor, size: 32),
             ),
             const SizedBox(height: 16),
          ],
          Text(
            title,
            textAlign: TextAlign.center,
            style: GoogleFonts.poppins(
              fontSize: 20,
              fontWeight: FontWeight.bold,
              color: AppColors.eliteDark,
            ),
          ),
        ],
      ),

      // CONTENT SECTION
      content: SingleChildScrollView(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            if (content != null)
              Text(content!,
                  textAlign: TextAlign.center,
                  style: GoogleFonts.poppins(fontSize: 15, color: Colors.blueGrey.shade700, height: 1.5)),
            
            if (contentWidget != null) ...[
               if (content != null) const SizedBox(height: 16),
               contentWidget!,
            ]
          ],
        ),
      ),

      // ACTIONS SECTION
      actionsPadding: const EdgeInsets.fromLTRB(24, 0, 24, 24),
      actions: [
        Row(
          children: [
            if (showCancel) ...[
              Expanded(
                child: TextButton(
                  onPressed: () => Navigator.of(context).pop(),
                  style: TextButton.styleFrom(
                    padding: const EdgeInsets.symmetric(vertical: 12),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  ),
                  child: Text(
                    cancelText ?? "common.cancel".tr(),
                    style: GoogleFonts.poppins(
                      color: Colors.grey.shade600,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
              ),
              const SizedBox(width: 8),
            ],

            Expanded(
              child: ElevatedButton(
                onPressed: onConfirm,
                style: ElevatedButton.styleFrom(
                  backgroundColor: confirmColor,
                  foregroundColor: Colors.white,
                  elevation: 0,
                  padding: const EdgeInsets.symmetric(vertical: 12),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                ),
                child: Text(
                  confirmText,
                  style: GoogleFonts.poppins(
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ),
          ],
        )
      ],
    );
  }
}
