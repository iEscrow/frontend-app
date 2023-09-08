import React, { FC } from "react"
import { TextStyle, View, ViewStyle, Dimensions, ImageStyle } from "react-native"
import { AutoImage, Button, Icon, Screen, Text, TextField, Toggle } from "../components"
import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import { colors, spacing, typography } from "../theme"
import { translate } from "../i18n"
import SelectDropdown from "react-native-select-dropdown"
import { TouchableOpacity } from "react-native-gesture-handler"

const coins = ["USDT", "ETC", "BTC", "BNB"]
const options = ["Mercado Pago", "Transferencia bancaria"]
const { width } = Dimensions.get("screen")

export const CreateEscrow2Screen: FC<DemoTabScreenProps<"CreateEscrow2">> =
  function CreateEscrow2Screen(_props) {
    const [bbva, setBBVA] = React.useState(true)
    const [galicia, setGalicia] = React.useState(false)
    const { navigation } = _props
    const checkGalicia = () => {
      setGalicia(true)
      setBBVA(false)
    }
    const checkBBVa = () => {
      setGalicia(false)
      setBBVA(true)
    }

    return (
      <Screen preset="scroll" safeAreaEdges={["top"]} contentContainerStyle={$container}>
       
     
        <AutoImage source={require("../../assets/images/logo.png")} style={$logo} />
        <View style={$itemsContainer}>
          <Text
            text="Selecciona la cuenta con la cual recibirás la tranferencia bancaria:"
            preset="h4"
            style={$title}
          />
          <View style={{}}>
            <TouchableOpacity
              style={{ flexDirection: "row", gap: spacing.md }}
              onPress={checkBBVa}
            >
              <Toggle variant="radio" value={bbva} containerStyle={{ marginTop: 4 }} />
              <Text text="BBVA" size="text1" weight="normal" />
            </TouchableOpacity>
            <View style={{ marginLeft: 32 }}>
              <View style={{ flexDirection: "row", marginTop: 6 }}>
                <Text text="Titular " preset="text2" style={{ color: colors.palette.primary400 }} />
                <Text text="Facundo Salas" preset="text2" />
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  text="Número de cuenta "
                  preset="text2"
                  style={{ color: colors.palette.primary400 }}
                />
                <Text text="3216XXXXXXXXX4351" preset="text2" />
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text text="CBU " preset="text2" style={{ color: colors.palette.primary400 }} />
                <Text text="0000321XXXXX4684351" preset="text2" />
              </View>
            </View>
            <View style={[{ marginTop: 12, position: "relative" }]}>
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
          <View style={{ marginTop: 12 }}>
            <TouchableOpacity
              style={{ flexDirection: "row", gap: spacing.md }}
              onPress={checkGalicia}
            >
              <Toggle variant="radio" value={galicia} containerStyle={{ marginTop: 4 }} />
              <Text text="Galicia" size="text1" weight="normal" />
            </TouchableOpacity>
            <View style={{ marginLeft: 32 }}>
              {/* <View style={{ flexDirection: "row", marginTop: 6 }}>
                <Text text="Titular " preset="text2" style={{ color: colors.palette.primary400 }} />
                <Text text="Facundo Salas" preset="text2" />
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  text="Número de cuenta "
                  preset="text2"
                  style={{ color: colors.palette.primary400 }}
                />
                <Text text="3216XXXXXXXXX4351" preset="text2" />
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text text="CBU " preset="text2" style={{ color: colors.palette.primary400 }} />
                <Text text="0000321XXXXX4684351" preset="text2" />
              </View> */}
            </View>
            <View style={[{ marginTop: 12, position: "relative" }]}>
              <View style={$divider} />
              <Icon
                icon="details"
                size={20}
                style={{
                  position: "absolute",
                  right: "50%",
                  transform: [{ translateX: 10 }, { translateY: -10 }, { rotateZ: "180deg" }],
                }}
              />
            </View>
            <View style={{ alignItems: "flex-start" }}>
              <Button
                text="Agregar cuenta"
                preset="gray"
                LeftAccessory={() => (
                  <Icon icon="create" size={24} style={{ marginBottom: 2, marginRight: 4 }} />
                )}
                style={{ paddingVertical: 4, borderRadius: 45, marginTop: 18, marginBottom: 32 }}
              />
              <View style={$divider} />
            </View>
            <View style={{ marginTop: 14, marginBottom: 20, alignItems: "flex-start" }}>
              <Text text="% DE COMISIÓN" preset="h4" style={{ marginBottom: 8 }} />
              <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 12 }}>
                <TextField
                  containerStyle={{ height: 36 }}
                  inputWrapperStyle={{ height: 36 }}
                  style={{ fontSize: 18, lineHeight: 35, paddingBottom: 8 }}
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
                  containerStyle={{ height: 36, maxWidth: 200, width: "100%" }}
                  inputWrapperStyle={{ height: 36 }}
                  style={{ fontSize: 18, lineHeight: 35, paddingBottom: 8 }}
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
                  inputWrapperStyle={{ height: 36 }}
                  style={{ fontSize: 18, lineHeight: 35, paddingBottom: 8 }}
                />
              </View>
            </View>
            <View style={$divider} />
            <View style={{ marginTop: 14, marginBottom:  16}}>
              <Text text="TOTAL A ENVIAR" preset="h3" style={{ marginBottom: 2 }} />
              <Text text="Fee: 0.75%" preset="text2" style={{ marginBottom: 8 }} />
              <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 12 }}>
                <TextField
                  RightAccessory={() => (
                    <View
                      style={{
                        height: 32,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingRight: 8,
                      }}
                    >
                      <Text text="USDT" />
                    </View>
                  )}
                  containerStyle={{ height: 36 }}
                  inputWrapperStyle={{ height: 36, width: 170 }}
                  style={{ fontSize: 18, lineHeight: 35, paddingBottom: 8 }}
                />
                <Icon icon="alert" color={colors.palette.info} size={16} />
              </View>
            </View>
            <View style={$divider} />
            <View style={{flexDirection:"row", justifyContent:"space-around", marginTop: 14}}>
              <Button  preset="gray" text="atras" textStyle={{textTransform:"uppercase", fontSize: 18,lineHeight: 27}} style={{ paddingVertical: 6, borderRadius: 45 }}/>
              <Button preset="filled" text="publicar" textStyle={{ textTransform: "uppercase", fontSize: 18, lineHeight: 27 }} style={{ paddingVertical: 6, borderRadius: 45}} />
            </View>
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
