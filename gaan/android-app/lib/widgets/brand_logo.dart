import 'package:flutter/material.dart';
import '../theme/gaan_theme.dart';

class GaanLogoMark extends StatelessWidget {
  final double size;
  final bool showText;
  final VoidCallback? onTap;

  const GaanLogoMark({
    super.key,
    this.size = 48,
    this.showText = false,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final logoWidget = Container(
      width: size,
      height: size,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(size * 0.24),
        boxShadow: [
          BoxShadow(
            color: GaanTheme.primaryPurple.withOpacity(0.5),
            blurRadius: size * 0.4,
            spreadRadius: 1,
          ),
          BoxShadow(
            color: GaanTheme.fuchsiaNeon.withOpacity(0.3),
            blurRadius: size * 0.2,
          ),
        ],
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(size * 0.24),
        child: Image.asset(
          'assets/images/creative_max_logo.png',
          width: size,
          height: size,
          fit: BoxFit.cover,
        ),
      ),
    );

    if (!showText) {
      if (onTap != null) {
        return GestureDetector(onTap: onTap, child: logoWidget);
      }
      return logoWidget;
    }

    final content = Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        logoWidget,
        const SizedBox(width: 10),
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisSize: MainAxisSize.min,
          children: [
            Row(
              children: [
                const Text(
                  'GAAN',
                  style: TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.w900,
                    fontSize: 20,
                    letterSpacing: 2.0,
                  ),
                ),
                const SizedBox(width: 6),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                  decoration: BoxDecoration(
                    gradient: const LinearGradient(
                      colors: [Color(0xFF9333EA), Color(0xFFC026D3)],
                    ),
                    borderRadius: BorderRadius.circular(6),
                    boxShadow: [
                      BoxShadow(
                        color: GaanTheme.fuchsiaNeon.withOpacity(0.4),
                        blurRadius: 6,
                      ),
                    ],
                  ),
                  child: const Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Icon(Icons.bolt, color: Colors.white, size: 10),
                      SizedBox(width: 2),
                      Text(
                        'UNLIMITED',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 8.5,
                          fontWeight: FontWeight.w900,
                          letterSpacing: 0.8,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
            const Text(
              'TRUE AMOLED MUSIC',
              style: TextStyle(
                color: GaanTheme.textMuted,
                fontSize: 8.5,
                fontWeight: FontWeight.w600,
                letterSpacing: 1.2,
              ),
            ),
          ],
        ),
      ],
    );

    if (onTap != null) {
      return GestureDetector(
        onTap: onTap,
        behavior: HitTestBehavior.opaque,
        child: content,
      );
    }
    return content;
  }
}
