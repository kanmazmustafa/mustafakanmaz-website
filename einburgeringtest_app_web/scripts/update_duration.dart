
import 'dart:io';

void main() async {
  final dir = Directory('assets/translations');
  final files = dir.listSync().whereType<File>().where((f) => f.path.endsWith('.json'));

  for (final file in files) {
    String content = await file.readAsString();
    
    // Regex matches "quiz_simulation_sub": "Some text 45 Something"
    // We want to replace 45 with 60.
    
    // Pattern looking for the key and the number 45 inside its value
    final regex = RegExp(r'("quiz_simulation_sub":\s*".*?)45(.*?)"');
    
    if (regex.hasMatch(content)) {
      final newContent = content.replaceAllMapped(regex, (match) {
        return '${match.group(1)}60${match.group(2)}"';
      });
      
      await file.writeAsString(newContent);
      print('Updated: ${file.path}');
    } else {
      print('Skipped (No match): ${file.path}');
    }
  }
}
