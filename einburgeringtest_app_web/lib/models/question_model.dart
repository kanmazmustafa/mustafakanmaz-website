// [2026-01-06] File: lib/models/question_model.dart

class QuestionModel {
  final int id;
  final String questionText;
  final List<String> options;
  final int correctAnswerIndex;
  final String? image;
  final String? category;
  final String? state;
  final String? explanation;

  QuestionModel({
    required this.id,
    required this.questionText,
    required this.options,
    required this.correctAnswerIndex,
    this.image,
    this.category,
    this.state,
    this.explanation,
  });

  /// JSON verisini modele dönüştürür.
  /// [lang] parametresi 'tr', 'en' gibi aktif dili belirtir.
  /// [explanationText] harici dil dosyalarından (DEDEKTİF servisi) gelen açıklamadır.
  factory QuestionModel.fromJson(Map<String, dynamic> json, String lang,
      {String? explanationText}) {
    // Soru metni için dil kontrolü (Seçili dil -> Almanca -> Boş)
    String qText = json['question_$lang'] ?? json['question_de'] ?? '';

    // Şıklar için dil kontrolü
    var optionsMap = json['options_$lang'] ?? json['options_de'] ?? {};

    // Şık listesini 'a', 'b', 'c', 'd' sırasıyla oluşturur
    List<String> opts = [
      optionsMap['a']?.toString() ?? '',
      optionsMap['b']?.toString() ?? '',
      optionsMap['c']?.toString() ?? '',
      optionsMap['d']?.toString() ?? '',
    ];

    // Doğru şıkkı index'e çevirir (a=0, b=1, c=2, d=3)
    String correctLetter =
        json['correct_option_id']?.toString().toLowerCase() ?? 'a';
    int correctIdx;

    try {
      // Harften index hesaplama: 'a' karakterinin ASCII kodundan çıkarılır
      correctIdx = correctLetter.codeUnitAt(0) - 'a'.codeUnitAt(0);
      // Güvenlik: 0-3 arası değilse 0'a yuvarla
      if (correctIdx < 0 || correctIdx > 3) correctIdx = 0;
    } catch (e) {
      correctIdx = 0;
    }

    return QuestionModel(
      id: json['id'] is int ? json['id'] : int.parse(json['id'].toString()),
      questionText: qText,
      options: opts,
      correctAnswerIndex: correctIdx,
      image: json['image_url'],
      category: json['category'],
      state: json['state'],
      explanation: explanationText, // Servis tarafından sağlanan açıklama metni
    );
  }
}
