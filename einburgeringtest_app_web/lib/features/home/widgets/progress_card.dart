// [2026-01-06] File: lib/features/home/widgets/progress_card.dart
import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import '../../../core/constants/app_colors.dart';

class ProgressCard extends StatelessWidget {
  final double overallProgress;

  const ProgressCard({super.key, required this.overallProgress});

  @override
  Widget build(BuildContext context) {
    return Container(
        width: double.infinity,
        padding: const EdgeInsets.all(22),
        decoration: BoxDecoration(
            gradient: LinearGradient(
                colors: [AppColors.primary, const Color(0xFF1E293B)]),
            borderRadius: BorderRadius.circular(28),
            boxShadow: [
              BoxShadow(
                  color: AppColors.primary.withOpacity(0.3),
                  blurRadius: 20,
                  offset: const Offset(0, 10))
            ]),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
            Text("home.overall_success".tr(),
                style: const TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.w600,
                    fontSize: 16)),
            Text("${(overallProgress * 100).toInt()}%",
                style: const TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                    fontSize: 26))
          ]),
          const SizedBox(height: 15),
          ClipRRect(
              borderRadius: BorderRadius.circular(10),
              child: LinearProgressIndicator(
                  value: overallProgress,
                  minHeight: 12,
                  backgroundColor: Colors.white24,
                  color: Colors.orangeAccent))
        ]));
  }
}
