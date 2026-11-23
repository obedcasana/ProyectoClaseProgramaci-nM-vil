import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StationsStackParamList } from "./types";
import { colors } from "../theme/styles";
import StationsScreen from "../screens/StationsScreen";
import StationsDetailScreen from "../screens/StationsDetailScreen";
import RefuelFormScreen from "../screens/RefuelFormScreen";

const Stack = createNativeStackNavigator<StationsStackParamList>();

export default function StationsStack() {
  return (
    <Stack.Navigator
      initialRouteName="StationsList"
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.textPrimary,
        headerShadowVisible: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen
        name="StationsList"
        component={StationsScreen}
        options={{ title: "Estaciones de Gasolina" }}
      />
      <Stack.Screen
        name="StationDetail"
        component={StationsDetailScreen}
        options={({ route }) => ({ title: route.params.stationName })}
      />
      <Stack.Screen
        name="RefuelForm"
        component={RefuelFormScreen}
        options={{ title: "Registrar Carga" }}
      />
    </Stack.Navigator>
  );
}