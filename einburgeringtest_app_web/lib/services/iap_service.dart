// [2026-01-07] File: lib/services/iap_service.dart
import 'dart:async';
import 'package:in_app_purchase/in_app_purchase.dart';
import 'ad_service.dart';

class IAPService {
  static final IAPService _instance = IAPService._internal();
  factory IAPService() => _instance;
  IAPService._internal();

  final InAppPurchase _inAppPurchase = InAppPurchase.instance;
  late StreamSubscription<List<PurchaseDetails>> _subscription;
  final AdService _adService = AdService();

  // Play Console'da tanımladığın ID'ler
  static const String lifetimeID = 'premium_permanent';

  // Feedback Stream
  final StreamController<String> _statusController = StreamController<String>.broadcast();
  Stream<String> get statusStream => _statusController.stream;

  bool _restoreFound = false;

  void initialize() {
    final Stream<List<PurchaseDetails>> purchaseUpdated =
        _inAppPurchase.purchaseStream;
    _subscription = purchaseUpdated.listen((purchaseDetailsList) {
      _listenToPurchaseUpdated(purchaseDetailsList);
    }, onDone: () {
      _subscription.cancel();
    }, onError: (error) {
      _statusController.add("ERROR");
    });
  }

  Future<void> restorePurchases() async {
    _restoreFound = false;
    _statusController.add("LOADING"); // Optional: UI can show spinner
    try {
      await _inAppPurchase.restorePurchases();
      // Heuristic: Wait for stream to process results
      await Future.delayed(const Duration(seconds: 3));
      if (!_restoreFound) {
        _statusController.add("RESTORE_NOT_FOUND");
      }
    } catch (e) {
      _statusController.add("ERROR");
    }
  }

  Future<void> buyLifetime() async {
    _statusController.add("LOADING"); // UI'da spinner gösterebiliriz
    final bool available = await _inAppPurchase.isAvailable();
    if (!available) {
      _statusController.add("STORE_UNAVAILABLE");
      return;
    }

    const Set<String> _kIds = {lifetimeID};
    final ProductDetailsResponse response =
        await _inAppPurchase.queryProductDetails(_kIds);

    if (response.notFoundIDs.isNotEmpty) {
       // Debug için loga yaz, belki kullanıcıya 'Ürün bulunamadı' deriz
       print("Not found IDs: ${response.notFoundIDs}");
    }

    if (response.productDetails.isEmpty) {
      _statusController.add("PRODUCT_NOT_FOUND");
      return;
    }

    final PurchaseParam purchaseParam =
        PurchaseParam(productDetails: response.productDetails.first);
    await _inAppPurchase.buyNonConsumable(purchaseParam: purchaseParam);
  }

  void _listenToPurchaseUpdated(List<PurchaseDetails> purchaseDetailsList) {
    purchaseDetailsList.forEach((PurchaseDetails purchaseDetails) async {
      if (purchaseDetails.status == PurchaseStatus.purchased ||
          purchaseDetails.status == PurchaseStatus.restored) {
        
        // ÖMÜR BOYU SATIN ALIM DOĞRULAMA
        if (purchaseDetails.productID == lifetimeID) {
          await _adService.activateLifetimePremium();
          
          if (purchaseDetails.status == PurchaseStatus.restored) {
             _restoreFound = true;
             _statusController.add("RESTORE_SUCCESS");
          }
        }

        if (purchaseDetails.pendingCompletePurchase) {
          await _inAppPurchase.completePurchase(purchaseDetails);
        }
      }
    });
  }

  void dispose() {
    _subscription.cancel();
  }
}
