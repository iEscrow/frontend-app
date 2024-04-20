/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  NavigatorScreenParams,
} from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import { observer } from "mobx-react-lite"
import React from "react"
import { useColorScheme } from "react-native"
import * as Screens from "app/screens"
import Config from "../config"
import { useStores } from "../models"
import { DemoNavigator, DemoTabParamList } from "./DemoNavigator"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"
import { colors } from "app/theme"
import { createDrawerNavigator } from "@react-navigation/drawer"
import CustomDrawerContent from "app/components/CustomDrawerContent"
import { View } from "react-native"
import { Icon } from "app/components"
import BuyEscrow from "app/screens/BuyEscrow"
/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type AppStackParamList = {
  Marketplace: undefined
  CreateEscrow: undefined
  MyEscrows: NavigatorScreenParams<DemoTabParamList>
  BuyEscrow: undefined
}

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Drawer = createDrawerNavigator()

const AppStack = observer(function AppStack() {
  const {
    authenticationStore: { isAuthenticated },
  } = useStores()
  const defaultOptions = ({ navigation }) => ({
    headerShown: true,
    headerTitle: "",
    headerTintColor: colors.palette.white,
    headerTransparent: true,
    headerLeft: false,
    drawerPosition: "right",
    headerRight: () => (
      <View
        style={{
          flexDirection: "row",
          gap: 20,
          alignItems: "center",
          paddingRight: 16,
          paddingTop: 16,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,
          elevation: 4,
        }}
      >
        <Icon
          icon="notifications"
          size={24}
          onPress={() => console.log("notifications")}
          color="white"
        />
        <Icon icon="profile" size={44} onPress={navigation.openDrawer} />
      </View>
    ),
    navigationBarColor: colors.bottomTabs.background,
  })
  return (
    <Drawer.Navigator
      screenOptions={defaultOptions}
      initialRouteName={isAuthenticated ? "BottomsTabs" : "Login"}
      drawerContent={CustomDrawerContent}
    >
      {isAuthenticated ? (
        <>
          <Drawer.Screen name="BottomsTabs" component={DemoNavigator} />
          <Drawer.Screen name="Profile" component={Screens.HelpCenterScreen} />

          <Drawer.Screen name="HelpCenter" component={Screens.HelpCenterScreen} />
          <Drawer.Screen name="HelpSingle" component={Screens.HelpSingleScreen} />
          <Drawer.Screen name="FAQ’s" component={Screens.CreateEscrowScreen} />
          <Drawer.Screen name="Referrals" component={Screens.ReferralsScreen} />
          <Drawer.Screen name="CreateEscrow2" component={Screens.CreateEscrow2Screen} />
          <Drawer.Screen name="EscrowCreated" component={Screens.EscrowCreatedScreen} />
          <Drawer.Screen name="BuyEscrow" component={BuyEscrow} />
        </>
      ) : (
        <>
          <Drawer.Screen
            name="Login"
            component={Screens.LoginScreen}
            options={{ headerShown: false }}
          />
        </>
      )}
      {/** other screens */}
    </Drawer.Navigator>
  )
})

{
  /* <Drawer.Navigator
      screenOptions={{ headerShown: false, navigationBarColor: colors.bottomTabs.background }}
      initialRouteName={isAuthenticated ? "CreateEscrow" : "Login"}
      drawerContent={CustomDrawerContent}
    >
      {isAuthenticated ? (
        <>
          <Drawer.Screen name="CreateEscrow" component={Screens.CreateEscrowScreen} />
          <Drawer.Screen name="Profile" component={DemoNavigator} />
          <Drawer.Screen name="Help" component={Screens.CreateEscrowScreen} />
          <Drawer.Screen name="FAQ’s" component={Screens.CreateEscrowScreen} />
          <Drawer.Screen name="Referrals" component={Screens.CreateEscrowScreen} />
        </>
      ) : (
        <>
          <Drawer.Screen name="Login" component={Screens.LoginScreen} />
        </>
      )}
    </Drawer.Navigator> */
}

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  const colorScheme = useColorScheme()

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  )
})
