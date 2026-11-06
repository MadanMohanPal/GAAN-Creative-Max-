import 'package:flutter/material.dart';

class GaanTheme {
  // Pure AMOLED Palette
  static const Color amoledBlack = Color(0xFF000000);
  static const Color surfaceBlack = Color(0xFF0A0A0F);
  static const Color charcoalCard = Color(0xFF12121A);
  static const Color surfaceHover = Color(0xFF1B1B26);
  static const Color borderCharcoal = Color(0xFF222230);

  // Purple & Violet Accents
  static const Color primaryPurple = Color(0xFF8B5CF6);
  static const Color violetAccent = Color(0xFF7C3AED);
  static const Color fuchsiaNeon = Color(0xFFD946EF);
  static const Color purpleLight = Color(0xFFC084FC);
  static const Color pinkNeon = Color(0xFFEC4899);

  // Text Colors
  static const Color textPrimary = Color(0xFFFFFFFF);
  static const Color textSecondary = Color(0xFFA1A1AA);
  static const Color textMuted = Color(0xFF71717A);

  // Gradients
  static const LinearGradient primaryGradient = LinearGradient(
    colors: [primaryPurple, fuchsiaNeon],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  static const LinearGradient amoledGradient = LinearGradient(
    colors: [Color(0xFF181028), Color(0xFF0A0714), amoledBlack],
    begin: Alignment.topCenter,
    end: Alignment.bottomCenter,
  );

  static const LinearGradient cardGloss = LinearGradient(
    colors: [Color(0x1AFFFFFF), Color(0x05FFFFFF)],
    begin: Alignment.topCenter,
    end: Alignment.bottomCenter,
  );

  static ThemeData get darkTheme {
    return ThemeData(
      brightness: Brightness.dark,
      scaffoldBackgroundColor: amoledBlack,
      primaryColor: primaryPurple,
      colorScheme: const ColorScheme.dark(
        primary: primaryPurple,
        secondary: fuchsiaNeon,
        surface: surfaceBlack,
        onPrimary: Colors.white,
        onSurface: Colors.white,
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: amoledBlack,
        elevation: 0,
        centerTitle: false,
        titleTextStyle: TextStyle(
          color: Colors.white,
          fontSize: 20,
          fontWeight: FontWeight.bold,
          letterSpacing: 0.5,
        ),
      ),
      bottomNavigationBarTheme: const BottomNavigationBarThemeData(
        backgroundColor: amoledBlack,
        selectedItemColor: primaryPurple,
        unselectedItemColor: textMuted,
        elevation: 8,
        type: BottomNavigationBarType.fixed,
      ),
      sliderTheme: SliderThemeData(
        activeTrackColor: primaryPurple,
        inactiveTrackColor: Color(0xFF27273A),
        thumbColor: purpleLight,
        overlayColor: primaryPurple.withOpacity(0.2),
        trackHeight: 3.5,
        thumbShape: const RoundSliderThumbShape(enabledThumbRadius: 6),
      ),
    );
  }
}
