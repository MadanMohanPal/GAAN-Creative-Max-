import 'package:flutter/material.dart';
import '../theme/gaan_theme.dart';

class GaanLogoMark extends StatelessWidget {
  final double size;
  final bool showText;

  const GaanLogoMark({
    super.key,
    this.size = 48,
    this.showText = false,
  });

  @override
  Widget build(BuildContext context) {
    final logoWidget = Container(
      width: size,
      height: size,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        gradient: const RadialGradient(
          colors: [Color(0xFF25103F), Color(0xFF0F061A), Colors.black],
        ),
        boxShadow: [
          BoxShadow(
            color: GaanTheme.primaryPurple.withOpacity(0.35),
            blurRadius: size * 0.35,
            spreadRadius: 1,
          ),
        ],
        border: Border.all(
          color: GaanTheme.primaryPurple.withOpacity(0.4),
          width: 1.5,
        ),
      ),
      child: Center(
        child: CustomPaint(
          size: Size(size * 0.65, size * 0.65),
          painter: _GaanLogoPainter(),
        ),
      ),
    );

    if (!showText) return logoWidget;

    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        logoWidget,
        const SizedBox(width: 12),
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
                    fontSize: 22,
                    letterSpacing: 2.0,
                  ),
                ),
                const SizedBox(width: 6),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 5, vertical: 1.5),
                  decoration: BoxDecoration(
                    color: GaanTheme.primaryPurple.withOpacity(0.2),
                    borderRadius: BorderRadius.circular(4),
                    border: Border.all(
                      color: GaanTheme.primaryPurple.withOpacity(0.4),
                      width: 0.8,
                    ),
                  ),
                  child: const Text(
                    'PRO',
                    style: TextStyle(
                      color: GaanTheme.purpleLight,
                      fontSize: 9,
                      fontWeight: FontWeight.bold,
                      letterSpacing: 0.8,
                    ),
                  ),
                ),
              ],
            ),
            const Text(
              'TRUE AMOLED MUSIC',
              style: TextStyle(
                color: GaanTheme.textMuted,
                fontSize: 9,
                fontWeight: FontWeight.w600,
                letterSpacing: 1.2,
              ),
            ),
          ],
        ),
      ],
    );
  }
}

class _GaanLogoPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final strokePaint = Paint()
      ..shader = GaanTheme.primaryGradient.createShader(
        Rect.fromLTWH(0, 0, size.width, size.height),
      )
      ..style = PaintingStyle.stroke
      ..strokeWidth = size.width * 0.12
      ..strokeCap = StrokeCap.round;

    final fillPaint = Paint()
      ..shader = GaanTheme.primaryGradient.createShader(
        Rect.fromLTWH(0, 0, size.width, size.height),
      )
      ..style = PaintingStyle.fill;

    // Draw stylized 'G' arc
    final rect = Rect.fromCircle(
      center: Offset(size.width * 0.5, size.height * 0.5),
      radius: size.width * 0.42,
    );
    canvas.drawArc(rect, 0.5, 5.0, false, strokePaint);

    // Inner waveform bars
    final barW = size.width * 0.08;
    canvas.drawRRect(
      RRect.fromRectAndRadius(
        Rect.fromCenter(
          center: Offset(size.width * 0.42, size.height * 0.5),
          width: barW,
          height: size.height * 0.35,
        ),
        const Radius.circular(2),
      ),
      fillPaint,
    );

    canvas.drawRRect(
      RRect.fromRectAndRadius(
        Rect.fromCenter(
          center: Offset(size.width * 0.56, size.height * 0.46),
          width: barW,
          height: size.height * 0.5,
        ),
        const Radius.circular(2),
      ),
      fillPaint,
    );

    canvas.drawRRect(
      RRect.fromRectAndRadius(
        Rect.fromCenter(
          center: Offset(size.width * 0.70, size.height * 0.52),
          width: barW,
          height: size.height * 0.3,
        ),
        const Radius.circular(2),
      ),
      fillPaint,
    );
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
