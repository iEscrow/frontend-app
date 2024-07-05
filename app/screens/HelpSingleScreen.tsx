import Footer from "app/components/Footer"
import React, { FC, useState } from "react"
import { Dimensions, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler"

import { AutoImage, Screen, Text } from "../components"
import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import { colors, spacing } from "../theme"

const { width } = Dimensions.get("screen")

export const HelpSingleScreen: FC<DemoTabScreenProps<"HelpSingle">> = function HelpSingleScreen(
  _props,
) {
  const { navigation, route } = _props
  const [scrollRef, setScrollRef] = useState(null)
  const [dataSourceCords, setDataSourceCords] = useState([])

  const scrollHandler = (scrollToIndex) => {
    if (dataSourceCords.length > scrollToIndex) {
      scrollRef.scrollTo({
        x: 0,
        y: dataSourceCords[scrollToIndex],
        animated: true,
      })
    }
  }

  return (
    <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("HelpCenter")}
        style={{
          flexDirection: "row",
          gap: 8,
          alignItems: "center",
          marginTop: 24,
          marginLeft: 8,
        }}
      >
        <AutoImage
          source={require("../../assets/icons/caretLeft.png")}
          style={{ width: 24, height: 24, tintColor: "white" }}
        />

        <Text preset="h4" style={{ maxWidth: "65%" }}>
          {route?.params?.title}
        </Text>
      </TouchableOpacity>
      <ScrollView
        ref={(ref) => {
          setScrollRef(ref)
        }}
      >
        <View style={{ paddingHorizontal: 16 }}>
          <AutoImage source={require("../../assets/images/logo.png")} style={$logo} />
          <View style={{ marginTop: 16, marginBottom: 32 }}>
            {route.params?.sections?.map((section, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => scrollHandler(i)}
                style={{ marginBottom: 8 }}
              >
                <Text preset="h4">{section.title}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {route.params?.sections?.map((section, i) => (
            <View
              key={i}
              onLayout={(event) => {
                const layout = event.nativeEvent.layout
                dataSourceCords[i] = layout.y
                setDataSourceCords(dataSourceCords)
              }}
              style={{ marginBottom: 16 }}
            >
              <Text preset="h4" style={{ color: colors.palette.accent400, marginBottom: 4 }}>
                {section.title}
              </Text>
              <Text preset="h4">{section.description}</Text>
            </View>
          ))}
        </View>
        <Footer />
      </ScrollView>
    </Screen>
  )
}

const $container: ViewStyle = {
  paddingBottom: spacing.xxl,
}

const $item: ViewStyle = { flexDirection: "row", gap: spacing.md }
const $itemText: TextStyle = { textAlign: "left", marginTop: spacing.md }
const $itemImage: ImageStyle = { width: (width - 300) / 2, height: (width - 300) / 2 }

const $faq: ViewStyle = { width: (width - 80) / 2, alignItems: "center" }
const $faqText: TextStyle = { textAlign: "center", marginTop: spacing.md }
const $faqImage: ImageStyle = { width: 32, height: 32 }

const $cards: ViewStyle = {
  gap: spacing.md,
}

const $title: TextStyle = {
  marginBottom: spacing.md,
  paddingLeft: spacing.lg,
  marginTop: spacing.xl,
}

const $logo: ImageStyle = {
  marginTop: spacing.xl,
  marginBottom: spacing.md,
  width: (width * 140) / 360,
  height: (width * 62) / 360,
  marginLeft: "auto",
  marginRight: "auto",
}
