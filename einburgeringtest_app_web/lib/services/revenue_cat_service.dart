// [2026-01-21] File: lib/services/revenue_cat_service.dart
import 'dart:async';
import 'dart:io';
import 'package:flutter/foundation.dart';
import 'package:flutter/services.dart';
import 'package:purchases_flutter/purchases_flutter.dart';
import '../core/config/environment_config.dart';

class RevenueCatService {
  static final RevenueCatService _instance = RevenueCatService._internal();
  factory RevenueCatService() => _instance;
  RevenueCatService._internal();

  // --- CONFIGURATION ---
  static const _googleApiKey = EnvironmentConfig.googleApiKey;
  static const _iosApiKey = EnvironmentConfig.iosApiKey;

  // Entitlement ID configured in RevenueCat dashboard
  static const String entitlementId = 'pro_access';

  // Package Identifiers (Must match RevenueCat Console)
  static const String PKG_LIFETIME = 'lifetime_bundle';
  static const String PKG_MONTHLY = 'monthly_access';
  // Add other packages as needed for the German test context if they differ

  // Status Stream for UI feedback
  final StreamController<CustomerInfo> _customerInfoController =
      StreamController<CustomerInfo>.broadcast();
  Stream<CustomerInfo> get customerInfoStream => _customerInfoController.stream;

  bool _isPro = false;
  bool get isPro => _isPro;

  /// Initialize RevenueCat SDK
  Future<void> initialize() async {
    if (kIsWeb) return;

    if (kDebugMode) {
      await Purchases.setLogLevel(LogLevel.debug);
    }

    PurchasesConfiguration? configuration;
    if (Platform.isAndroid) {
      configuration = PurchasesConfiguration(_googleApiKey);
    } else if (Platform.isIOS) {
      configuration = PurchasesConfiguration(_iosApiKey);
    }

    if (configuration != null) {
      await Purchases.configure(configuration);
      await _checkEntitlement();
    }
  }

  /// Check current entitlement status (is user premium?)
  Future<void> _checkEntitlement() async {
    try {
      CustomerInfo customerInfo = await Purchases.getCustomerInfo();
      _updateStatus(customerInfo);

      // Listen to future updates (e.g. renewals, restores from other devices)
      Purchases.addCustomerInfoUpdateListener((info) {
        _updateStatus(info);
      });
    } on PlatformException catch (e) {
      debugPrint("RevenueCat check failed: $e");
    }
  }

  void _updateStatus(CustomerInfo customerInfo) {
    final status = customerInfo.entitlements.all[entitlementId];
    final bool isActive = status != null && status.isActive;

    if (_isPro != isActive) {
      _isPro = isActive;
      _customerInfoController.add(customerInfo);
      debugPrint("RevenueCat: Updated Pro Status to $_isPro");
    }
  }

  /// Fetch available offerings (products) to display in UI
  Future<Offerings?> getOfferings() async {
    try {
      Offerings offerings = await Purchases.getOfferings();
      if (offerings.current != null) {
        return offerings;
      }
    } on PlatformException catch (e) {
      debugPrint("Error fetching offerings: $e");
    }
    return null;
  }

  /// Purchase a package
  Future<bool> purchasePackage(Package package) async {
    try {
      CustomerInfo customerInfo = await Purchases.purchasePackage(package);
      final status = customerInfo.entitlements.all[entitlementId];
      return status != null && status.isActive;
    } on PlatformException catch (e) {
      var errorCode = PurchasesErrorHelper.getErrorCode(e);
      if (errorCode != PurchasesErrorCode.purchaseCancelledError) {
        debugPrint("Purchase failed: $e");
      }
      return false;
    }
  }

  /// Restore purchases
  Future<bool> restorePurchases() async {
    try {
      debugPrint("Restore: Starting restore process...");
      CustomerInfo customerInfo = await Purchases.restorePurchases();

      debugPrint("Restore: CustomerInfo fetched.");
      debugPrint(
          "Restore: Active Entitlements: ${customerInfo.entitlements.active.keys}");
      debugPrint(
          "Restore: All Entitlements: ${customerInfo.entitlements.all.keys}");

      final status = customerInfo.entitlements.all[entitlementId];
      if (status != null) {
        debugPrint(
            "Restore: Found entitlement '$entitlementId', isActive: ${status.isActive}");
      } else {
        debugPrint(
            "Restore: Entitlement '$entitlementId' NOT FOUND in user record.");
        // Fallback: Check if any entitlement is active (maybe they named it 'premium' or something else)
        if (customerInfo.entitlements.active.isNotEmpty) {
          debugPrint(
              "Restore: BUT other entitlements are active: ${customerInfo.entitlements.active.keys}");
        }
      }

      return status != null && status.isActive;
    } on PlatformException catch (e) {
      debugPrint("Restore failed: $e");
      return false;
    }
  }
}
