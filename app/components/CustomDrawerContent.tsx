import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer"
import { Linking, Touchable } from "react-native"
import { View, Image } from "react-native"
import { Text } from "./Text"
import { AutoImage } from "./AutoImage"
import { Icon } from "./Icon"
import { colors, typography } from "app/theme"
import { useStores } from "app/models"
import { TouchableOpacity } from "react-native-gesture-handler"

export default function CustomDrawerContent(props) {
  const { state, navigation } = props
  const { routes, index } = state; 
  const focusedRoute = routes[index].name;
  const {
    authenticationStore: { logout },
  } = useStores()

  return (
    <>
    <DrawerContentScrollView>
      <View
        style={{ backgroundColor: "#121212", paddingTop: 40, alignItems: "center", height: "100%" }}
      >
        <AutoImage
          source={require("../../assets/images/logo.png")}
          style={{ width: 140, height: 62, marginBottom: 40 }}
        />
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 32,
            paddingBottom: 16,
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Text
            text="País/moneda"
            style={{ fontFamily: typography.primary.normal, fontSize: typography.sizes.overline }}
          />
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Text text="$AR" style={{ fontFamily: typography.primary.semiBold, fontSize: 16 }} />
            <Icon
              icon="dropdown"
              size={24}
              style={{ width: 10, resizeMode: "cover" }}
              color="white"
            />
          </View>
        </View>
          <DrawerItem
            testID="asd"
            label="MI perfil"
            onPress={()=> navigation.navigate("Profile")}
          style={{
            width: "100%",
            paddingLeft: 24,
            borderRadius: 0,
            height: 44,
            marginHorizontal: 0,
            marginVertical: 0,
            overflow: 'visible',
            backgroundColor: colors.palette.primary400
            }}
            activeTintColor="red"
          labelStyle={{
            fontFamily: typography.primary.semiBold,
            fontSize: typography.sizes.btn1,
            color: colors.palette.white,
            lineHeight: 22,
            height: 27,
            textTransform: "uppercase"
            }}
          activeBackgroundColor="blue"
          inactiveBackgroundColor="rgba(0,0,0,0)"
          
        />
        
        <DrawerItem
          label="FAQ’s"
          style={{
            width: "100%",
            paddingLeft: 24,
            borderRadius: 0,
            height: 44,
            marginHorizontal: 0,
            marginVertical: 0,
            overflow: 'visible',
          }}
          labelStyle={{
            fontFamily: typography.primary.semiBold,
            fontSize: typography.sizes.btn1,
            color: colors.palette.white,
            lineHeight: 22,
            height: 27,
            textTransform: "uppercase"
          }}
          inactiveBackgroundColor="rgba(0,0,0,0)"
        />
        <DrawerItem
          label="Ayuda"
          style={{
            width: "100%",
            paddingLeft: 24,
            borderRadius: 0,
            height: 44,
            marginHorizontal: 0,
            marginVertical: 0,
            overflow: 'visible',
          }}
          labelStyle={{
            fontFamily: typography.primary.semiBold,
            fontSize: typography.sizes.btn1,
            color: colors.palette.white,
            lineHeight: 22,
            height: 27,
            textTransform: "uppercase"
          }}
          inactiveBackgroundColor="rgba(0,0,0,0)"
        />
        <DrawerItem
          label="Referidos"
          style={{
            width: "100%",
            paddingLeft: 24,
            borderRadius: 0,
            height: 44,
            marginHorizontal: 0,
            marginVertical: 0,
            overflow: 'visible',
          }}
          labelStyle={{
            fontFamily: typography.primary.semiBold,
            fontSize: typography.sizes.btn1,
            color: colors.palette.white,
            lineHeight: 22,
            height: 27,
            textTransform: "uppercase"
          }}
          inactiveBackgroundColor="rgba(0,0,0,0)"
        />
       
      </View>
      </DrawerContentScrollView>
      <TouchableOpacity onPress={() => {
        navigation.closeDrawer()
        logout()
      }}>

      <Text
          text="cerrar sesión"
          style={{
            width: "100%",
            paddingVertical: 16,
            fontFamily: typography.primary.semiBold,
            fontSize: typography.sizes.btn2,
            lineHeight: 21,
            textTransform: "uppercase",
            marginTop: "auto",
            textAlign: "center",
          }}
          />
          </TouchableOpacity>
    </>
  )
}
