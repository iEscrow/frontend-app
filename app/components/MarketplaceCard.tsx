import React from "react"
import { ViewStyle, ImageStyle, TextStyle, View } from "react-native"

import { Text } from "./Text"
import { AutoImage } from "./AutoImage"
import { colors, spacing } from "app/theme"
import { TouchableOpacity } from "react-native-gesture-handler"
import { api } from "app/services/api"
import { navigate } from "app/navigators"
import { escrowTransactions } from "app/screens"

export default function MarketplaceCard(_props) {
  const { item } = _props
  const reputation = ""
  const {
    PayerUser: { username },
  } = item

  const handleBuy = () => {
    console.log("buy")

    navigate("BuyEscrow", item)
    /* api
      .buyEscrow(item.id)
      .then((res) => console.log(res))
      .catch((error) => console.log(error)) */
  }

  return (
    <View style={[$container, $shadow]}>
      <View>
        <View style={$cardTop}>
          <AutoImage source={require("../../assets/icons/avatar.png")} style={$avatar} />
          <View style={$usernameContainer}>
            <Text text={username} preset="h4" style={$username} />
            <Text text={reputation} preset="h4" style={$reputation} />
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ paddingLeft: 20 }}>
            <View style={{ flexDirection: "row", gap: 12 }}>
              <View>
                <Text text="ENVÍA" preset="h3" style={$accent400} />
                <Text text="PRECIO" preset="h3" style={$accent400} />
              </View>
              <View>
                <Text text={`${item.payer_amount} ${item.PayerCurrency?.name}`} preset="h3" />
                <Text text={`${item.payee_amount} ${item.PayeeCurrency?.name}`} preset="h3" />
              </View>
            </View>
            <View style={{ marginTop: 2 }}>
              <Text text="Cerró precio con: " preset="overline" style={$primary400} />
              <Text text="BITSTAMP + 4% = U$D ---,00" preset="overline" />
              <View style={{ flexDirection: "row", gap: 32, marginTop: 12 }}>
                <View>
                  <Text text="Cotización Dolar" preset="overline" style={$primary400} />
                  <Text text="$ 205,05" preset="h3" />
                </View>
                <View>
                  <Text text="Método de pago" preset="overline" style={$primary400} />
                  <Text text={escrowTransactions[item?.TransactionType.name]} preset="overline" />
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={{ justifyContent: "center" }}>
        <VerticalButton text={"COMPRAR"} onPress={handleBuy} />
      </View>
    </View>
  )
}

const VerticalButton = ({ text, onPress }) => {
  const arrayOfChars = text.split("")

  const $verticalContainer: ViewStyle = {
    alignItems: "center",
    width: spacing.xl,
    backgroundColor: colors.palette.primary400,
    paddingVertical: spacing.md,
    borderRadius: spacing.lg,
  }
  const $char: TextStyle = { lineHeight: 15, fontSize: 14, textAlign: "center" }
  return (
    <TouchableOpacity style={$verticalContainer} onPress={onPress}>
      {arrayOfChars.map((char, i) => (
        <Text text={char} preset="h4" style={$char} key={i} />
      ))}
    </TouchableOpacity>
  )
}

const $shadow: ViewStyle = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.23,
  shadowRadius: 2.62,
  elevation: 4,
}

const $container: ViewStyle = {
  padding: spacing.sm,
  borderRadius: 18,
  backgroundColor: colors.palette.inputBackground,

  flexDirection: "row",
  justifyContent: "space-between",
}

const $usernameContainer: ViewStyle = { flexDirection: "row", gap: 4 }

const $avatar: ImageStyle = {
  width: 20,
  height: 20,
}

const $username: TextStyle = {}

const $reputation: TextStyle = {
  textDecorationLine: "underline",
}

const $accent400: TextStyle = {
  color: colors.palette.accent400,
}

const $primary400: TextStyle = {
  color: colors.palette.primary400,
}

const $cardTop: ViewStyle = {
  flexDirection: "row",
  gap: 6,
  alignItems: "center",
  marginBottom: spacing.md,
}
