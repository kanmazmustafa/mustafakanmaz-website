// [2026-01-06] File: lib/features/quiz/widgets/option_card.dart
import 'package:flutter/material.dart';
import '../../../core/constants/app_colors.dart';

class OptionCard extends StatelessWidget {
  final String label;
  final String text;
  final bool isSelected;
  final bool? isCorrect; // Feedback modu için
  final VoidCallback onTap;

  const OptionCard({super.key, required this.label, required this.text, required this.isSelected, this.isCorrect, required this.onTap});

  @override
  Widget build(BuildContext context) {
    Color bg = isSelected ? AppColors.primary.withOpacity(0.1) : AppColors.cardBg;
    if (isCorrect != null) bg = isCorrect! ? AppColors.success : AppColors.error;

    return GestureDetector(
      onTap: onTap,
      child: Container(
        margin: const EdgeInsets.only(bottom: 12),
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(color: bg, borderRadius: BorderRadius.circular(12), border: Border.all(color: Colors.grey.shade300)),
        child: Text("$label) $text"),
      ),
    );
  }
}