import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/foundation.dart';

class FirestoreService {
  final FirebaseFirestore _db = FirebaseFirestore.instance;

  Future<void> saveUser(User user,
      {String? languageCode, String? deviceId, String? deviceName}) async {
    try {
      final docRef = _db.collection('users').doc(user.uid);
      final doc = await docRef.get().timeout(const Duration(seconds: 10));

      Map<String, dynamic> data = doc.exists ? doc.data() ?? {} : {};
      List<dynamic> devices = data['deviceIds'] ?? [];

      // Device Limit Logic
      if (deviceId != null) {
        // Remove existing entry for this device if present (to update it)
        devices.removeWhere((d) => d['id'] == deviceId);

        if (devices.length >= 3) {
          // Check if we are just logging in from an allowed device that was removed solely for update
          // actually, we just removed it above. So if length is NOW 3, it means we had 3 OTHER devices.
          // Wait, if it was in the list, we removed it, so length dropped to 2. Adding it back is fine.
          // If it wasn't in the list, length is 3. Adding 1 makes 4. Block.
          throw FirebaseAuthException(
              code: 'too-many-devices',
              message: 'Maximum device limit reached (3).');
        }

        devices.add({
          'id': deviceId,
          'name': deviceName ?? 'Unknown Device',
          'lastLogin': Timestamp.now(),
        });
      }

      // Merge user data
      Map<String, dynamic> updateData = {
        'email': user.email,
        'lastLogin': FieldValue.serverTimestamp(),
        if (devices.isNotEmpty) 'deviceIds': devices,
        if (languageCode != null) 'languageCode': languageCode,
      };

      await docRef.set(updateData, SetOptions(merge: true));
    } catch (e) {
      debugPrint("Error saving user to Firestore: $e");
      rethrow; // Propagate error (especially for too-many-devices)
    }
  }

  Future<void> removeDevice(String uid, String deviceId) async {
    try {
      final docRef = _db.collection('users').doc(uid);
      final doc = await docRef.get().timeout(const Duration(seconds: 5));

      if (doc.exists) {
        Map<String, dynamic> data = doc.data() ?? {};
        List<dynamic> devices = List.from(data['deviceIds'] ?? []);

        int initialLen = devices.length;
        devices.removeWhere((d) => d['id'] == deviceId);

        if (devices.length < initialLen) {
          await docRef.update({'deviceIds': devices}).timeout(
              const Duration(seconds: 5));
        }
      }
    } catch (e) {
      debugPrint("Error removing device from Firestore: $e");
    }
  }

  Future<void> updatePremiumStatus(String uid, bool isPremium) async {
    try {
      await _db.collection('users').doc(uid).set({
        'isPremium': isPremium,
        'updatedAt': FieldValue.serverTimestamp(),
      }, SetOptions(merge: true));
    } catch (e) {
      debugPrint("Error updating premium status: $e");
    }
  }

  Stream<DocumentSnapshot> getUserStream(String uid) {
    return _db.collection('users').doc(uid).snapshots();
  }

  // Method to get premium status once
  Future<bool> getPremiumStatus(String uid) async {
    try {
      final doc = await _db.collection('users').doc(uid).get();
      if (doc.exists && doc.data() != null) {
        return doc.data()!['isPremium'] == true;
      }
    } catch (e) {
      debugPrint("Error getting premium status: $e");
    }
    return false;
  }

  // --- PROGRESS SYNC ---

  Future<void> saveProgress(
      String uid, Map<String, dynamic> progressData) async {
    try {
      await _db
          .collection('users')
          .doc(uid)
          .collection('sync')
          .doc('progress')
          .set({
        ...progressData,
        'updatedAt': FieldValue.serverTimestamp(),
      }, SetOptions(merge: true));
    } catch (e) {
      debugPrint("Error saving progress to Firestore: $e");
    }
  }

  Future<Map<String, dynamic>?> loadProgress(String uid) async {
    try {
      final doc = await _db
          .collection('users')
          .doc(uid)
          .collection('sync')
          .doc('progress')
          .get();
      if (doc.exists) {
        return doc.data();
      }
    } catch (e) {
      debugPrint("Error loading progress from Firestore: $e");
    }
    return null;
  }

  Future<void> deleteUserData(String uid) async {
    try {
      // Delete the progress document in the sync subcollection
      await _db
          .collection('users')
          .doc(uid)
          .collection('sync')
          .doc('progress')
          .delete();
      // Delete the main user document
      await _db.collection('users').doc(uid).delete();
    } catch (e) {
      debugPrint("Error deleting user data from Firestore: $e");
    }
  }
}
