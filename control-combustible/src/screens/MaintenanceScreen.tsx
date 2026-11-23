import { ScrollView, StyleSheet, Text, View } from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { MainTabsParamList } from "../navigation/types";
import { colors, globalStyles, spacing, StatusTone } from "../theme/styles";
import MetricCard from "../components/MetricCard";
import StatusBadge from "../components/StatusBadge";
import CustomButton from "../components/CustomButton";

type Props = BottomTabScreenProps<MainTabsParamList, "Maintenance">;

type MaintenanceItem = {
  id: string;
  component: string;
  dueText: string;
  tone: StatusTone;
  badgeLabel: string;
};

const MAINTENANCE_ITEMS: MaintenanceItem[] = [
  {
    id: "m-1",
    component: "Cambio de aceite y filtro",
    dueText: "Faltan 750 km (a los 49,000 km)",
    tone: "warning",
    badgeLabel: "Próximo",
  },
  {
    id: "m-2",
    component: "Filtro de aire del motor",
    dueText: "Revisado hace 1,200 km",
    tone: "good",
    badgeLabel: "Óptimo",
  },
  {
    id: "m-3",
    component: "Calibración de presión de neumáticos",
    dueText: "Excedido por 300 km",
    tone: "danger",
    badgeLabel: "Urgente",
  },
];

export default function MaintenanceScreen({ navigation }: Props) {
  const pressureHpa = 1004;
  const altitudeMeters = 85;

  const pressureTone: StatusTone =
    pressureHpa >= 1010 ? "good" : pressureHpa >= 1000 ? "warning" : "danger";

  const diagnosticTitle =
    pressureTone === "good"
      ? "Condición atmosférica favorable"
      : pressureTone === "warning"
      ? "Variación leve en densidad del aire"
      : "Baja presión atmosférica detectada";

  const diagnosticExplanation =
    pressureTone === "good"
      ? "La presión actual permite una mezcla aire-combustible estable sin penalización perceptible en el consumo."
      : pressureTone === "warning"
      ? "Una caída moderada de presión reduce ligeramente el oxígeno disponible por volumen de aire, lo que puede explicar una baja de 3% a 5% en km/L."
      : "A menor presión atmosférica disminuye la densidad del aire y el motor compensa la mezcla, reduciendo el rendimiento por kilómetro.";

  return (
    <ScrollView
      style={globalStyles.screenContainer}
      contentContainerStyle={styles.content}
    >
      <MetricCard
        title="Sensor Barométrico del Dispositivo"
        value={`${pressureHpa}`}//Se envía así para convertirlo en un string
        unit="hPa"
        tone={pressureTone}
        badgeText={pressureTone === "good" ? "Estable" : "Impacto leve"}
        description={`Altitud estimada: ${altitudeMeters} m s. n. m.`}
      />

      <View
        style={[
          globalStyles.card,
          styles.diagnosticCard,
          {
            borderColor:
              pressureTone === "good"
                ? colors.goodBorder
                : pressureTone === "warning"
                ? colors.warningBorder
                : colors.dangerBorder,
          },
        ]}
      >
        <View style={globalStyles.rowBetween}>
          <Text style={styles.diagnosticHeader}>Diagnóstico Contextual</Text>
          <StatusBadge label="Barómetro" tone={pressureTone} />
        </View>
        <Text style={styles.diagnosticTitle}>{diagnosticTitle}</Text>
        <Text style={styles.diagnosticBody}>{diagnosticExplanation}</Text>
      </View>

      <Text style={globalStyles.sectionTitle}>Monitoreo Preventivo</Text>

      {MAINTENANCE_ITEMS.map((item) => (
        <View key={item.id} style={[globalStyles.card, styles.itemCard]}>
          <View style={globalStyles.rowBetween}>
            <Text style={styles.itemTitle}>{item.component}</Text>
            <StatusBadge label={item.badgeLabel} tone={item.tone} />
          </View>
          <Text style={styles.itemDue}>{item.dueText}</Text>
        </View>
      ))}

      <View style={styles.actionsBox}>
        <CustomButton
          title="Registrar Nueva Carga"
          onPressButton={() =>
            navigation.navigate("StationsTab", { screen: "RefuelForm" })
          }
          variant="primary"
        />
        <CustomButton
          title="Volver a Rendimiento"
          onPressButton={() => navigation.navigate("Dashboard")}
          variant="secondary"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: spacing.xl,
  },
  diagnosticCard: {
    marginBottom: spacing.lg,
  },
  diagnosticHeader: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.textSecondary,
  },
  diagnosticTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary,
    marginTop: spacing.sm,
  },
  diagnosticBody: {
    fontSize: 13,
    lineHeight: 19,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  itemCard: {
    marginBottom: spacing.sm,
  },
  itemTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: colors.textPrimary,
    marginRight: spacing.sm,
  },
  itemDue: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  actionsBox: {
    alignItems: "center",
    marginTop: spacing.md,
  },
});