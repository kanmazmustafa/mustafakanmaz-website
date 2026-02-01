import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

class StripeService {
  static final StripeService _instance = StripeService._internal();
  factory StripeService() => _instance;
  StripeService._internal();

  // Payment Links from RevenueCat/Stripe Dashboard
  static const Map<String, String> _paymentLinks = {
    // TODO: Add real production links if Web payment is enabled
    'lifetime': '',
    'monthly': '',
  };

  Future<void> initialize() async {
    // No initialization needed for just redirection
    debugPrint("StripeService: initialized (Redirection Mode)");
  }

  Future<void> redirectToCheckout(String packageId) async {
    // Determine link based on packageId or logic
    String? urlString;
    if (packageId.toLowerCase().contains("life")) {
      urlString = _paymentLinks['lifetime'];
    } else {
      urlString = _paymentLinks['monthly'];
    }

    if (urlString != null) {
      final Uri url = Uri.parse(urlString);
      if (!await launchUrl(url, mode: LaunchMode.externalApplication)) {
        debugPrint("Could not launch $url");
      }
    } else {
      debugPrint("No payment link found for package: $packageId");
    }
  }
}
