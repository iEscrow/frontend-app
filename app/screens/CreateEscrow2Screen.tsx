import { navigate } from 'app/navigators';
import { api } from 'app/services/api';
/* eslint-disable react-native/no-inline-styles */
import React, { FC, useEffect, useState } from 'react';
import { Dimensions, ImageStyle, TextStyle, View, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { AutoImage, Button, Icon, Screen, Text, TextField, Toggle } from '../components';
import { DemoTabScreenProps } from '../navigators/DemoNavigator';
import { colors, spacing, typography } from '../theme';

const { width } = Dimensions.get("screen")

export const CreateEscrow2Screen: FC<DemoTabScreenProps<"CreateEscrow2">> =
  function CreateEscrow2Screen(_props) {
    const {
      navigation,
      route: {
        params: { isPrivate, sendCurrency, recieveCurrency },
      },
    } = _props

    const [bankAccountSelected, setBankAccountSelected] = useState<number>(null)
    const [totalToSend, setTotalToSend] = useState<string>()
    const [totalToRecieve, setTotalToRecieve] = useState<number>(0)
    const [comision, setComision] = useState<number>(0)
    const [dolarPrice, setDolarPrice] = useState<number>(0)

    const fee = 0.0075

    useEffect(() => {
      if (dolarPrice > 0) {
        const totalSendValue = (totalToRecieve + comision) / (dolarPrice * (1 - fee))
        setTotalToSend(totalSendValue.toFixed(2))
      } else {
        setTotalToSend("")
      }
    }, [totalToRecieve, comision, dolarPrice])
    console.log(bankAccountSelected)
    const handleSubmit = async () => {
      try {
        const escrowCreated = await api.createEscrow({
          payee_currency: sendCurrency,
          payer_currency: recieveCurrency,
          type: isPrivate ? 2 : 1,
        })
        console.log(escrowCreated)
        const escrowPublished = await api.publishEscrow({
          ...escrowCreated.data,
          ...bankAccountSelected,
          payer_amount: totalToSend,
          payer_dolar_price: dolarPrice,
          payer_commission: comision,
          payee_amount: totalToRecieve,
        })
        console.log(escrowPublished)
        navigation.navigate("EscrowCreated")
      } catch (error) {
        console.log("ERROR", error)
      }
    }
    console.log(isPrivate)
    return (
      <Screen preset="scroll" safeAreaEdges={["top"]} contentContainerStyle={$container}>
        <AutoImage source={require("../../assets/images/logo.png")} style={$logo} />
        <View style={$itemsContainer}>
          {recieveCurrency?.CurrencyType?.name === "FIAT" ? (
            <FiatAccounts
              setBankAccountSelected={setBankAccountSelected}
              bankAccountSelected={bankAccountSelected}
            />
          ) : null}
          <View style={{ marginTop: 12 }}>
            <View style={{ marginTop: 14, marginBottom: 20, alignItems: "flex-start" }}>
              <Text text="% DE COMISIÓN" preset="h4" style={{ marginBottom: 8 }} />
              <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 12 }}>
                <TextField
                  inputWrapperStyle={{ height: 40 }}
                  style={{ fontSize: 18, marginTop: 0, marginBottom: 0 }}
                  textAlignVertical="center"
                  onChangeText={(text) => setComision(Number(text.replace(/\D/g, "")))}
                />
                <Icon icon="alert" color={colors.palette.info} size={16} />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  gap: 16,
                  paddingRight: 24,
                  marginTop: 24,
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <View>
                  <Text text="Monto a recibir" preset="h4" />
                  <Text text="Moneda local" preset="overline" />
                </View>
                <TextField
                  containerStyle={{ maxWidth: 200, width: "100%" }}
                  inputWrapperStyle={{ height: 40 }}
                  style={{ fontSize: 18, marginTop: 0, marginBottom: 0 }}
                  textAlignVertical="center"
                  value={totalToRecieve.toString()}
                  onChangeText={(text) => setTotalToRecieve(Number(text.replace(/\D/g, "")))}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  gap: 16,
                  paddingRight: 24,
                  marginTop: 24,
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <View>
                  <Text text="Cotización Dolar" preset="h4" />
                </View>
                <TextField
                  containerStyle={{ height: 36, maxWidth: 200, width: "100%" }}
                  inputWrapperStyle={{ height: 40 }}
                  style={{ fontSize: 18, marginTop: 0, marginBottom: 0 }}
                  textAlignVertical="center"
                  onChangeText={(text) => setDolarPrice(Number(text.replace(/\D/g, "")))}
                />
              </View>
            </View>
            <View style={$divider} />
            <View style={{ marginTop: 14, marginBottom: 16 }}>
              <Text text="TOTAL A ENVIAR" preset="h3" style={{ marginBottom: 2 }} />
              <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 12 }}>
                <TextField
                  editable={false}
                  value={totalToSend}
                  RightAccessory={() => (
                    <View
                      style={{
                        height: 36,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingRight: 8,
                      }}
                    >
                      <Text text={sendCurrency.name} />
                    </View>
                  )}
                  containerStyle={{ height: 36 }}
                  inputWrapperStyle={{ height: 40, width: 170 }}
                  style={{ fontSize: 18, marginTop: 0, marginBottom: 0 }}
                  textAlignVertical="center"
                />
                <Icon icon="alert" color={colors.palette.info} size={16} />
              </View>
              <Text text="Fee: 0.75%" preset="text2" style={{ marginTop: 8 }} />
            </View>
            <View style={$divider} />
            <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 14 }}>
              <Button
                preset="gray"
                text="atras"
                textStyle={{ textTransform: "uppercase", fontSize: 18, lineHeight: 27 }}
                style={{ paddingVertical: 6, borderRadius: 45 }}
                onPress={() => navigation.goBack()}
              />
              <Button
                preset="filled"
                text={isPrivate ? "activar" : "publicar"}
                textStyle={{ textTransform: "uppercase", fontSize: 18, lineHeight: 27 }}
                style={{ paddingVertical: 6, borderRadius: 45 }}
                onPress={handleSubmit}
              />
            </View>
          </View>
        </View>
      </Screen>
    )
  }

const FiatAccounts = (props) => {
  const [bankAccounts, setBankAccounts] = useState([])
  const { bankAccountSelected, setBankAccountSelected } = props
  useEffect(() => {
    api.getBankAccounts().then((res) => {
      setBankAccounts(res.data)
    })
    return () => {
      setBankAccounts([])
    }
  }, [])

  const BankAccountToggle = (props) => {
    return (
      <View style={{ marginBottom: spacing.md }}>
        <TouchableOpacity
          style={{ flexDirection: "row", gap: spacing.md }}
          onPress={() => setBankAccountSelected(props.id)}
        >
          <Toggle
            variant="radio"
            value={bankAccountSelected === props.id}
            containerStyle={{ marginTop: 4 }}
          />
          <Text
            text={`${props.Bank.name}${props.custom_name ? ` - ${props.custom_name}}` : ""}`}
            size="text1"
            weight="normal"
          />
        </TouchableOpacity>
        <View style={{ marginLeft: 32 }}>
          <View style={{ flexDirection: "row", marginTop: 6 }}>
            <Text text="Titular " preset="text2" style={{ color: colors.palette.primary400 }} />
            <Text text={"Emiliano Alegre"} preset="text2" />
          </View>
          {props.cbu ? (
            <View style={{ flexDirection: "row" }}>
              <Text text="CBU  " preset="text2" style={{ color: colors.palette.primary400 }} />
              <Text text={props.cbu} preset="text2" />
            </View>
          ) : null}
          {props.alias ? (
            <View style={{ flexDirection: "row" }}>
              <Text text="Alias " preset="text2" style={{ color: colors.palette.primary400 }} />
              <Text text={props.alias} preset="text2" />
            </View>
          ) : null}
        </View>
        <View style={{ marginTop: 12, position: "relative" }}>
          <View style={$divider} />
          <Icon
            icon="details"
            size={20}
            style={{
              position: "absolute",
              right: "50%",
              transform: [{ translateX: 10 }, { translateY: -10 }],
            }}
          />
        </View>
      </View>
    )
  }
  return (
    <View>
      <Text
        text="Selecciona la cuenta con la cual recibirás la tranferencia bancaria:"
        preset="h4"
        style={$title}
      />
      {bankAccounts?.length
        ? bankAccounts.map((bankAccount) => (
            <BankAccountToggle key={bankAccount.id} {...bankAccount} />
          ))
        : null}
      <View style={{ alignItems: "flex-start" }}>
        <Button
          text="Agregar cuenta"
          preset="gray"
          LeftAccessory={() => (
            <Icon icon="create" size={24} style={{ marginBottom: 2, marginRight: 4 }} />
          )}
          style={{ paddingVertical: 4, borderRadius: 45, marginTop: 18, marginBottom: 32 }}
          onPress={() => navigate("AddBankAccount")}
        />
        <View style={$divider} />
      </View>
    </View>
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
  paddingHorizontal: spacing.md,
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
