import { Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MainTabsParamList } from "./types";
import { colors } from "../theme/styles";
import DashboardScreen from "../screens/DashboardScreen";
import StationsStack from "./StationsStack";
import MaintenanceScreen from "../screens/MaintenanceScreen";

const Tab = createBottomTabNavigator<MainTabsParamList>();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.textPrimary,
        headerShadowVisible: false,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarLabel: ({ color, focused }) => {
          const labels: Record<keyof MainTabsParamList, string> = {
            Dashboard: "Rendimiento",
            StationsTab: "Gasolineras",
            Maintenance: "Diagnóstico",
          };

          return (
            <Text
              style={[
                styles.tabLabel,
                { color, fontWeight: focused ? "700" : "500" },
              ]}
            >
              {labels[route.name]}
            </Text>
          );
        },
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ title: "Rendimiento y Kilometraje" }}
      />
      <Tab.Screen
        name="StationsTab"
        component={StationsStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Maintenance"
        component={MaintenanceScreen}
        options={{ title: "Presión y Mantenimiento" }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabLabel: {
    fontSize: 12,
  },
});