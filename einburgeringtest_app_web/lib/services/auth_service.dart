import 'package:firebase_auth/firebase_auth.dart';
import 'package:google_sign_in/google_sign_in.dart' as gauth;
import 'package:device_info_plus/device_info_plus.dart';
import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:purchases_flutter/purchases_flutter.dart';
import 'package:easy_localization/easy_localization.dart';

import 'package:flutter/foundation.dart';
import 'dart:io';
import 'firestore_service.dart';
import 'sync_service.dart';

class AuthService {
  final FirebaseAuth _auth = FirebaseAuth.instance;

  // Use the singleton instance as per google_sign_in 7.x
  final gauth.GoogleSignIn _googleSignIn = gauth.GoogleSignIn.instance;

  final FirestoreService _firestoreService = FirestoreService();
  final SyncService _syncService = SyncService();

  // Key for storing pending logout device removal
  static const String _prefsKeyPendingLogout = 'pending_logout_device_removal';

  /// Converts FirebaseAuthException codes into user-friendly messages.
  static String getFriendlyErrorMessage(dynamic e) {
    if (e is! FirebaseAuthException) {
      if (e is String) return e;
      return tr("auth.error_generic");
    }

    switch (e.code) {
      case 'invalid-email':
        return "auth.error_invalid_email".tr();
      case 'invalid-credential':
        return "auth.error_invalid_credential".tr();
      case 'user-disabled':
        return "auth.error_user_disabled".tr();
      case 'user-not-found':
        return "auth.error_user_not_found".tr();
      case 'wrong-password':
        return "auth.error_wrong_password".tr();
      case 'email-already-in-use':
        return "auth.error_email_already_in_use".tr();
      case 'weak-password':
        return "auth.error_weak_password".tr();
      case 'network-request-failed':
        return "auth.error_network_request_failed".tr();
      case 'too-many-requests':
        return "auth.error_too_many_requests".tr();
      case 'requires-recent-login':
        return "auth.error_requires_recent_login".tr();
      default:
        return e.message ?? "auth.error_generic".tr();
    }
  }

  // Stream of auth changes
  Stream<User?> get authStateChanges => _auth.authStateChanges();

  // Current user
  User? get currentUser => _auth.currentUser;

  // Sign in with Email and Password
  Future<UserCredential?> signInWithEmail(String email, String password) async {
    try {
      final credential = await _auth.signInWithEmailAndPassword(
        email: email,
        password: password,
      );
      if (credential.user != null) {
        final deviceInfo = await _getDeviceInfo();
        await _firestoreService.saveUser(
          credential.user!,
          languageCode: Platform.localeName.split('_')[0],
          deviceId: deviceInfo['id'] ?? 'unknown',
          deviceName: deviceInfo['name'] ?? 'Unknown Device',
        );

        if (!kIsWeb) {
          try {
            await Purchases.logIn(credential.user!.uid);
          } catch (e) {
            print("RevenueCat login error: $e");
          }
        }

        await _syncService.downloadCloudToLocal();
      }
      return credential;
    } catch (e) {
      debugPrint("Error signing in with email: $e");
      if (_auth.currentUser != null) {
        await signOut();
      }
      rethrow;
    }
  }

  Future<UserCredential?> registerWithEmail(
      String email, String password) async {
    try {
      final credential = await _auth.createUserWithEmailAndPassword(
        email: email,
        password: password,
      );
      if (credential.user != null) {
        final deviceInfo = await _getDeviceInfo();
        await _firestoreService.saveUser(
          credential.user!,
          languageCode: Platform.localeName.split('_')[0],
          deviceId: deviceInfo['id'] ?? 'unknown',
          deviceName: deviceInfo['name'] ?? 'Unknown Device',
        );

        if (!kIsWeb) {
          try {
            await Purchases.logIn(credential.user!.uid);
          } catch (e) {
            print("RevenueCat login error: $e");
          }
        }

        await _syncService.downloadCloudToLocal();
      }
      return credential;
    } catch (e) {
      debugPrint("Error registering with email: $e");
      if (_auth.currentUser != null) {
        await signOut();
      }
      rethrow;
    }
  }

  // Sign in with Google
  Future<UserCredential?> signInWithGoogle() async {
    try {
      UserCredential? credential;
      if (kIsWeb) {
        GoogleAuthProvider authProvider = GoogleAuthProvider();
        credential = await _auth.signInWithPopup(authProvider);
      } else {
        // Use .authenticate() for 7.x
        final gauth.GoogleSignInAccount? googleUser =
            await _googleSignIn.authenticate();
        if (googleUser == null) return null; // User canceled

        final gauth.GoogleSignInAuthentication googleAuth =
            await googleUser.authentication;
        final AuthCredential creds = GoogleAuthProvider.credential(
          idToken: googleAuth.idToken,
        );
        credential = await _auth.signInWithCredential(creds);
      }

      if (credential.user != null) {
        final deviceInfo = await _getDeviceInfo();
        await _firestoreService.saveUser(
          credential.user!,
          languageCode: Platform.localeName.split('_')[0],
          deviceId: deviceInfo['id'] ?? 'unknown',
          deviceName: deviceInfo['name'] ?? 'Unknown Device',
        );

        if (!kIsWeb) {
          try {
            await Purchases.logIn(credential.user!.uid);
          } catch (e) {
            print("RevenueCat login error: $e");
          }
        }

        await _syncService.downloadCloudToLocal();
      }
      return credential;
    } catch (e) {
      debugPrint("Error signing in with Google: $e");
      if (_auth.currentUser != null) {
        await signOut();
      }
      rethrow;
    }
  }

  // Sign out
  Future<void> signOut() async {
    try {
      final user = _auth.currentUser;
      if (user != null) {
        final deviceInfo = await _getDeviceInfo();
        final deviceId = deviceInfo['id'];

        final connectivityResult = await Connectivity().checkConnectivity();
        final isOnline = !connectivityResult.contains(ConnectivityResult.none);

        if (isOnline) {
          try {
            await _firestoreService.removeDevice(user.uid, deviceId!);
          } catch (e) {
            debugPrint("Error removing device online: $e");
            await _queueDeviceRemoval(user.uid, deviceId ?? 'unknown');
          }
        } else {
          await _queueDeviceRemoval(user.uid, deviceId ?? 'unknown');
        }
      }

      await _auth.signOut();
      if (!kIsWeb) {
        await _googleSignIn.signOut();
        try {
          await Purchases.logOut();
        } catch (e) {}
      }
    } catch (e) {
      debugPrint("Error signing out: $e");
      rethrow;
    }
  }

  Future<void> _queueDeviceRemoval(String uid, String? deviceId) async {
    try {
      final safeDeviceId = deviceId ?? 'unknown';
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString(_prefsKeyPendingLogout, "$uid:$safeDeviceId");
    } catch (e) {
      debugPrint("Error queuing device removal: $e");
    }
  }

  Future<void> syncPendingLogout() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final pendingRaw = prefs.getString(_prefsKeyPendingLogout);

      if (pendingRaw != null && pendingRaw.contains(':')) {
        final parts = pendingRaw.split(':');
        final uid = parts[0];
        final deviceId = parts[1];

        final connectivityResult = await Connectivity().checkConnectivity();
        final isOnline = !connectivityResult.contains(ConnectivityResult.none);

        if (isOnline) {
          await _firestoreService.removeDevice(uid, deviceId);
          await prefs.remove(_prefsKeyPendingLogout);
        }
      }
    } catch (e) {
      debugPrint("Error syncing pending logout: $e");
    }
  }

  Future<void> sendPasswordResetEmail(String email) async {
    try {
      await _auth.sendPasswordResetEmail(email: email);
    } catch (e) {
      debugPrint("Error sending password reset email: $e");
      rethrow;
    }
  }

  // Send Email Verification
  Future<void> sendEmailVerification() async {
    try {
      final user = _auth.currentUser;
      if (user != null && !user.emailVerified) {
        await user.sendEmailVerification();
      }
    } catch (e) {
      debugPrint("Error sending email verification: $e");
      rethrow;
    }
  }

  // Reload User (to update emailVerified status)
  Future<void> reloadUser() async {
    try {
      final user = _auth.currentUser;
      if (user != null) {
        await user.reload();
      }
    } catch (e) {
      debugPrint("Error reloading user: $e");
    }
  }

  Future<void> deleteAccount() async {
    try {
      final user = _auth.currentUser;
      if (user != null) {
        String uid = user.uid;
        // First delete from Firestore, then from Auth
        // If Firestore fails, Auth deletion won't happen, preventing orphaned data
        await _firestoreService.deleteUserData(uid);

        await user.delete();
        if (!kIsWeb) {
          await _googleSignIn.signOut();
        }
      }
    } catch (e) {
      debugPrint("Error deleting account: $e");
      rethrow;
    }
  }

  Future<Map<String, String>> _getDeviceInfo() async {
    if (kIsWeb) {
      return {'id': 'web-client', 'name': 'Web Browser'};
    }

    final DeviceInfoPlugin deviceInfo = DeviceInfoPlugin();
    try {
      if (Platform.isAndroid) {
        AndroidDeviceInfo androidInfo = await deviceInfo.androidInfo;
        return {
          'id': androidInfo.id,
          'name': '${androidInfo.manufacturer} ${androidInfo.model}'
        };
      } else if (Platform.isIOS) {
        IosDeviceInfo iosInfo = await deviceInfo.iosInfo;
        return {
          'id': iosInfo.identifierForVendor ?? 'ios-unknown',
          'name': iosInfo.name
        };
      }
    } catch (e) {
      debugPrint("Error getting device info: $e");
    }
    return {'id': 'unknown', 'name': 'Unknown Device'};
  }
}
