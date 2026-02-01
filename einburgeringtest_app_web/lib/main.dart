// [2026-01-07] File: lib/main.dart
import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';

import 'package:google_mobile_ads/google_mobile_ads.dart';
import 'package:easy_localization/easy_localization.dart';
import 'core/theme/app_theme.dart';
import 'features/splash/splash_screen.dart';
import 'services/iap_service.dart';
import 'core/utils/custom_asset_loader.dart';
import 'package:firebase_core/firebase_core.dart';
import 'firebase_options.dart';
import 'services/revenue_cat_service.dart';
import 'services/stripe_service.dart';
import 'package:flutter/foundation.dart';
import 'package:google_sign_in/google_sign_in.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await EasyLocalization.ensureInitialized();

  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );

  // Initialize Google Sign-In with Server Client ID for Android
  await GoogleSignIn.instance.initialize(
    serverClientId:
        '800048961892-2avf5jccm4lb9cm519p6is5bhfumv8bj.apps.googleusercontent.com',
  );

  try {
    await MobileAds.instance.initialize();
  } catch (e) {
    debugPrint("AdMob: $e");
  }

  if (kIsWeb) {
    await StripeService().initialize();
  } else {
    try {
      await RevenueCatService().initialize();
    } catch (e) {
      debugPrint("RevenueCat: $e");
    }
  }

  // Legacy IAP (Keeping it just in case, but RevenueCat should take over)
  try {
    IAPService().initialize();
  } catch (e) {
    debugPrint("IAP: $e");
  }

  runApp(
    EasyLocalization(
      supportedLocales: const [
        Locale('ar'),
        Locale('bg'),
        Locale('bs'),
        Locale('de'),
        Locale('el'),
        Locale('en'),
        Locale('es'),
        Locale('fa'),
        Locale('fr'),
        Locale('he'),
        Locale('hi'),
        Locale('hr'),
        Locale('hu'),
        Locale('it'),
        Locale('ja'),
        Locale('ku'),
        Locale('nl'),
        Locale('pl'),
        Locale('ps'),
        Locale('pt'),
        Locale('ro'),
        Locale('ru'),
        Locale('sq'),
        Locale('sr'),
        Locale('th'),
        Locale('tr'),
        Locale('uk'),
        Locale('vi'),
        Locale('zh'),
      ],
      path: 'assets/translations',
      assetLoader: const CustomAssetLoader(), // BU KRİTİK
      fallbackLocale: const Locale('de'),
      useOnlyLangCode: true,
      child: const CitizenshipApp(),
    ),
  );
}

class CitizenshipApp extends StatelessWidget {
  const CitizenshipApp({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      localizationsDelegates: [
        ...context.localizationDelegates,
        const FallbackCupertinoLocalisationsDelegate(),
        const FallbackMaterialLocalisationsDelegate(),
      ],
      supportedLocales: context.supportedLocales,
      locale: context.locale,
      theme: AppTheme.lightTheme,
      home: const SplashScreen(),
    );
  }
}

class FallbackCupertinoLocalisationsDelegate
    extends LocalizationsDelegate<CupertinoLocalizations> {
  const FallbackCupertinoLocalisationsDelegate();

  @override
  bool isSupported(Locale locale) => true;

  @override
  Future<CupertinoLocalizations> load(Locale locale) =>
      DefaultCupertinoLocalizations.load(const Locale('en'));

  @override
  bool shouldReload(FallbackCupertinoLocalisationsDelegate old) => false;
}

class FallbackMaterialLocalisationsDelegate
    extends LocalizationsDelegate<MaterialLocalizations> {
  const FallbackMaterialLocalisationsDelegate();

  @override
  bool isSupported(Locale locale) => true;

  @override
  Future<MaterialLocalizations> load(Locale locale) =>
      DefaultMaterialLocalizations.load(const Locale('en'));

  @override
  bool shouldReload(FallbackMaterialLocalisationsDelegate old) => false;
}
