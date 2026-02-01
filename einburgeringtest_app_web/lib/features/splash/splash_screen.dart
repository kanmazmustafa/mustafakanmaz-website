// [2026-01-06] File: lib/features/splash/splash_screen.dart
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:firebase_auth/firebase_auth.dart';
import '../../core/constants/app_keys.dart';
import '../../core/constants/app_colors.dart';
import '../home/home_screen.dart';
import '../setup/setup_screen.dart';
import '../auth/login_screen.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _fadeAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1500),
    );
    _fadeAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(_controller);
    _controller.forward();

    _checkNavigation();
  }

  Future<void> _checkNavigation() async {
    try {
      // debugPrint("Navigasyon kontrolü başladı...");

      // Logoyu görmesi için bekleme süresi
      await Future.delayed(const Duration(milliseconds: 2500));

      if (!mounted) return;

      // Check Authentication First
      final user = FirebaseAuth.instance.currentUser;
      if (user == null) {
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (c) => const LoginScreen()),
        );
        return;
      }

      final prefs = await SharedPreferences.getInstance();

      final String? state = prefs.getString(AppKeys.userState);
      final bool isSetupDone = prefs.getBool('is_setup_done') ?? false;

      if (state != null && isSetupDone) {
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (c) => HomeScreen()),
        );
      } else {
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (c) => const SetupScreen()),
        );
      }
    } catch (e) {
      debugPrint("Kritik Hata (Splash Navigation): $e");
      // Hata durumunda bile kullanıcıyı Login'e göndererek takılmayı engelliyoruz
      if (mounted) {
        Navigator.pushReplacement(
            context, MaterialPageRoute(builder: (c) => const LoginScreen()));
      }
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        width: double.infinity,
        height: double.infinity,
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: AppColors.splashGradient,
          ),
        ),
        child: FadeTransition(
          opacity: _fadeAnimation,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: Colors.white.withOpacity(0.15),
                  shape: BoxShape.circle,
                ),
                child: const Icon(Icons.auto_stories,
                    size: 100, color: Colors.white),
              ),
              const SizedBox(height: 30),
              const Text(
                "Einbürgerungstest",
                style: TextStyle(
                    fontSize: 32,
                    fontWeight: FontWeight.bold,
                    color: Colors.white),
              ),
              const Text(
                "DEUTSCHLAND 2026",
                style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w300,
                    color: Colors.white70,
                    letterSpacing: 4.0),
              ),
              const SizedBox(height: 50),
              const CircularProgressIndicator(
                  valueColor: AlwaysStoppedAnimation<Color>(Colors.white70),
                  strokeWidth: 2),
            ],
          ),
        ),
      ),
    );
  }
}
