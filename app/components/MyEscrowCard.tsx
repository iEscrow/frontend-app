/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from "react"
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer"
import {
  Linking,
  Touchable,
  ViewStyle,
  ImageStyle,
  TextStyle,
  View,
  Image,
  Modal,
  ImageBackground,
  Dimensions,
  TouchableHighlight,
} from "react-native"

import { Text } from "./Text"
import { AutoImage } from "./AutoImage"
import { Icon } from "./Icon"
import { colors, spacing, typography } from "app/theme"
import { useStores } from "app/models"
import { FlatList, TextInput, TouchableOpacity } from "react-native-gesture-handler"
import { Button } from "./Button"
import { BlurView } from "expo-blur"
import { TextField } from "./TextField"
export default function MyEscrowCard(_props) {
  const { send, recieve, id, state, createdAt, privacy, isOpenDefault, details, chat } = _props
  const { width, height } = Dimensions.get("screen")
  const [isOpen, setIsOpen] = useState(isOpenDefault || false)
  const [isChatOpen, setIsChatOpen] = useState(false)

  const unseenMessages = chat?.filter((message) => !message.seen)
  const unseenCount = unseenMessages?.length ?? 0
  const detailsShort = details.substring(0, 38) + "..."

  const handleChat = () => {
    setIsChatOpen(!isChatOpen)
  }
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
        <View
          style={{
            position: "absolute",
            top: 14,
            right: 8,
            flexDirection: "row",
            alignItems: "flex-end",
          }}
        >
          {state === "CONFIRMADO" && (
            <TouchableHighlight onPress={handleChat}>
              <Icon icon={`chat_${unseenCount > 9 ? "more" : unseenCount}`} size={25} />
            </TouchableHighlight>
          )}
          <TouchableHighlight
            style={{
              height: 24,
              width: 24,
              gap: 3,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <>
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
            </>
          </TouchableHighlight>
        </View>
        <Button
          text="ENVIAR"
          preset="filled"
          style={{
            paddingVertical: 6,
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 14,
            display: isOpen && state === "CONFIRMADO" ? "flex" : "none",
          }}
          textStyle={{
            fontSize: 14,
            fontFamily: typography.primary.semiBold,
            lineHeight: 21,
          }}
        />
      </View>
      <Modal animationType="slide" transparent={true} visible={isChatOpen}>
        <BlurView
          intensity={100}
          tint="dark"
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <TouchableHighlight onPress={handleChat} style={{ marginRight: 22, zIndex: 20 }}>
            <AutoImage
              source={require("../../assets/icons/chat-close.png")}
              style={{ width: 32, height: 32 }}
            />
          </TouchableHighlight>
          <View
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 8,
              backgroundColor: colors.palette.black,
              borderRadius: 20,
              paddingTop: 30,
              paddingHorizontal: 16,
              paddingBottom: 16,
              alignItems: "center",
              borderWidth: 2,
              width: width - 32,
              borderColor: colors.palette.primary400,
              height: "70%",
              maxHeight: height * 0.7,
              zIndex: 10,
            }}
          >
            <View style={{ paddingBottom: 24 }}>
              <Text text={"CHAT"} preset="btn1" style={{ textAlign: "center" }} />
              <Text
                text={"Nombre del usuario receptor"}
                preset="h4"
                style={{ textAlign: "center" }}
              />
            </View>
            <FlatList
              data={chat}
              inverted
              contentContainerStyle={{ flexDirection: "column-reverse" }}
              style={{ width: "100%", paddingLeft: 16 }}
              renderItem={({ item, index }) => (
                <View
                  style={{ flexDirection: item.me ? "row" : "row-reverse", marginBottom: 12 }}
                  key={index}
                >
                  <Text
                    text={item.message}
                    preset="h6"
                    style={{
                      backgroundColor: item.me
                        ? colors.palette.primary400
                        : colors.palette.neutral600,
                      paddingTop: 10,
                      paddingLeft: 18,
                      paddingBottom: 12,
                      paddingRight: 12,
                      borderRadius: 10,
                      flex: 1,
                    }}
                  />
                  {item?.me ? (
                    <AutoImage
                      source={require(`../../assets/icons/message-arrow.png`)}
                      style={{
                        width: 12,
                        height: 16,
                        marginTop: 12,
                        marginLeft: -1,
                        
                      }}
                    />
                  ) : (
                    <AutoImage
                      source={require(`../../assets/icons/message-arrow-me.png`)}
                      style={{
                        width: 12,
                        height: 16,
                        marginTop: 12,
                        marginLeft: -1,
                        transform:  [{ rotate: "180deg" }]
                      }}
                    />
                  )}

                  <AutoImage
                    source={require("../../assets/icons/avatar-blue.png")}
                    style={{ width: 32, height: 32, marginTop: 3, marginHorizontal: 5 }}
                  />
                </View>
              )}
            />

            <View
              style={{
                marginTop: "auto",
                width: "100%",
                flexDirection: "row",
                backgroundColor: colors.palette.inputBackground,
                height: 38,
                borderRadius: 20,
                paddingHorizontal: 16,
              }}
            >
              <TextInput
                style={{ flex: 1 }}
                placeholder="Escribe un mensaje"
                placeholderTextColor={colors.palette.neutral600}
              />
              <TouchableHighlight
                style={{ justifyContent: "center", height: 38 }}
                onPress={() => console.log("asd")}
              >
                <Icon icon="sendMessage" size={24} />
              </TouchableHighlight>
            </View>
          </View>
        </BlurView>
      </Modal>
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
        <TouchableHighlight onPress={() => setIsOpen(!isOpen)}>
          <Icon
            icon="details"
            size={20}
            style={{ transform: [{ rotateZ: isOpen ? "180deg" : "0deg" }] }}
          />
        </TouchableHighlight>
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
