import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StationsStackParamList } from "../navigation/types";
import { colors, globalStyles, spacing, StatusTone } from "../theme/styles";
import StatusBadge from "../components/StatusBadge";
import CustomButton from "../components/CustomButton";

type Props = NativeStackScreenProps<StationsStackParamList, "StationsList">;

type StationSummary = {
  id: string;
  name: string;
  avgEfficiency: number;
  lastRefuelDate: string;
  tone: StatusTone;
};

const STATIONS_DATA: StationSummary[] = [
  {
    id: "st-1",
    name: "Gasolinera Uno - Circunvalación",
    avgEfficiency: 14.6,
    lastRefuelDate: "18 Nov 2026",
    tone: "good",
  },
  {
    id: "st-2",
    name: "Puma - Bulevar del Norte",
    avgEfficiency: 12.4,
    lastRefuelDate: "11 Nov 2026",
    tone: "warning",
  },
  {
    id: "st-3",
    name: "Texaco - Segunda Calle",
    avgEfficiency: 10.8,
    lastRefuelDate: "03 Nov 2026",
    tone: "danger",
  },
];

export default function StationsScreen({ navigation }: Props) {
  return (
    <ScrollView
      style={globalStyles.screenContainer}
      contentContainerStyle={styles.content}
    >
      <View style={styles.topAction}>
        <CustomButton
          title="+ Nueva Carga de Combustible"
          onPressButton={() => navigation.navigate("RefuelForm")}
          variant="primary"
        />
      </View>

      <Text style={globalStyles.sectionTitle}>Rendimiento por Estación</Text>

      {STATIONS_DATA.map((station) => (
        <TouchableOpacity
          key={station.id}
          activeOpacity={0.85}
          style={[globalStyles.card, styles.stationCard]}
          onPress={() =>
            navigation.navigate("StationDetail", {
              stationId: station.id,
              stationName: station.name,
              avgEfficiency: station.avgEfficiency,
              lastRefuelDate: station.lastRefuelDate,
            })
          }
        >
          <View style={globalStyles.rowBetween}>
            <Text style={styles.stationName}>{station.name}</Text>
            <StatusBadge
              label={`${station.avgEfficiency.toFixed(1)} km/L`}
              tone={station.tone}
            />
          </View>

          <View style={[globalStyles.rowBetween, styles.footerRow]}>
            <Text style={styles.metaText}>Última carga: {station.lastRefuelDate}</Text>
            <Text style={styles.linkText}>Ver detalle →</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: spacing.xl,
  },
  topAction: {
    alignItems: "center",
    marginBottom: spacing.md,
  },
  stationCard: {
    marginBottom: spacing.sm,
  },
  stationName: {
    flex: 1,
    fontSize: 15,
    fontWeight: "700",
    color: colors.textPrimary,
    marginRight: spacing.sm,
  },
  footerRow: {
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  metaText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  linkText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.accent,
  },
});