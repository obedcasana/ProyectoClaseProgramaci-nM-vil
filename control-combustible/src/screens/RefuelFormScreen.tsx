import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StationsStackParamList } from "../navigation/types";
import { colors, globalStyles, spacing } from "../theme/styles";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { validateRequired, validateText } from "../utils/validators";

type Props = NativeStackScreenProps<StationsStackParamList, "RefuelForm">;

export default function RefuelFormScreen({ navigation, route }: Props) {
  const [stationName, setStationName] = useState(route.params?.stationName ?? "");
  //Si se navegó hacia esta pantalla pasando stationName se inicializa en stationName, sino se inicializa vacío.
  const [odometerKm, setOdometerKm] = useState("");
  const [liters, setLiters] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const stationError = submitted
    ? validateText(stationName, 2, "El nombre de la estación")
    : undefined;
  const odometerError = submitted
    ? validateRequired(odometerKm, "El kilometraje actual")
    : undefined;
  const litersError = submitted
    ? validateRequired(liters, "Los litros cargados")
    : undefined;

  const handleSaveRefuel = () => {
    setSubmitted(true);
    if (stationError || odometerError || litersError) {
      return;
    }

    navigation.popToTop();
  };

  return (
    <ScrollView
      style={globalStyles.screenContainer}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <View style={globalStyles.card}>
        <Text style={globalStyles.sectionTitle}>Nueva Carga de Combustible</Text>
        <Text style={styles.helper}>
          Registra la estación detectada o ingresada, el odómetro y los litros.
        </Text>

        <CustomInput
          label="Estación de gasolina"
          value={stationName}
          onChangeText={setStationName}
          placeholder="Ej. Gasolinera Uno"
          required
          externalError={stationError}
        />

        <CustomInput
          label="Kilometraje (odómetro)"
          type="number"
          value={odometerKm}
          onChangeText={setOdometerKm}
          placeholder="Ej. 48320"
          required
          externalError={odometerError}
        />

        <CustomInput
          label="Litros cargados"
          type="number"
          value={liters}
          onChangeText={setLiters}
          placeholder="Ej. 32.5"
          required
          externalError={litersError}
        />

        {submitted && (stationError || odometerError || litersError) ? (
          <Text style={styles.errorSummary}>
            Completa los campos obligatorios para guardar la carga.
          </Text>
        ) : null}

        <View style={styles.actions}>
          <CustomButton
            title="Guardar Carga"
            onPressButton={handleSaveRefuel}
            variant="primary"
          />
          <CustomButton
            title="Cancelar"
            onPressButton={() => navigation.goBack()}
            variant="secondary"
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: spacing.xl,
  },
  helper: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  errorSummary: {
    color: colors.error,
    fontSize: 12,
    textAlign: "center",
    marginTop: spacing.xs,
  },
  actions: {
    alignItems: "center",
    marginTop: spacing.xs,
  },
});