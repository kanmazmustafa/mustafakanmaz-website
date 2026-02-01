// [2026-01-07] File: lib/core/utils/custom_asset_loader.dart
import 'dart:convert';
import 'dart:ui';
import 'package:flutter/services.dart';
import 'package:easy_localization/easy_localization.dart';

class CustomAssetLoader extends AssetLoader {
  const CustomAssetLoader();

  @override
  Future<Map<String, dynamic>?> load(String path, Locale locale) async {
    // Senin istediğin format: assets/translations/ui_tr.json
    final String file = "$path/ui_${locale.languageCode}.json";
    try {
      final String content = await rootBundle.loadString(file);
      return json.decode(content);
    } catch (e) {
      return null;
    }
  }
}
