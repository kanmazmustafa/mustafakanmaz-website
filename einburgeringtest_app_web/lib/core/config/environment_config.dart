// lib/core/config/environment_config.dart
import 'package:flutter/foundation.dart';

class EnvironmentConfig {
  static const String googleApiKey = String.fromEnvironment(
    'REVENUECAT_GOOGLE_API_KEY',
    defaultValue: 'goog_placeholder_key',
  );

  static const String iosApiKey = String.fromEnvironment(
    'REVENUECAT_IOS_API_KEY',
    defaultValue: 'ios_placeholder_key',
  );

  static bool get isProduction => kReleaseMode;
}
