import { AutoImage, Button, Screen } from "app/components"
import { goBack, navigate } from "app/navigators"
import { DemoTabScreenProps } from "app/navigators/DemoNavigator"
import { palette, spacing, typography } from "app/theme"
import React, { FC } from "react"
import { Text, ViewStyle, ImageStyle, Dimensions, TextStyle, View } from "react-native"
const { width } = Dimensions.get("screen")

const escrowTypes = {
  PUBLIC: "Público",
  PRIVATE: "Privado",
}

export const escrowTransactions = {
  "CRYPTO-FIAT": "Transferencia bancaria",
}

interface Props {}

const BuyEscrow: FC<DemoTabScreenProps<"BuyEscrow">> = (props) => {
  const {
    route: { params },
  } = props

  console.log(params)
  return (
    <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$container}>
      <AutoImage source={require("../../assets/images/logo.png")} style={$logo} />

      <Text style={$title}>Petición de Escrow</Text>
      <View style={$infoContainer}>
        <View style={$infoTop}>
          <Text style={[$info, { fontSize: typography.sizes.overline }]}>
            Escrow {escrowTypes[params?.Type.name]}
          </Text>
          <Text style={[$info, { fontSize: typography.sizes.btn2 }]}>
            {" "}
            {params?.PayerUser.username}
          </Text>
        </View>
        <View style={$infoRow}>
          <View style={$infoCol}>
            <Text style={[$info, { fontSize: typography.sizes.btn1 }]}>ENVIARÁS</Text>
            <Text style={[$info, { fontSize: typography.sizes.btn1 }]}>
              {params?.PayeeCurrency.name} {params?.payee_amount}
            </Text>
          </View>
          <View style={$infoCol}>
            <Text style={[$info, { fontSize: typography.sizes.btn1 }]}>RECIBIRÁS</Text>
            <Text style={[$info, { fontSize: typography.sizes.btn1 }]}>
              {params?.PayerCurrency.name} {params?.payer_amount}
            </Text>
          </View>
        </View>
      </View>
      <View style={{ paddingHorizontal: spacing.lg, marginTop: spacing.lg }}>
        <Text style={[$info]}>Condiciones del escrow</Text>
        <Text style={[$info, { fontSize: typography.sizes.btn2, color: palette.accent500 }]}>
          Método de pago
        </Text>
        <Text style={[$info, { fontSize: typography.sizes.btn1 }]}>
          {escrowTransactions[params?.TransactionType.name]}
        </Text>
        <Divider />
        <Text style={[$info, { fontSize: typography.sizes.btn2, color: palette.accent500 }]}>
          Comisión
        </Text>
        <Text style={[$info, { fontSize: typography.sizes.btn1 }]}>
          {params?.payer_commission || 0}%
        </Text>
        <Divider />
        <Text style={[$info, { fontSize: typography.sizes.btn2, color: palette.accent500 }]}>
          Cotización del dolar
        </Text>
        <Text style={[$info, { fontSize: typography.sizes.btn1 }]}>
          ARS {params?.payer_dolar_price || 0}
        </Text>
      </View>
      <View style={{ paddingHorizontal: spacing.md, marginTop: "auto", marginBottom: spacing.lg }}>
        <Divider />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Button text="ATRAS" preset="secondary" onPress={() => goBack()} />
          <Button text="ACEPTAR" />
        </View>
      </View>
    </Screen>
  )
}

BuyEscrow.defaultProps = {}

const Divider = () => {
  return (
    <View
      style={{
        height: 1,
        width: "100%",
        backgroundColor: palette.lineGray,
        marginVertical: spacing.md,
      }}
    />
  )
}

const $container: ViewStyle = {
  flex: 1,
}

const $infoTop: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}
const $infoCol: ViewStyle = {
  marginTop: spacing.xs,
  flex: 1,
}
const $infoRow: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
}

const $logo: ImageStyle = {
  marginTop: spacing.xxxl,
  width: (width * 140) / 360,
  height: (width * 62) / 360,
  marginLeft: "auto",
  marginRight: "auto",
}

const $title: TextStyle = {
  fontSize: spacing.xl,
  color: palette.primary400,
  marginVertical: spacing.md,
  paddingHorizontal: spacing.xs,
  fontFamily: typography.primary.normal,
}

const $infoContainer: ViewStyle = {
  backgroundColor: palette.primary400,
  paddingVertical: spacing.md,
  paddingHorizontal: spacing.lg,
}
const $info: TextStyle = {
  color: palette.white,
  fontSize: typography.sizes.btn1,
  fontFamily: typography.primary.medium,
}
export default BuyEscrow
