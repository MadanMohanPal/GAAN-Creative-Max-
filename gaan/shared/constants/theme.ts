export const GAAN_THEME = {
  colors: {
    // True AMOLED Pure Black
    background: '#000000',
    backgroundElevated: '#0A0A0E',
    surface: '#121217',
    surfaceHover: '#1B1B22',
    surfaceActive: '#24242F',
    border: '#23232C',
    borderGlow: 'rgba(139, 92, 246, 0.3)',

    // Purple & Violet Accents
    primary: '#8B5CF6',
    primaryHover: '#7C3AED',
    primaryDark: '#6D28D9',
    primaryGlow: 'rgba(139, 92, 246, 0.45)',
    accentPink: '#EC4899',
    accentCyan: '#06B6D4',

    // Text hierarchy
    textPrimary: '#FFFFFF',
    textSecondary: '#A1A1AA',
    textMuted: '#71717A',
    textDisabled: '#52525B',

    // Status colors
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
  },
  gradients: {
    primaryViolet: 'linear-gradient(135deg, #8B5CF6 0%, #D946EF 100%)',
    neonDark: 'linear-gradient(180deg, rgba(139, 92, 246, 0.15) 0%, rgba(0, 0, 0, 0.95) 100%)',
    cardGloss: 'linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
    playerBackground: 'linear-gradient(180deg, #181126 0%, #08070D 40%, #000000 100%)',
  },
  typography: {
    fontFamilySans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontFamilyDisplay: "'Outfit', 'Inter', -apple-system, sans-serif",
  },
  animation: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    normal: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
    smooth: '400ms cubic-bezier(0.16, 1, 0.3, 1)',
  }
};
