import { StyleSheet, Text, View } from "react-native";
import { colors, globalStyles, spacing, StatusTone } from "../theme/styles";
import StatusBadge from "./StatusBadge";

type MetricCardProps = {
  title: string;
  value: string;
  unit: string;
  tone: StatusTone;
  badgeText: string;
  description?: string;
};

export default function MetricCard({
  title,
  value,
  unit,
  tone,
  badgeText,
  description,
}: MetricCardProps) {
  const indicatorColor = {
    good: colors.goodBorder,
    warning: colors.warningBorder,
    danger: colors.dangerBorder,
  }[tone];

  return (
    <View
      style={[
        globalStyles.card,
        styles.card,
        { borderLeftWidth: 4, borderLeftColor: indicatorColor },
      ]}
    >
      <View style={globalStyles.rowBetween}>
        <Text style={styles.title}>{title}</Text>
        <StatusBadge label={badgeText} tone={tone} />
      </View>

      <View style={styles.metricRow}>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.unit}>{unit}</Text>
      </View>

      {description ? <Text style={styles.description}>{description}</Text> : null} 
      {/*Sólo se renderiza si existe*/}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.md,
  },
  title: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: "600",
  },
  metricRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: spacing.sm,
  },
  value: {
    color: colors.textPrimary,
    fontSize: 28,
    fontWeight: "700",
    marginRight: spacing.xs,
  },
  unit: {
    color: colors.accent,
    fontSize: 14,
    fontWeight: "600",
  },
  description: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: spacing.xs,
  },
});