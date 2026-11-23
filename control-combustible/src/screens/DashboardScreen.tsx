import { ScrollView, StyleSheet, Text, View } from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { MainTabsParamList } from "../navigation/types";
import { colors, globalStyles, spacing, StatusTone } from "../theme/styles";
import MetricCard from "../components/MetricCard";
import StatusBadge from "../components/StatusBadge";
import CustomButton from "../components/CustomButton";

type Props = BottomTabScreenProps<MainTabsParamList, "Dashboard">;

export default function DashboardScreen({ navigation }: Props) {
  const currentEfficiency = 13.8;
  const lastOdometer = 48250;
  const atmosphericPressureHpa = 1004;

  const efficiencyTone: StatusTone =
    currentEfficiency >= 14 ? "good" : currentEfficiency >= 11.5 ? "warning" : "danger";

  const efficiencyBadge =
    efficiencyTone === "good"
      ? "Óptimo"
      : efficiencyTone === "warning"
      ? "Moderado"
      : "Bajo";

  const pressureTone: StatusTone =
    atmosphericPressureHpa >= 1010
      ? "good"
      : atmosphericPressureHpa >= 1000
      ? "warning"
      : "danger";

  return (
    <ScrollView
      style={globalStyles.screenContainer}
      contentContainerStyle={styles.content}
    >
      <View style={[globalStyles.card, styles.headerCard]}>
        <View style={globalStyles.rowBetween}>
          <View>
            <Text style={globalStyles.title}>Resumen de Rendimiento</Text>
            <Text style={globalStyles.subtitle}>
              Monitoreo por kilometraje y contexto físico
            </Text>
          </View>
          <StatusBadge label={efficiencyBadge} tone={efficiencyTone} />
        </View>
      </View>

      <MetricCard
        title="Rendimiento Promedio"
        value={currentEfficiency.toFixed(1)}
        unit="km/L"
        tone={efficiencyTone}
        badgeText={efficiencyBadge}
        description="Calculado con base en distancia recorrida y litros cargados."
      />

      <MetricCard
        title="Odómetro Actual"
        value={lastOdometer.toLocaleString()}
        unit="km"
        tone="good"
        badgeText="Registrado"
        description="Última lectura confirmada en estación de servicio."
      />

      <MetricCard
        title="Presión Atmosférica"
        value={`${atmosphericPressureHpa}`}
        unit="hPa"
        tone={pressureTone}
        badgeText={pressureTone === "warning" ? "Variación leve" : "Estable"}
        description="Presión moderada-baja puede reducir levemente la densidad del aire."
      />

      <View style={styles.buttonsBox}>
        <CustomButton
          title="Ver Estaciones y Cargas"
          onPressButton={() => navigation.navigate("StationsTab", { screen: "StationsList" })}
          variant="primary"
        />
        <CustomButton
          title="Ir a Diagnóstico"
          onPressButton={() => navigation.navigate("Maintenance")}
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
  headerCard: {
    marginBottom: spacing.md,
  },
  buttonsBox: {
    alignItems: "center",
    marginTop: spacing.xs,
  },
});