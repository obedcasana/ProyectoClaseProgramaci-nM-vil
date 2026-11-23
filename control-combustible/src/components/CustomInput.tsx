import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { ComponentProps, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  KeyboardTypeOptions,
  TouchableOpacity,
  Text,
} from "react-native";
import { colors, radius, spacing } from "../theme/styles";
import {
  validateEmail,
  validatePassword,
  validatePhone,
  validateRequired,
} from "../utils/validators";

export type InputFieldType = "default" | "email" | "password" | "number" | "phone";

type MaterialIconName = ComponentProps<typeof MaterialIcons>["name"];

type Props = {
  onChangeText: (text: string) => void;
  type?: InputFieldType;
  value: string;
  placeholder: string;
  required?: boolean;
  label?: string;
  externalError?: string;
};

export default function CustomInput({
  onChangeText,
  type = "default",
  value,
  placeholder,
  required = false,
  label,
  externalError,
}: Props) {
  const [isSecureText, setIsSecureText] = useState(type === "password");
  const [touched, setTouched] = useState(false);

  const getError = (): string | undefined => {
    //Si la pantalla pasa por un externalError, devuelve ese error.
    if (externalError) return externalError;
    //Si el campo no ha sido tocado y está vacío, devuelve undefined para no mostrar errores prematuros al cargar la pantalla
    if (!touched && value === "") return undefined;
        //Dependiendo del tipo de campo le manda a validar al validators.ts
    if (type === "email") return validateEmail(value);
    if (type === "password") return validatePassword(value);
    if (type === "phone") return validatePhone(value);
        //Si no es de los tipos anteriores pero tiene required=true usa validateRequired pasando el label o "este campo" si no tiene
    if (required) return validateRequired(value, label ?? "Este campo");

    return undefined;
  };

  const icon: MaterialIconName | undefined =
    type === "password"
      ? "lock"
      : type === "email"
      ? "email"
      : type === "phone"
      ? "phone"
      : undefined;

  const keyboardType: KeyboardTypeOptions =
    type === "email"
      ? "email-address"
      : type === "number" || type === "phone"
      ? "numeric"
      : "default";

  const isPasswordField = type === "password"; //Valida si es de tipo Password
  const error = getError(); //Va a evaluar a getError el error correspondiente
  const hasError = Boolean(error); //Guardamos si tiene error o no en el getError

  return (
    <View style={styles.wrapper}>
        {/*Si el campo tiene label renderiza el nombre del campo y si es obligatorio o no*/}
      {label ? (
        <Text style={styles.label}>
          {label}
          {required ? <Text style={styles.requiredMark}> *</Text> : null}
          {/*Si el campo es del tipo required, añade un * en color de error para resaltar*/}
        </Text>
      ) : null}

      <View
        style={[
          styles.inputContainer,
          {
            //Define si tiene error o no y en base a eso lo coloca un borde y un fondo al input.
            borderColor: hasError ? colors.error : colors.border,
            backgroundColor: hasError ? colors.errorBg : colors.surface,
          },
        ]}
      >
        {/*Valida si existe icon antes de intenrar renderizarlo para evitar que vaya como undefined*/}
        {icon ? (
          <MaterialIcons
            name={icon}
            size={20}
            color={hasError ? colors.error : colors.textSecondary}
            style={styles.leadingIcon}
          />
        ) : null}

        {/*Renderiza el TextInput*/}
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          value={value}
          onChangeText={onChangeText}
          onBlur={() => setTouched(true)}
          keyboardType={keyboardType}
          autoCapitalize={type === "email" ? "none" : "sentences"} //Evita que ponga el teclado mayus la primera en correos
          secureTextEntry={isPasswordField ? isSecureText : false}
        />
        {/*Sólo renderiza el ojito si es del tipo Password*/}
        {isPasswordField && (
          <TouchableOpacity
            onPress={() => setIsSecureText((prev) => !prev)}
            style={styles.eyeButton}
          >
            <Ionicons
              name={isSecureText ? "eye-off" : "eye"}
              size={20}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        )}
      </View>
        {/*Si tiene error muestra dicho error obtenido antes en el getError*/}
      {hasError ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    marginBottom: spacing.sm,
  },
  label: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: "600",
    marginBottom: spacing.xs,
  },
  requiredMark: {
    color: colors.error,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.sm,
    borderWidth: 1,
    borderRadius: radius.md,
    minHeight: 46,
  },
  leadingIcon: {
    marginRight: spacing.xs,
  },
  input: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 15,
    paddingVertical: spacing.sm,
  },
  eyeButton: {
    paddingLeft: spacing.xs,
    paddingVertical: 4,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: 4,
  },
});