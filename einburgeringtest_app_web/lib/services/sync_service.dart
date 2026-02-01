import 'package:firebase_auth/firebase_auth.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../core/constants/app_keys.dart';
import 'firestore_service.dart';

class SyncService {
  final FirestoreService _firestoreService = FirestoreService();
  final FirebaseAuth _auth = FirebaseAuth.instance;

  /// Uploads local SharedPreferences data to Firestore
  Future<void> uploadLocalToCloud() async {
    final user = _auth.currentUser;
    if (user == null) return;

    final prefs = await SharedPreferences.getInstance();

    Map<String, dynamic> progressData = {
      AppKeys.solvedQuestions:
          prefs.getStringList(AppKeys.solvedQuestions) ?? [],
      AppKeys.failedQuestions:
          prefs.getStringList(AppKeys.failedQuestions) ?? [],
      AppKeys.masteredQuestions:
          prefs.getStringList(AppKeys.masteredQuestions) ?? [],
      // 'masteryCounts' removed as it's not in AppKeys of this project yet
    };

    // Also sync premium status if stored locally
    if (prefs.containsKey(AppKeys.isPremium)) {
      progressData[AppKeys.isPremium] = prefs.getBool(AppKeys.isPremium);
    }

    await _firestoreService.saveProgress(user.uid, progressData);
  }

  /// Downloads data from Firestore and saves to local SharedPreferences
  Future<void> downloadCloudToLocal() async {
    final user = _auth.currentUser;
    if (user == null) return;

    final cloudData = await _firestoreService.loadProgress(user.uid);
    if (cloudData == null) return;

    final prefs = await SharedPreferences.getInstance();

    // Sync main lists with Union Merge to prevent data loss
    if (cloudData.containsKey(AppKeys.solvedQuestions)) {
      List<String> localSolved =
          prefs.getStringList(AppKeys.solvedQuestions) ?? [];
      List<String> cloudSolved =
          List<String>.from(cloudData[AppKeys.solvedQuestions] ?? []);
      await prefs.setStringList(AppKeys.solvedQuestions,
          (localSolved + cloudSolved).toSet().toList());
    }
    if (cloudData.containsKey(AppKeys.failedQuestions)) {
      List<String> localFailed =
          prefs.getStringList(AppKeys.failedQuestions) ?? [];
      List<String> cloudFailed =
          List<String>.from(cloudData[AppKeys.failedQuestions] ?? []);
      await prefs.setStringList(AppKeys.failedQuestions,
          (localFailed + cloudFailed).toSet().toList());
    }
    if (cloudData.containsKey(AppKeys.masteredQuestions)) {
      List<String> localMastered =
          prefs.getStringList(AppKeys.masteredQuestions) ?? [];
      List<String> cloudMastered =
          List<String>.from(cloudData[AppKeys.masteredQuestions] ?? []);
      await prefs.setStringList(AppKeys.masteredQuestions,
          (localMastered + cloudMastered).toSet().toList());
    }

    // Sync Premium Status
    if (cloudData.containsKey(AppKeys.isPremium)) {
      await prefs.setBool(AppKeys.isPremium, cloudData[AppKeys.isPremium]);
    }
  }
}
