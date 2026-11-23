import { ScrollView, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StationsStackParamList } from "../navigation/types";
import { colors, globalStyles, spacing, StatusTone } from "../theme/styles";
import MetricCard from "../components/MetricCard";
import CustomButton from "../components/CustomButton";

type Props = NativeStackScreenProps<StationsStackParamList, "StationDetail">;

export default function StationsDetailScreen({ navigation, route }: Props) {
  const { stationName, avgEfficiency, lastRefuelDate } = route.params;

  const tone: StatusTone =
    avgEfficiency >= 14 ? "good" : avgEfficiency >= 11.5 ? "warning" : "danger";

  const statusLabel =
    tone === "good"
      ? "Rendimiento favorable"
      : tone === "warning"
      ? "Rendimiento moderado"
      : "Por debajo del promedio";

  return (
    <ScrollView
      style={globalStyles.screenContainer}
      contentContainerStyle={styles.content}
    >
      <View style={[globalStyles.card, styles.summaryBox]}>
        <Text style={globalStyles.title}>{stationName}</Text>
        <Text style={globalStyles.subtitle}>
          Última carga registrada: {lastRefuelDate}
        </Text>
      </View>

      <MetricCard
        title="Promedio en esta Gasolinera"
        value={avgEfficiency.toFixed(1)}
        unit="km/L"
        tone={tone}
        badgeText={statusLabel}
        description="Comparativa frente al desempeño esperado del vehículo en ruta urbana."
      />

      <View style={globalStyles.card}>
        <Text style={globalStyles.sectionTitle}>Observación de Estación</Text>
        <Text style={styles.observation}>
          El historial de cargas en esta estación permite identificar variaciones de
          kilometraje por litro junto con el contexto de tráfico y presión atmosférica.
        </Text>
      </View>

      <View style={styles.actionsBox}>
        <CustomButton
          title="Registrar Carga Aquí"
          onPressButton={() => navigation.navigate("RefuelForm", { stationName })}
          variant="primary"
        />
        <CustomButton
          title="Volver a Estaciones"
          onPressButton={() => navigation.goBack()}
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
  summaryBox: {
    marginBottom: spacing.md,
  },
  observation: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.textSecondary,
  },
  actionsBox: {
    alignItems: "center",
    marginTop: spacing.md,
  },
});