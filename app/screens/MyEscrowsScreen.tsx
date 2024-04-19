import React, { FC } from "react"
import { TextStyle, View, ViewStyle, Dimensions, ImageStyle, FlatList } from "react-native"
import { AutoImage, Button, Icon, Screen, Text, TextField, Toggle } from "../components"
import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import { colors, spacing, typography } from "../theme"
import { translate } from "../i18n"
import SelectDropdown from "react-native-select-dropdown"
import { TouchableOpacity } from "react-native-gesture-handler"
import MarketplaceCard from "app/components/MarketplaceCard"
import MyEscrowCard from "app/components/MyEscrowCard"
import escrows from "app/data/escrows"

const { width } = Dimensions.get("screen")

export const MyEscrowsScreen: FC<DemoTabScreenProps<"MyEscrows">> = function MyEscrowsScreen(
  _props,
) {
  return (
    <Screen preset="scroll" safeAreaEdges={["top"]} contentContainerStyle={$container}>
      <AutoImage source={require("../../assets/images/logo.png")} style={$logo} />
      <View style={{ paddingHorizontal: 8 }}>
        <Text text="Mis escrows" preset="h3" style={$title} />
        {/* <FlatList
          style={$cards}
          data={escrows.personal}
          contentContainerStyle={{ paddingBottom: 400 }}
          showsVerticalScrollIndicator={false}
          renderItem={(item) => <MyEscrowCard {...item} />}
          keyExtractor={(item) => item.id}
        /> */}
        <View>{escrows.personal.map((escrow) => <MyEscrowCard {...escrow} key={escrow.id} />)}
          
        </View>
      </View>
    </Screen>
  )
}

const $container: ViewStyle = {
  paddingBottom: spacing.xxl,
}

const $cards: ViewStyle = {
  gap: spacing.md,
}

const $title: TextStyle = {
  marginBottom: spacing.md,
  paddingLeft: spacing.lg,
  marginTop: spacing.xl,
}

const $logo: ImageStyle = {
  marginTop: spacing.xxxl,
  width: (width * 100) / 360,
  height: (width * 45) / 360,
  marginLeft: "auto",
  marginRight: "auto",
}
