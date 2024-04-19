/* eslint-disable react-native/no-inline-styles */
import React, { FC } from "react"
import {
  TextStyle,
  View,
  ViewStyle,
  Dimensions,
  ImageStyle,
  TouchableHighlight,
} from "react-native"
import { AutoImage,Screen, Text } from "../components"
import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import { colors, spacing, typography } from "../theme"

import { openLinkInBrowser } from "app/utils/openLinkInBrowser"

const { width } = Dimensions.get("screen")

export const EscrowCreatedScreen: FC<DemoTabScreenProps<"EscrowCreated">> =
  function EscrowCreatedScreen(_props) {
    const {navigation} = _props
    return (
      <Screen preset="auto" safeAreaEdges={["top"]} contentContainerStyle={$container}>
        <AutoImage source={require("../../assets/images/logo.png")} style={$logo} />
        <View style={$itemsContainer}>
          <View
            style={{
              gap: spacing.xs,
              backgroundColor: colors.palette.primary400,
              paddingHorizontal: spacing.xl,
              paddingVertical: spacing.sm,
            }}
          >
            <View style={{ flexDirection: "row", gap: 8 }}>
              <Text text="Escrow Público" preset="overline" />
              <Text text="FACUNDO.SALAS" preset="overline" />
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <View style={{ flex: 1 }}>
                <Text text="RECIBIRÁS" preset="h3" />
                <Text text="$AR 28.000,00" preset="h3" />
              </View>
              <View style={{ flex: 1 }}>
                <Text text="ENVIARÁS" preset="h3" />
                <Text text="100,75 USDT" preset="h3" />
              </View>
            </View>
          </View>
          <View style={{ paddingHorizontal: spacing.md }}>
            <Text
              text="Escrow Publicado!"
              preset="h2"
              style={{
                color: colors.palette.accent500,
                marginTop: spacing.xl,
                marginBottom: spacing.sm,
              }}
            />
            <Text text="Tu escrow ya se encuentra publicado en el Marketplace." preset="h4" />
            <View style={{ flexDirection: "row", marginBottom: 16 }}>
              <Text text="Podrás visualizarlo " preset="h4" />
              <TouchableHighlight onPress={() => navigation.navigate("BottomsTabs", {screen: "MyEscrows"

              })}>
                <Text text="aquí." preset="h4" style={{ color: colors.palette.accent500,textDecorationStyle:"solid", textDecorationLine:"underline" }} />
              </TouchableHighlight>

            </View>
              <Text text="Te notificaremos cuando un usuario quiera completar el intercambio. " preset="h4" style={{marginBottom: 16}} />
              <Text text="Gracias por utilizar iEscrow!" preset="h3" />
          </View>
        </View>
      </Screen>
    )
  }

const $container: ViewStyle = {
  paddingBottom: spacing.xxl,
}
const $dividerContainer: ViewStyle = {
  paddingHorizontal: spacing.lg,
}

const $divider: ViewStyle = {
  width: "100%",
  height: 1,
  backgroundColor: colors.palette.lineGray,
}

const $title: TextStyle = {
  marginBottom: spacing.md,
}

const $itemsContainer: ViewStyle = {
  marginBottom: spacing.xs,
  marginTop: spacing.xl,
}

const $dropdownText: TextStyle = {
  fontFamily: typography.primary.medium,
  fontSize: 14,
  color: colors.palette.neutral300,
  fontWeight: "500",
  textAlign: "left",
  marginLeft: "auto",
  paddingLeft: spacing.xs,
}

const $dropdownButton: ViewStyle = {
  backgroundColor: colors.palette.btn2,
  borderRadius: 5,
  width: "100%",
  maxWidth: 240,
  height: 40,
  marginBottom: spacing.lg,
}

const $logo: ImageStyle = {
  marginTop: spacing.xxxl,
  width: (width * 140) / 360,
  height: (width * 61) / 360,
  marginLeft: "auto",
  marginRight: "auto",
}
