// [2026-01-07] File: lib/services/practice_service.dart
import 'dart:convert';
import 'package:flutter/services.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/question_model.dart';
import '../core/constants/app_keys.dart';

class PracticeService {
  List<QuestionModel> questions = [];
  int currentIndex = 0;
  String? currentCategoryId;
  List<String> _bookmarkedIds = [];

  // Kategori Sabitleri
  static const String catDemocracy = "Politik in der Demokratie";
  static const String catHistory = "Geschichte und Verantwortung";
  static const String catSociety = "Mensch und Gesellschaft";

  /// Soruları yükler, filtreler ve karıştırır.
  Future<List<QuestionModel>> loadAndFilterQuestions({
    required String selectedState,
    required String selectedLang,
    String? categoryId,
    bool onlyFailed = false,
    bool onlyBookmarks = false,
  }) async {
    currentCategoryId = categoryId;
    try {
      // 1. Ham verileri yükle
      final String genRes =
          await rootBundle.loadString('assets/data/questions.json');
      final String stateRes =
          await rootBundle.loadString('assets/data/questions_states.json');

      List genData = json.decode(genRes);
      List stateData = json.decode(stateRes);

      // 2. Dil bazlı açıklamaları yükle (Eğer varsa)
      Map<String, dynamic> explanationsMap = {};
      try {
        final String explRes = await rootBundle
            .loadString('assets/data/lang/${selectedLang.toLowerCase()}.json');
        explanationsMap = json.decode(explRes);
      } catch (_) {
        // Açıklama dosyası yoksa boş devam et
      }

      // 3. Modelleri oluştur
      List<QuestionModel> allQuestions = [];
      for (var q in [...genData, ...stateData]) {
        allQuestions.add(QuestionModel.fromJson(
          q,
          selectedLang,
          explanationText: explanationsMap[q['id'].toString()],
        ));
      }

      // Cache bookmarks
      final prefs = await SharedPreferences.getInstance();
      _bookmarkedIds = prefs.getStringList(AppKeys.bookmarkedQuestions) ?? [];

      // 4. Filtreleme Mantığı
      List<QuestionModel> filtered = [];

      if (onlyFailed) {
        final prefs = await SharedPreferences.getInstance();
        List<String> failedIds =
            prefs.getStringList(AppKeys.failedQuestions) ?? [];
        filtered = allQuestions
            .where((q) => failedIds.contains(q.id.toString()))
            .toList();
      } else if (onlyBookmarks) {
        filtered = allQuestions
            .where((q) => _bookmarkedIds.contains(q.id.toString()))
            .toList();
      } else if (categoryId == "STATE_QUESTIONS") {
        filtered = allQuestions
            .where((q) => q.state?.trim() == selectedState.trim())
            .toList();
      } else if (categoryId == catDemocracy) {
        // Eyalet sorusu olmayan ve sadece demokrasi kategorisi olanlar
        filtered = allQuestions
            .where((q) => q.state == null && q.category == catDemocracy)
            .toList();
      } else if (categoryId == catHistory || categoryId == catSociety) {
        filtered = allQuestions
            .where((q) => q.state == null && q.category == categoryId)
            .toList();
      } else {
        // Varsayılan: Genel test (Eyalet soruları hariç)
        filtered = allQuestions.where((q) => q.state == null).toList();
      }

      // 5. Servis state'ini güncelle
      // Eski: questions = filtered..shuffle();
      // Yeni: ID'ye göre sırala ve kaldığı yerden devam et
      questions = filtered;
      questions.sort((a, b) => a.id.compareTo(b.id));

      if (categoryId != null) {
        final prefs = await SharedPreferences.getInstance();
        int savedIndex = prefs.getInt('progress_$categoryId') ?? 0;

        // Güvenlik kontrolü: Kaydedilen index liste sınırını aşıyorsa 0'a çek
        if (savedIndex >= questions.length || savedIndex < 0) {
          savedIndex = 0;
        }
        currentIndex = savedIndex;
      } else {
        currentIndex = 0;
      }

      return questions;
    } catch (e) {
      throw Exception("Soru yükleme ve filtreleme hatası: $e");
    }
  }

  // --- İLERLEME KAYDETME ---

  Future<void> saveCurrentProgress() async {
    if (currentCategoryId == null) return;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setInt('progress_$currentCategoryId', currentIndex);
  }

  // --- EKSİK GETTERLAR ---

  QuestionModel get currentQuestion {
    if (questions.isEmpty) {
      // Boş liste durumunda hata fırlatmamak için geçici boş model veya hata yönetimi
      // Ama normal akışta load yapıldığı için sorun olmamalı.
      throw Exception("Soru listesi boş!");
    }
    return questions[currentIndex];
  }

  bool get isFinished =>
      questions.isEmpty || currentIndex >= questions.length - 1;

  // --- İLERLEME KAYIT METOTLARI ---

  Future<void> addToMastered(int id) async {
    final prefs = await SharedPreferences.getInstance();
    List<String> list = prefs.getStringList(AppKeys.masteredQuestions) ?? [];
    if (!list.contains(id.toString())) {
      list.add(id.toString());
      await prefs.setStringList(AppKeys.masteredQuestions, list);
    }
    await _markAsSolved(id);
  }

  Future<void> removeFromMastered(int id) async {
    final prefs = await SharedPreferences.getInstance();
    List<String> list = prefs.getStringList(AppKeys.masteredQuestions) ?? [];
    if (list.contains(id.toString())) {
      list.remove(id.toString());
      await prefs.setStringList(AppKeys.masteredQuestions, list);
    }
  }

  Future<void> addToFailed(int id) async {
    final prefs = await SharedPreferences.getInstance();
    List<String> list = prefs.getStringList(AppKeys.failedQuestions) ?? [];
    if (!list.contains(id.toString())) {
      list.add(id.toString());
      await prefs.setStringList(AppKeys.failedQuestions, list);
    }
    await _markAsSolved(id);
  }

  Future<void> removeFromFailed(int id) async {
    final prefs = await SharedPreferences.getInstance();
    List<String> list = prefs.getStringList(AppKeys.failedQuestions) ?? [];
    if (list.contains(id.toString())) {
      list.remove(id.toString());
      await prefs.setStringList(AppKeys.failedQuestions, list);
    }
  }

  Future<void> addToBookmarks(int id) async {
    if (!_bookmarkedIds.contains(id.toString())) {
      _bookmarkedIds.add(id.toString());
      final prefs = await SharedPreferences.getInstance();
      await prefs.setStringList(AppKeys.bookmarkedQuestions, _bookmarkedIds);
    }
  }

  Future<void> removeFromBookmarks(int id) async {
    if (_bookmarkedIds.contains(id.toString())) {
      _bookmarkedIds.remove(id.toString());
      final prefs = await SharedPreferences.getInstance();
      await prefs.setStringList(AppKeys.bookmarkedQuestions, _bookmarkedIds);
    }
  }

  bool isBookmarked(int id) {
    return _bookmarkedIds.contains(id.toString());
  }

  Future<void> _markAsSolved(int id) async {
    final prefs = await SharedPreferences.getInstance();
    List<String> list = prefs.getStringList(AppKeys.solvedQuestions) ?? [];
    if (!list.contains(id.toString())) {
      list.add(id.toString());
      await prefs.setStringList(AppKeys.solvedQuestions, list);
    }
  }

  Future<double> getOverallProgress() async {
    final prefs = await SharedPreferences.getInstance();
    List<String> solvedIds = prefs.getStringList(AppKeys.solvedQuestions) ?? [];
    // Toplam soru sayısına oranla (Örn: 300 genel + 10 eyalet = 310)
    return solvedIds.length / 310;
  }
}
