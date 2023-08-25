import React, { FC } from "react"
import { TextStyle, View, ViewStyle, Dimensions, ImageStyle } from "react-native"
import { AutoImage, Icon,  Screen, Text } from "../components"
import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import { colors, spacing, typography } from "../theme"
import { isRTL,translate } from "../i18n"
import SelectDropdown from "react-native-select-dropdown"

const countries = ["USDT", "ETC", "BTC", "BNB"]
const { width } = Dimensions.get("screen")

export const CreateEscrowScreen: FC<DemoTabScreenProps<"DemoDebug">> = function CreateEscrowScreen(
  _props,
) {
  return (
    <Screen preset="scroll" safeAreaEdges={["top"]} contentContainerStyle={$container}>
      <AutoImage
        source={require("../../assets/images/logo.png")}
        style={$logo}
      />
      <View style={$itemsContainer}>
        <Text tx="createEscrow.send" preset="h3" style={$title} />
        <SelectDropdown
          data={countries}
          defaultButtonText={translate("createEscrow.sendDropdownPlaceholder")}
          buttonTextStyle={$dropdownText}
          buttonStyle={$dropdownButton}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index)
          }}
          renderDropdownIcon={() => (
            <Icon icon="dropdown" size={24} color={colors.palette.primary400} />
          )}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem
          }}
          rowTextForSelection={(item, index) => {
            return item
          }}
        />
        <Text tx="createEscrow.recieve" preset="h3" style={$title} />
        <SelectDropdown
          data={countries}
          defaultButtonText={translate("createEscrow.sendDropdownPlaceholder")}
          buttonTextStyle={$dropdownText}
          buttonStyle={$dropdownButton}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index)
          }}
          renderDropdownIcon={() => (
            <Icon icon="dropdown" size={24} color={colors.palette.primary400} />
          )}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem
          }}
          rowTextForSelection={(item, index) => {
            return item
          }}
        />
      </View>
    </Screen>
  )
}

const $container: ViewStyle = {
  paddingTop: spacing.lg + spacing.xl,
  paddingBottom: spacing.xxl,
  paddingHorizontal: spacing.xl,
}

const $title: TextStyle = {
  marginBottom: spacing.md,
}

const $reportBugsLink: TextStyle = {
  color: colors.tint,
  marginBottom: spacing.lg,
  alignSelf: isRTL ? "flex-start" : "flex-end",
}

const $item: ViewStyle = {
  marginBottom: spacing.md,
}

const $itemsContainer: ViewStyle = {
  marginBottom: spacing.xl,
  marginTop: spacing.xl,
}

const $button: ViewStyle = {
  marginBottom: spacing.xs,
}

const $buttonContainer: ViewStyle = {
  marginBottom: spacing.md,
}

const $hint: TextStyle = {
  color: colors.palette.neutral600,
  fontSize: 12,
  lineHeight: 15,
  paddingBottom: spacing.lg,
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
  width: (width * 140) / 360,
  height: (width * 61) / 360,
  marginLeft: "auto",
  marginRight: "auto",
}