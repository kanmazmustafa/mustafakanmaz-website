// [2026-01-07] File: lib/features/home/widgets/premium_action_button.dart
import 'dart:async';
import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import '../../../core/constants/app_colors.dart';
import '../../../services/ad_service.dart';

class PremiumActionButton extends StatefulWidget {
  final AdService adService;
  final VoidCallback onOpenSelection;

  const PremiumActionButton({
    super.key,
    required this.adService,
    required this.onOpenSelection,
  });

  @override
  State<PremiumActionButton> createState() => _PremiumActionButtonState();
}

class _PremiumActionButtonState extends State<PremiumActionButton> {
  Timer? _timer;
  Duration _remainingTime = Duration.zero;
  bool _isLifetime = false;
  bool _isTempActive = false;

  @override
  void initState() {
    super.initState();
    _checkStatus();
    _startTimer();
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  Future<void> _checkStatus() async {
    final lifetime = await widget.adService.isLifetimePremium();
    final temp = await widget.adService.isTemporaryAdFreeActive();
    if (mounted) {
      setState(() {
        _isLifetime = lifetime;
        _isTempActive = temp;
      });
    }
  }

  void _startTimer() {
    _timer = Timer.periodic(const Duration(seconds: 1), (timer) async {
      final expiration = await widget.adService.getAdFreeExpiration();
      final lifetime = await widget.adService.isLifetimePremium();

      if (lifetime) {
        timer.cancel();
        if (mounted) setState(() => _isLifetime = true);
        return;
      }

      if (expiration != null) {
        final remaining = expiration.difference(DateTime.now());
        if (remaining.isNegative) {
          if (mounted) setState(() => _isTempActive = false);
        } else {
          if (mounted) {
            setState(() {
              _isTempActive = true;
              _remainingTime = remaining;
            });
          }
        }
      }
    });
  }

  String _formatDuration(Duration duration) {
    String twoDigits(int n) => n.toString().padLeft(2, "0");
    return "${twoDigits(duration.inHours)}:${twoDigits(duration.inMinutes.remainder(60))}:${twoDigits(duration.inSeconds.remainder(60))}";
  }

  @override
  Widget build(BuildContext context) {
    // KURAL: Ömür boyu premium ise rozet göster
    if (_isLifetime) {
      return Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
        decoration: BoxDecoration(
          color: AppColors.premiumGold.withOpacity(0.15),
          borderRadius: BorderRadius.circular(20),
          border: Border.all(color: AppColors.premiumGold, width: 1.5),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Icon(Icons.workspace_premium_rounded,
                color: AppColors.premiumGold, size: 18),
            const SizedBox(width: 4),
            Text(
              "premium.badge".tr(),
              style: const TextStyle(
                color: AppColors.premiumGold,
                fontWeight: FontWeight.bold,
                fontSize: 12,
              ),
            ),
          ],
        ),
      );
    }

    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        if (_isTempActive)
          Padding(
            padding: const EdgeInsetsDirectional.only(end: 4),
            child: Text(
              _formatDuration(_remainingTime),
              style: const TextStyle(
                color: Colors.blueAccent,
                fontWeight: FontWeight.bold,
                fontSize: 13,
                fontFamily: 'monospace',
              ),
            ),
          ),
        IconButton(
          icon: Icon(
            _isTempActive ? Icons.bolt_rounded : Icons.offline_bolt_outlined,
            color: _isTempActive ? Colors.blue : Colors.white70,
          ),
          onPressed: widget.onOpenSelection,
        ),
      ],
    );
  }
}
