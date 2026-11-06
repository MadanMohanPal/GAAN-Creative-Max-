import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';
import 'services/audio_player_service.dart';
import 'theme/gaan_theme.dart';
import 'screens/splash_screen.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();

  // Set system UI to true AMOLED dark (transparent status bar, black nav bar)
  SystemChrome.setSystemUIOverlayStyle(
    const SystemUiOverlayStyle(
      statusBarColor: Colors.transparent,
      statusBarIconBrightness: Brightness.light,
      systemNavigationBarColor: GaanTheme.amoledBlack,
      systemNavigationBarIconBrightness: Brightness.light,
    ),
  );

  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AudioPlayerService()),
      ],
      child: const GaanApp(),
    ),
  );
}

class GaanApp extends StatelessWidget {
  const GaanApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'GAAN Music',
      debugShowCheckedModeBanner: false,
      theme: GaanTheme.darkTheme,
      home: const SplashScreen(),
    );
  }
}
