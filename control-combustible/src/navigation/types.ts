import { NavigatorScreenParams } from "@react-navigation/native";

export type StationsStackParamList = {
  StationsList: undefined;
  StationDetail: {
    stationId: string;
    stationName: string;
    avgEfficiency: number;
    lastRefuelDate: string;
  };
  RefuelForm: {
    stationName?: string;
  } | undefined;
};

export type MainTabsParamList = {
  Dashboard: undefined;
  StationsTab: NavigatorScreenParams<StationsStackParamList> | undefined; //Como StationsTab contiene un stack anidado
  //NavigatorScreenParams permite que, al navegar hacia StationsTab, también se pueda indicar a qué pantalla interna
  //Del Stack ir y con qué parámetros.
  Maintenance: undefined;
};

export type RootStackParamList = {
  Login: { prefilledEmail?: string } | undefined;
  MainTabs: {
    screen?: keyof MainTabsParamList;
    params?: MainTabsParamList[keyof MainTabsParamList];
  } | undefined;
};