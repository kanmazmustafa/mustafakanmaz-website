import 'dart:convert';
import 'dart:io';

void main() async {
  final Map<String, Map<String, String>> translations = {
    'ar': {'success': 'نجاح', 'badge': 'PREMIUM', 'member': 'عضو مميز'},
    'bg': {'success': 'Успех', 'badge': 'PREMIUM', 'member': 'Premium член'},
    'bs': {'success': 'Uspjeh', 'badge': 'PREMIUM', 'member': 'Premium član'},
    'de': {'success': 'Erfolg', 'badge': 'PREMIUM', 'member': 'Premium-Mitglied'},
    'el': {'success': 'Επιτυχία', 'badge': 'PREMIUM', 'member': 'Premium Μέλος'},
    'en': {'success': 'Success', 'badge': 'PREMIUM', 'member': 'Premium Member'},
    'es': {'success': 'Éxito', 'badge': 'PREMIUM', 'member': 'Miembro Premium'},
    'fa': {'success': 'موفقیت', 'badge': 'PREMIUM', 'member': 'عضو ویژه'},
    'fr': {'success': 'Succès', 'badge': 'PREMIUM', 'member': 'Membre Premium'},
    'he': {'success': 'הצלחה', 'badge': 'PREMIUM', 'member': 'חבר פרימיום'},
    'hi': {'success': 'सफलता', 'badge': 'PREMIUM', 'member': 'प्रीमियम सदस्य'},
    'hr': {'success': 'Uspjeh', 'badge': 'PREMIUM', 'member': 'Premium član'},
    'hu': {'success': 'Siker', 'badge': 'PREMIUM', 'member': 'Prémium tag'},
    'it': {'success': 'Successo', 'badge': 'PREMIUM', 'member': 'Membro Premium'},
    'ja': {'success': '成功', 'badge': 'PREMIUM', 'member': 'プレミアム会員'},
    'ku': {'success': 'Serkeftin', 'badge': 'PREMIUM', 'member': 'Endamê Premium'},
    'nl': {'success': 'Succes', 'badge': 'PREMIUM', 'member': 'Premium Lid'},
    'pl': {'success': 'Sukces', 'badge': 'PREMIUM', 'member': 'Członek Premium'},
    'ps': {'success': 'بریا', 'badge': 'PREMIUM', 'member': 'Premium غړی'},
    'pt': {'success': 'Sucesso', 'badge': 'PREMIUM', 'member': 'Membro Premium'},
    'ro': {'success': 'Succes', 'badge': 'PREMIUM', 'member': 'Membru Premium'},
    'ru': {'success': 'Успех', 'badge': 'PREMIUM', 'member': 'Премиум участник'},
    'sq': {'success': 'Sukses', 'badge': 'PREMIUM', 'member': 'Anëtar Premium'},
    'sr': {'success': 'Успех', 'badge': 'PREMIUM', 'member': 'Премиум члан'},
    'th': {'success': 'ความสำเร็จ', 'badge': 'PREMIUM', 'member': 'สมาชิกพรีเมียม'},
    'tr': {'success': 'Başarı', 'badge': 'PREMIUM', 'member': 'Premium Üye'},
    'uk': {'success': 'Успіх', 'badge': 'PREMIUM', 'member': 'Преміум учасник'},
    'vi': {'success': 'Thành công', 'badge': 'PREMIUM', 'member': 'Thành viên Premium'},
    'zh': {'success': '成功', 'badge': 'PREMIUM', 'member': '高级会员'},
  };

  final Directory dir = Directory('assets/translations');
  if (!await dir.exists()) {
    print('Directory not found: ${dir.path}');
    return;
  }

  await for (final FileSystemEntity entity in dir.list()) {
    if (entity is File && entity.path.endsWith('.json')) {
      final String filename = entity.path.split(Platform.pathSeparator).last;
      final String langCode = filename.replaceAll('ui_', '').replaceAll('.json', '');

      if (translations.containsKey(langCode)) {
        print('Processing $langCode...');
        try {
          final String content = await entity.readAsString();
          Map<String, dynamic> jsonContent = json.decode(content);

          // Update "drawer" -> "success"
          if (jsonContent['drawer'] != null) {
             jsonContent['drawer']['success'] = translations[langCode]!['success'];
          } else {
             jsonContent['drawer'] = {'success': translations[langCode]!['success']};
          }

          // Update "premium" -> "badge", "member"
          if (jsonContent['premium'] != null) {
            jsonContent['premium']['badge'] = translations[langCode]!['badge'];
            jsonContent['premium']['member'] = translations[langCode]!['member'];
          } else {
             jsonContent['premium'] = {
               'badge': translations[langCode]!['badge'],
               'member': translations[langCode]!['member']
             };
          }

          const JsonEncoder encoder = JsonEncoder.withIndent('    ');
          await entity.writeAsString(encoder.convert(jsonContent));
          print('Updated $filename');
        } catch (e) {
          print('Error processing $filename: $e');
        }
      } else {
        print('No translations found for $langCode');
      }
    }
  }
}
