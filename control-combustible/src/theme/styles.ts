import { StyleSheet } from 'react-native';

export type StatusTone = 'good' | 'warning' | 'danger';

export const colors = {
  background: '#0F172A',
  surface: '#1E293B',
  surfaceAlt: '#273549',
  border: '#334155',
  textPrimary: '#F8FAFC',
  textSecondary: '#94A3B8',
  accent: '#38BDF8',
  accentText: '#082F49',
  error: '#F87171',
  errorBg: 'rgba(248, 113, 113, 0.14)',

  goodBg: 'rgba(34, 197, 94, 0.15)',
  goodBorder: '#22C55E',
  goodText: '#4ADE80',

  warningBg: 'rgba(245, 158, 11, 0.16)',
  warningBorder: '#F59E0B',
  warningText: '#FBBF24',

  dangerBg: 'rgba(239, 68, 68, 0.16)',
  dangerBorder: '#EF4444',
  dangerText: '#F87171',
};

export const spacing = {
  xs: 6,
  sm: 10,
  md: 16,
  lg: 24,
  xl: 32,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  pill: 999,
};

export const globalStyles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
});