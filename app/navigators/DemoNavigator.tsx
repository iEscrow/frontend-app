import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import React from "react"
import { ImageStyle, TextStyle, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Icon, Text } from "../components"
import { translate } from "../i18n"
import { DemoShowroomScreen, DemoDebugScreen, CreateEscrowScreen } from "../screens"
import { colors, typography } from "../theme"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"

export type DemoTabParamList = {
  DemoCommunity: undefined
  DemoShowroom: { queryIndex?: string; itemIndex?: string }
  DemoDebug: undefined
  DemoPodcastList: undefined
}

/**
 * Helper for automatically generating navigation prop types for each route.
 *
 * More info: https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type DemoTabScreenProps<T extends keyof DemoTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<DemoTabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

const Tab = createBottomTabNavigator<DemoTabParamList>()

export function DemoNavigator() {
  const { bottom } = useSafeAreaInsets()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [$tabBar, { height: bottom + 56 }],
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.text,
        tabBarLabelStyle: $tabBarLabel,
        tabBarItemStyle: $tabBarItem,
      }}
    >
      <Tab.Screen
        name="DemoShowroom"
        component={DemoShowroomScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              tx={"authNavigator.firstTab"}
              style={focused ? $tabBarLabelActive : $tabBarLabel}
            />
          ),
          tabBarIcon: ({ focused }) => (
            <Icon
              icon={focused ? "marketplaceActive" : "marketplace"}
              gradient={focused}
              size={40}
              style={$tabBarIcon}
            />
          ),
        }}
      />

      <Tab.Screen
        name="DemoPodcastList"
        component={CreateEscrowScreen}
        options={{
          tabBarAccessibilityLabel: translate("authNavigator.thirdTab"),
          tabBarLabel: ({ focused }) => (
            <Text
              tx={"authNavigator.secondTab"}
              style={focused ? $tabBarLabelActive : $tabBarLabel}
            />
          ),
          tabBarIcon: ({ focused }) => (
            <Icon
              icon={focused ? "createEscrowActive" : "createEscrow"}
              gradient={focused}
              size={40}
              style={$tabBarIcon}
            />
          ),
        }}
      />

      <Tab.Screen
        name="DemoDebug"
        component={DemoDebugScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              tx={"authNavigator.thirdTab"}
              style={focused ? $tabBarLabelActive : $tabBarLabel}
            />
          ),
          tabBarIcon: ({ focused }) => (
            <Icon
              icon={focused ? "myEscrowsActive" : "myEscrows"}
              gradient={focused}
              size={40}
              style={$tabBarIcon}
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const $tabBar: ViewStyle = {
  backgroundColor: colors.bottomTabs.background,
  borderTopColor: colors.transparent,
  
}

const $tabBarItem: ViewStyle = {
 marginBottom: -15
}

const $tabBarLabel: TextStyle = {
  fontSize: 12,
  color: colors.palette.neutral600,
  fontFamily: typography.primary.medium,
  lineHeight: 16,
  flex: 1,
}
const $tabBarLabelActive: TextStyle = {
  fontSize: 12,
  color: colors.palette.neutral300,
  fontFamily: typography.primary.medium,
  lineHeight: 16,
  flex: 1,
}

const $tabBarIcon: ImageStyle = {
  marginTop: -10
}
