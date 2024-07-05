import MarketplaceCard from "app/components/MarketplaceCard"
import { useStores } from "app/models"
import { api } from "app/services/api"
import React, { FC, useEffect, useState } from "react"
import {
  Dimensions,
  FlatList,
  ImageStyle,
  RefreshControl,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"

import { AutoImage, Screen, Text } from "../components"
import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import { spacing } from "../theme"

const { width } = Dimensions.get("screen")

export const MarketplaceScreen: FC<DemoTabScreenProps<"Marketplace">> = function MarketplaceScreen(
  _props,
) {
  const [data, setData] = useState([])
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    getEscrows()
  }, [])

  const getEscrows = () => {
    api
      .escrows()
      .then((res) => setData(res.data))
      .catch((error) => console.log(error))
      .finally(() => setRefreshing(false))
  }

  const handleRefresh = () => {
    setRefreshing(true)
    getEscrows()
  }

  return (
    <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$container}>
      <AutoImage source={require("../../assets/images/logo.png")} style={$logo} />
      <View style={$content}>
        <Text text="Marketplace" preset="h3" style={$title} />
        <FlatList
          contentContainerStyle={$cards}
          data={data}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
          renderItem={(item) => <MarketplaceCard {...item} />}
          keyExtractor={(item) => item.id}
        />
      </View>
    </Screen>
  )
}

const $container: ViewStyle = {
  flex: 1,
}

const $content: ViewStyle = {
  paddingHorizontal: 8,
  flex: 1,
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
  width: (width * 140) / 360,
  height: (width * 62) / 360,
  marginLeft: "auto",
  marginRight: "auto",
}
