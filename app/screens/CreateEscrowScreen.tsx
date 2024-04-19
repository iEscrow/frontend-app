import React, { FC } from "react"
import { TextStyle, View, ViewStyle, Dimensions, ImageStyle } from "react-native"
import { AutoImage, Button, Icon, Screen, Text, Toggle } from "../components"
import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import { colors, spacing, typography } from "../theme"
import { translate } from "../i18n"
import SelectDropdown from "react-native-select-dropdown"
import { TouchableOpacity } from "react-native-gesture-handler"

const coins = ["USDT", "ETC", "BTC", "BNB"]
const options = ["Mercado Pago", "Transferencia bancaria"]
const { width } = Dimensions.get("screen")

export const CreateEscrowScreen: FC<DemoTabScreenProps<"DemoDebug">> = function CreateEscrowScreen(
  _props,
) {
  const [escrowPrivate, setPrivate] = React.useState(false)
  const [escrowPublic, setPublic] = React.useState(true)
  const {navigation} = _props
  const checkPrivate = () => {
    setPrivate(true)
    setPublic(false)
  }
  const checkPublic = () => {
    setPrivate(false)
    setPublic(true)
  }

  return (
    <Screen preset="scroll" safeAreaEdges={["top"]} contentContainerStyle={$container}>
    
      <AutoImage source={require("../../assets/images/logo.png")} style={$logo} />
      <View style={$itemsContainer}>
        <Text tx="createEscrow.send" preset="h3" style={$title} />
        <SelectDropdown
          data={coins}
          defaultButtonText={translate("createEscrow.sendDropdownPlaceholder")}
          buttonTextStyle={$dropdownText}
          buttonStyle={$dropdownButton}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index)
          }}
          renderDropdownIcon={() => (
            <Icon icon="dropdown" size={24} color={colors.palette.primary400} />
          )}
          buttonTextAfterSelection={(selectedItem) => {
            return selectedItem
          }}
          rowTextForSelection={(item) => {
            return item
          }}
        />
        <Text tx="createEscrow.recieve" preset="h3" style={$title} />
        <SelectDropdown
          data={options}
          defaultButtonText={translate("createEscrow.sendDropdownPlaceholder")}
          buttonTextStyle={$dropdownText}
          buttonStyle={$dropdownButton}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index)
          }}
          renderDropdownIcon={() => (
            <Icon icon="dropdown" size={24} color={colors.palette.primary400} />
          )}
          buttonTextAfterSelection={(selectedItem) => {
            return selectedItem
          }}
          rowTextForSelection={(item) => {
            return item
          }}
        />
      </View>
      <View style={[$dividerContainer, { marginBottom: spacing.xl }]}>
        <View style={$divider} />
      </View>
      <View style={{paddingHorizontal: spacing.xl, gap: spacing.lg}}>
        <TouchableOpacity style={{flexDirection: "row", gap: spacing.md}}  onPress={checkPublic}>
          <Toggle variant="radio" value={escrowPublic} containerStyle={{marginTop: 4}} />
          <View>
            <Text text="PRIVADO" size="h3" weight="medium"  />
            <Text
              text="Ya tengo la contraparte.
No figurará en el Marketplace"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: "row", gap: spacing.md}} onPress={checkPrivate}>
          <Toggle variant="radio" value={escrowPrivate} containerStyle={{marginTop: 4}}  />
          <View>
            <Text text="PRIVADO" size="h3" weight="medium"  />
            <Text
              text="Ya tengo la contraparte.
No figurará en el Marketplace"
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={[$dividerContainer, { marginTop: spacing.xl }]}>
        <View style={$divider} />
      </View>
      <View style={{ alignItems: "center", marginTop: spacing.md }}>
        <Button text="SIGUIENTE" preset="filled" onPress={() => navigation.navigate("CreateEscrow2", {
          isPrivate: escrowPrivate
        })} style={{paddingVertical: 8}} />
      </View>
    </Screen>
  )
}

const $container: ViewStyle = {

  paddingBottom: spacing.xxl,
  paddingTop: spacing.xxl,
  
}
const $dividerContainer: ViewStyle = {
  paddingHorizontal: spacing.md,
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
  paddingHorizontal: spacing.xl,
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
  marginTop: spacing.lg ,
  width: (width * 140) / 360,
  height: (width * 61) / 360,
  marginLeft: "auto",
  marginRight: "auto",
}
