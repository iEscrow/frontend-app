import { api } from "app/services/api"
import React, { FC, useEffect } from "react"
import { Dimensions, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import Spinner from "react-native-loading-spinner-overlay"
import SelectDropdown from "react-native-select-dropdown"

import { AutoImage, Button, Icon, Screen, Text, Toggle } from "../components"
import { translate } from "../i18n"
import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import { colors, palette, spacing, typography } from "../theme"

const coins = ["USDT", "ETC", "BTC", "BNB"]
const options = ["Mercado Pago", "Transferencia bancaria"]
const { width } = Dimensions.get("screen")

export const CreateEscrowScreen: FC<DemoTabScreenProps<"DemoDebug">> = function CreateEscrowScreen(
  _props,
) {
  const [escrowPrivate, setPrivate] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [currencies, setCurrencies] = React.useState([])
  const [sendCurrency, setSendCurrency] = React.useState()
  const [recieveCurrency, setRecieveCurrency] = React.useState()
  const [escrowPublic, setPublic] = React.useState(true)
  const { navigation } = _props

  const checkPrivate = () => {
    setPrivate(true)
    setPublic(false)
  }
  const checkPublic = () => {
    setPrivate(false)
    setPublic(true)
  }

  useEffect(() => {
    api.getCurrencies().then((res) => {
      setCurrencies(res.data)
    })
    return () => {
      setCurrencies([])
    }
  }, [])

  return (
    <Screen preset="scroll" safeAreaEdges={["top"]} contentContainerStyle={$container}>
      <Spinner visible={loading} textContent={"Loading..."} />
      <AutoImage source={require("../../assets/images/logo.png")} style={$logo} />
      <View style={$itemsContainer}>
        <Text text="Enviar" preset="h3" style={$title} />
        <SelectDropdown
          data={currencies?.filter((currency) => currency !== recieveCurrency) || currencies}
          defaultButtonText={"Presione para seleccionar una opción"}
          buttonTextAfterSelection={(selectedItem) => <Text>{selectedItem.name}</Text>}
          buttonTextStyle={$dropdownText}
          buttonStyle={$dropdownButton}
          rowStyle={$dropdownRow}
          rowTextStyle={$dropdownRowText}
          dropdownStyle={$dropdown}
          onSelect={(selectedItem) => {
            setSendCurrency(selectedItem)
          }}
          renderDropdownIcon={() => (
            <Icon icon="dropdown" size={24} color={colors.palette.primary400} />
          )}
          rowTextForSelection={(item) => {
            return item.name
          }}
        />
        <Text text="Recibir" preset="h3" style={$title} />
        <SelectDropdown
          data={currencies?.filter((currency) => currency !== sendCurrency) || currencies}
          defaultButtonText={"Presione para seleccionar una opción"}
          buttonTextAfterSelection={(selectedItem) => <Text>{selectedItem.name}</Text>}
          buttonTextStyle={$dropdownText}
          buttonStyle={$dropdownButton}
          rowStyle={$dropdownRow}
          rowTextStyle={$dropdownRowText}
          dropdownStyle={$dropdown}
          onSelect={(selectedItem) => {
            console.log(selectedItem)
            setRecieveCurrency(selectedItem)
          }}
          renderDropdownIcon={() => (
            <Icon icon="dropdown" size={24} color={colors.palette.primary400} />
          )}
          rowTextForSelection={(item) => {
            return item.name
          }}
        />
      </View>
      <View style={[$dividerContainer, { marginBottom: spacing.xl }]}>
        <View style={$divider} />
      </View>
      <View style={{ paddingHorizontal: spacing.xl, gap: spacing.lg }}>
        <TouchableOpacity style={{ flexDirection: "row", gap: spacing.md }} onPress={checkPublic}>
          <Toggle variant="radio" value={escrowPublic} containerStyle={{ marginTop: 4 }} />
          <View>
            <Text text="PRIVADO" size="h3" weight="medium" />
            <Text
              text="Ya tengo la contraparte.
No figurará en el Marketplace"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ flexDirection: "row", gap: spacing.md }} onPress={checkPrivate}>
          <Toggle variant="radio" value={escrowPrivate} containerStyle={{ marginTop: 4 }} />
          <View>
            <Text text="PÚBLICO" size="h3" weight="medium" />
            <Text>No tengo la contraparte. {"\n"}Se listará en el Marketplace</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={[$dividerContainer, { marginTop: spacing.xl }]}>
        <View style={$divider} />
      </View>
      <View style={{ alignItems: "center", marginTop: spacing.md }}>
        <Button
          text="SIGUIENTE"
          preset="filled"
          disabled={Boolean(!sendCurrency || !recieveCurrency)}
          onPress={() => {
            navigation.navigate("CreateEscrow2", {
              isPrivate: escrowPrivate,
              sendCurrency,
              recieveCurrency,
            })
          }}
          style={{ paddingVertical: 8 }}
        />
      </View>
    </Screen>
  )
}
const $dropdownRow: ViewStyle = {
  justifyContent: "flex-start",
  backgroundColor: palette.btn2,
}
const $dropdown: ViewStyle = { borderRadius: 10, backgroundColor: palette.btn2 }
const $dropdownRowText: TextStyle = {
  textAlign: "left",
  color: palette.white,
  fontFamily: typography.primary.semiBold,
  fontSize: 14,
  lineHeight: 21,
  letterSpacing: 1.5,
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
  marginTop: spacing.lg,
  width: (width * 140) / 360,
  height: (width * 61) / 360,
  marginLeft: "auto",
  marginRight: "auto",
}
