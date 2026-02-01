
import 'dart:convert';
import 'dart:io';

void main() async {
  final file1 = File('assets/data/questions.json');
  final file2 = File('assets/data/questions_states.json');
  final fileTr = File('assets/data/lang/tr.json');

  final List<dynamic> q1 = jsonDecode(await file1.readAsString());
  final List<dynamic> q2 = jsonDecode(await file2.readAsString());
  final Map<String, dynamic> tr = jsonDecode(await fileTr.readAsString());

  print('Q1 Count: ${q1.length}');
  print('Q2 Count: ${q2.length}');
  print('TR Count: ${tr.length}');

  final ids1 = q1.map((e) => e['id'] as int).toSet();
  final ids2 = q2.map((e) => e['id'] as int).toSet();
  final allIds = {...ids1, ...ids2};

  print('Total Unique IDs: ${allIds.length}');
  print('Min ID: ${allIds.reduce((curr, next) => curr < next ? curr : next)}');
  print('Max ID: ${allIds.reduce((curr, next) => curr > next ? curr : next)}');

  final expectedIds = List.generate(460, (index) => index + 1).toSet();
  final missing = expectedIds.difference(allIds);
  
  if (missing.isNotEmpty) {
     print('MISSING IDs: $missing');
  } else {
     print('All IDs 1-460 are present in question files.');
  }

  // Check TR alignment
  final missingTr = <String>[];
  for (final id in expectedIds) {
    if (!tr.containsKey(id.toString())) {
      missingTr.add(id.toString());
    }
  }
  
  if (missingTr.isNotEmpty) {
    print('MISSING TR keys: $missingTr');
  } else {
    print('All IDs 1-460 have validation keys in tr.json');
  }
}
