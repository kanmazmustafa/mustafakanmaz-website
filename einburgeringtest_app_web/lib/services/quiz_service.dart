// [2026-01-06] File: lib/services/quiz_service.dart
import 'dart:convert';
import 'package:flutter/services.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/question_model.dart';
import '../core/constants/app_keys.dart';

class QuizService {
  List<QuestionModel> questions = [];
  int currentIndex = 0;
  Map<int, int?> userAnswers = {}; // Soru Index -> Seçilen Şık Index

  QuestionModel get currentQuestion => questions[currentIndex];
  bool get isFinished =>
      questions.isEmpty || currentIndex >= questions.length - 1;

  /// Soruları yükler. [isSimulation] true ise 30 genel + 3 eyalet sorusu seçer.
  Future<void> loadQuestions(String state, String lang,
      {bool isSimulation = false}) async {
    currentIndex = 0;
    userAnswers.clear();

    try {
      // 1. Veri Kaynaklarını Yükle
      final String genRes =
          await rootBundle.loadString('assets/data/questions.json');
      final String stateRes =
          await rootBundle.loadString('assets/data/questions_states.json');

      // 2. DEDEKTİF: Açıklamaları Yükle
      Map<String, dynamic> explanationsMap = {};
      try {
        final String explRes =
            await rootBundle.loadString('assets/data/lang/$lang.json');
        explanationsMap = json.decode(explRes);
      } catch (e) {
        print(
            "DEDEKTIF (Quiz): Açıklama dosyası yüklenemedi, boş devam ediliyor.");
      }

      List genData = json.decode(genRes);
      List stateData = json.decode(stateRes);

      // 3. Genel Soruları Map Et
      List<QuestionModel> allGen = genData
          .map<QuestionModel>((q) => QuestionModel.fromJson(q, lang,
              explanationText: explanationsMap[q['id'].toString()]))
          .toList();

      // 4. Sadece Seçili Eyaletin Sorularını Map Et ve Filtrele
      List<QuestionModel> allState = stateData
          .map<QuestionModel>((q) => QuestionModel.fromJson(q, lang,
              explanationText: explanationsMap[q['id'].toString()]))
          .where((q) =>
              q.state?.trim().toLowerCase() == state.trim().toLowerCase())
          .toList();

      if (isSimulation) {
        // Gerçek Sınav Modu: 30 Genel (Karışık) + 3 Eyalet (Karışık)
        allGen.shuffle();
        allState.shuffle();
        questions = [...allGen.take(30), ...allState.take(3)];
      } else {
        // Tüm Havuz Modu
        questions = [...allGen, ...allState];
      }

      // Sınav içindeki sıralamayı da karıştır
      questions.shuffle();
    } catch (e) {
      print("QuizService Yükleme Hatası: $e");
      questions = [];
    }
  }

  /// Cevabı kaydeder
  void submitAnswer(int? index) => userAnswers[currentIndex] = index;

  /// Belirli bir soruya atlar
  void jumpTo(int index) {
    if (index >= 0 && index < questions.length) currentIndex = index;
  }

  /// Bir sonraki soruya geçer
  void nextQuestion() {
    if (!isFinished) currentIndex++;
  }

  /// Doğru cevap sayısını hesaplar
  int calculateFinalScore() {
    int score = 0;
    for (int i = 0; i < questions.length; i++) {
      if (userAnswers[i] == questions[i].correctAnswerIndex) {
        score++;
      }
    }
    return score;
  }

  /// Sınav sonuçlarını SharedPreferences üzerine mühürler
  Future<void> saveResults() async {
    final prefs = await SharedPreferences.getInstance();

    // Mevcut listeleri al (AppKeys kullanarak)
    Set<String> mastered =
        (prefs.getStringList(AppKeys.masteredQuestions) ?? []).toSet();
    Set<String> failed =
        (prefs.getStringList(AppKeys.failedQuestions) ?? []).toSet();

    for (int i = 0; i < questions.length; i++) {
      String idStr = questions[i].id.toString();

      if (userAnswers[i] == questions[i].correctAnswerIndex) {
        // Doğru ise: Mastered listesine ekle, Failed listesinden sil
        mastered.add(idStr);
        failed.remove(idStr);
      } else {
        // Yanlış veya Boş ise: Mastered listesinden sil, Failed listesine ekle
        mastered.remove(idStr);
        failed.add(idStr);
      }
    }

    // Güncel listeleri kaydet
    await prefs.setStringList(AppKeys.masteredQuestions, mastered.toList());
    await prefs.setStringList(AppKeys.failedQuestions, failed.toList());
  }
}
