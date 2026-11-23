import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { colors, globalStyles, radius, spacing } from "../theme/styles";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import {
  validateEmail,
  validatePassword,
  validatePhone,
  validateText,
} from "../utils/validators";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function LoginScreen({ navigation, route }: Props) {
  const [driverName, setDriverName] = useState("");
  const [email, setEmail] = useState(route.params?.prefilledEmail ?? "");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState<string | undefined>(undefined);

  const handleLogin = () => {
    const nameErr = validateText(driverName, 2, "El nombre del conductor");
    const emailErr = validateEmail(email);
    const phoneErr = validatePhone(phone);
    const passErr = validatePassword(password);

    if (nameErr || emailErr || phoneErr || passErr) {
      setFormError("Revisa los campos marcados antes de continuar.");
      return;
    }

    setFormError(undefined);
    navigation.replace("MainTabs", { screen: "Dashboard" });
  };

  return (
    <KeyboardAvoidingView
      style={globalStyles.screenContainer}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.heroBox}>
          <Image
            source={require("../assets/images/gasolina.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.appTitle}>Control de Combustible</Text>
          <Text style={styles.appSubtitle}>
            Rendimiento por kilómetro, estaciones y diagnóstico atmosférico
          </Text>
        </View>

        <View style={globalStyles.card}>
          <Text style={globalStyles.sectionTitle}>Datos del Conductor</Text>

          <CustomInput
            label="Nombre del conductor"
            value={driverName}
            onChangeText={setDriverName}
            placeholder="Ej. Obed Casaña"
            required
            externalError={formError && validateText(driverName, 2, "El nombre del conductor")}
          />

          <CustomInput
            label="Correo electrónico"
            type="email"
            value={email}
            onChangeText={setEmail}
            placeholder="conductor@correo.com"
            required
            externalError={formError && validateEmail(email)}
          />

          <CustomInput
            label="Teléfono de contacto"
            type="phone"
            value={phone}
            onChangeText={setPhone}
            placeholder="Ej. 99887766"
            required
            externalError={formError && validatePhone(phone)}
          />

          <CustomInput
            label="Contraseña"
            type="password"
            value={password}
            onChangeText={setPassword}
            placeholder="Mínimo 6 caracteres"
            required
            externalError={formError && validatePassword(password)}
          />

          {formError ? <Text style={styles.summaryError}>{formError}</Text> : null}

          <View style={styles.actions}>
            <CustomButton
              title="Ingresar al Panel"
              onPressButton={handleLogin}
              variant="primary"
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  heroBox: {
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  logo: {
    width: 96,
    height: 96,
    borderRadius: radius.lg,
    marginBottom: spacing.sm,
  },
  appTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.textPrimary,
    textAlign: "center",
  },
  appSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: 4,
  },
  summaryError: {
    color: colors.error,
    fontSize: 12,
    marginTop: spacing.xs,
    textAlign: "center",
  },
  actions: {
    alignItems: "center",
    marginTop: spacing.xs,
  },
});