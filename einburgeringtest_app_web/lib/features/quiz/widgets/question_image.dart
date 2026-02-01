// [2026-01-06] File: lib/features/quiz/widgets/question_image.dart
import 'package:flutter/material.dart';

class QuestionImage extends StatelessWidget {
  final String url;
  const QuestionImage({super.key, required this.url});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(vertical: 16),
      decoration: BoxDecoration(borderRadius: BorderRadius.circular(12), color: Colors.white),
      child: Image.asset(url, height: 180, fit: BoxFit.contain, 
        errorBuilder: (c, e, s) => const Icon(Icons.broken_image, size: 50, color: Colors.grey)),
    );
  }
}