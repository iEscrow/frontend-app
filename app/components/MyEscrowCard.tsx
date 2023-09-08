import React, { useState } from "react"
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer"
import { Linking, Touchable, ViewStyle, ImageStyle, TextStyle, View, Image } from "react-native"

import { Text } from "./Text"
import { AutoImage } from "./AutoImage"
import { Icon } from "./Icon"
import { colors, spacing, typography } from "app/theme"
import { useStores } from "app/models"
import { TouchableOpacity } from "react-native-gesture-handler"
import { Button } from "./Button"

export default function MyEscrowCard(_props) {
  const { item } = _props
  const { send, recieve, id, state, createdAt, privacy, isOpenDefault, details } = item

  const [isOpen, setIsOpen] = useState(isOpenDefault || false)

 
  const detailsShort = details.substring(0, 38) + "..."
  return (
    <View style={{ paddingBottom: 10, marginBottom: 8 }}>
      <View style={[$container, $shadow]}>
        <View>
          <View style={$cardTop}>
            <AutoImage source={require("../../assets/icons/add-user.png")} style={$avatar} />
            <View>
              <View style={{ flexDirection: "row", gap: 8 }}>
                <Text text={privacy} preset="h4" />
                <Text text={`#${id}`} preset="h4" />
              </View>
              <Text text={createdAt} preset="overline" />
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View>
              <View style={{ flexDirection: "row", gap: 12, paddingLeft: 42 }}>
                <View>
                  <Text text="RECIBES" preset="h3" style={$accent400} />
                  <Text text="ENVÍAS" preset="h3" style={$accent400} />
                </View>
                <View>
                  <Text text={recieve} preset="h3" />
                  <Text text={send} preset="h3" />
                </View>
              </View>
              <View style={{ flexDirection: "row", gap: 8, marginTop: 16, marginBottom: 6 }}>
                <Text text="ESTADO" preset="text2" style={$accent400} />
                <Text text={state} preset="text2" style={$accent400} />
              </View>
              <Text text={isOpen ? details : detailsShort} preset="h4" />
            </View>
          </View>
        </View>
        <View style={{ position: "absolute", top: 14, right: 8 }}>
          <TouchableOpacity
            style={{
              height: 24,
              width: 24,
              gap: 3,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 4,
                height: 4,
                borderRadius: 20,
                backgroundColor: colors.palette.white,
              }}
            />
            <View
              style={{
                width: 4,
                height: 4,
                borderRadius: 20,
                backgroundColor: colors.palette.white,
              }}
            />
            <View
              style={{
                width: 4,
                height: 4,
                borderRadius: 20,
                backgroundColor: colors.palette.white,
              }}
            />
          </TouchableOpacity>
        </View>
        <Button
        text="ENVIAR"
        preset="filled"
        style={{
          paddingVertical: 6,
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 14,
          display:isOpen && state === "CONFIRMADO" ? "flex" :"none"
        }}
        textStyle={{
          fontSize: 14,
          fontFamily: typography.primary.semiBold,
          lineHeight: 21,
        }}
      />
      </View>
      
      <View
        style={{
          position: "absolute",
          bottom: 0,
          justifyContent: "center",
          left: 0,
          right: 0,
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
          <Icon
            icon="details"
            size={20}
            style={{ transform: [{ rotateZ: isOpen ? "180deg" : "0deg" }] }}
          />
        </TouchableOpacity>
      </View>
    </View>
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
  paddingBottom: 20,
  position: "relative",
  borderRadius: 18,
  backgroundColor: colors.palette.inputBackground,
}

const $avatar: ImageStyle = {
  width: 35,
  height: 29,
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
  gap: 8,
  alignItems: "center",
  marginBottom: spacing.md,
}
