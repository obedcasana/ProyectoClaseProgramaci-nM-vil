import { Pressable, StyleSheet, Text } from "react-native";
import { CustomButtonProps, CustomButtonVariant } from "../utils/types/ButtonProps";
import { colors, radius, spacing } from "../theme/styles";

export default function CustomButton({
  title,
  onPressButton,
  variant = "primary",
  disabled = false,
}: CustomButtonProps) {
  const styles = getStyles(variant, disabled);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && !disabled ? styles.pressed : null,
        {/*Aplica los estilos de styles.Button y la opacidad de pressed sólo si está presionado y no está desahabilitado*/}
      ]}
      onPress={onPressButton}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
}

const getStyles = (variant: CustomButtonVariant, disabled: boolean) =>
  StyleSheet.create({
    button: {
      backgroundColor: disabled
        ? colors.surfaceAlt
        : variant === "primary"
        ? colors.accent
        : variant === "secondary"
        ? colors.surfaceAlt
        : "transparent",
      borderColor:
        variant === "secondary"
          ? colors.border
          : variant === "tertiary"
          ? "transparent"
          : colors.accent,
      borderWidth: variant === "tertiary" ? 0 : 1,
      minWidth: 180,
      paddingVertical: spacing.sm + 4,
      paddingHorizontal: spacing.md,
      borderRadius: radius.sm,
      alignItems: "center",
      justifyContent: "center",
      marginTop: spacing.sm,
    },
    pressed: {
      opacity: 0.85,
    },
    buttonText: {
      color: disabled
        ? colors.textSecondary
        : variant === "primary"
        ? colors.accentText
        : variant === "tertiary"
        ? colors.accent
        : colors.textPrimary,
      fontWeight: "600",
      fontSize: variant === "tertiary" ? 13 : 15,
      letterSpacing: 0.3,
    },
  });