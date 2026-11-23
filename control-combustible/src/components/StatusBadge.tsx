import { StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing, StatusTone } from "../theme/styles";

type StatusBadgeProps = {
  label: string;
  tone: StatusTone; //StatusTone viene importado de styles.ts donde definimos su tipado de good, warning y danger.
};

export default function StatusBadge({ label, tone }: StatusBadgeProps) {
  const tonePalette = {
    good: {
      bg: colors.goodBg,
      border: colors.goodBorder,
      text: colors.goodText,
    },
    warning: {
      bg: colors.warningBg,
      border: colors.warningBorder,
      text: colors.warningText,
    },
    danger: {
      bg: colors.dangerBg,
      border: colors.dangerBorder,
      text: colors.dangerText,
    },
  }[tone];

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: tonePalette.bg,
          borderColor: tonePalette.border,
        },
      ]}
    >
      <Text style={[styles.label, { color: tonePalette.text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",
    borderWidth: 1,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
  },
});