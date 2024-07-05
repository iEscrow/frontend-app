import { AutoImage, Button, Screen, TextField } from "app/components"
import { useStores } from "app/models"
import { DemoTabScreenProps } from "app/navigators/DemoNavigator"
import { palette, spacing, typography } from "app/theme"
import React, { FC } from "react"
import { Dimensions, ImageStyle, Text, TextStyle, View, ViewStyle } from "react-native"

const { width } = Dimensions.get("screen")

const escrowTypes = {
  PUBLIC: "Público",
  PRIVATE: "Privado",
}

export const escrowTransactions = {
  "CRYPTO-FIAT": "Transferencia bancaria",
}

interface Props {}

const AddBankAccount: FC<DemoTabScreenProps<"AddBankAccount">> = (props) => {
  const { authenticationStore } = useStores()
  const {
    route: { params },
  } = props

  return (
    <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$container}>
      <AutoImage source={require("../../assets/images/logo.png")} style={$logo} />
      <Text style={$title}>Completa el siguiente formulario para agregar una cuenta bancaria</Text>
      <TextField
        label="Titular"
        containerStyle={{ marginBottom: spacing.md }}
        editable={false}
        value={`${authenticationStore.authUser.first_name} ${authenticationStore.authUser.last_name}`}
      />
      <TextField label="CBU" containerStyle={{ marginBottom: spacing.md }} />
      <TextField label="Alias" containerStyle={{ marginBottom: spacing.md }} />
      <TextField label="Banco" containerStyle={{ marginBottom: spacing.md }} />
      <Button text="Agregar" preset="filled" style={{ marginTop: "auto", marginBottom: 24 }} />
    </Screen>
  )
}

AddBankAccount.defaultProps = {}

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
  paddingHorizontal: spacing.md,
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
  fontSize: spacing.md,
  color: palette.white,
  marginVertical: spacing.md,
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
export default AddBankAccount
