import { Platform } from "react-native"
import {
  Poppins_300Light as poppinsLight,
  Poppins_400Regular as poppinsRegular,
  Poppins_500Medium as poppinsMedium,
  Poppins_600SemiBold as poppinsSemiBold,
  Poppins_900Black as poppinsBlack,
} from "@expo-google-fonts/poppins"

export const customFontsToLoad = {
  poppinsLight,
  poppinsRegular,
  poppinsMedium,
  poppinsSemiBold,
  poppinsBlack,
}

const fonts = {
  poppins: {
    // Cross-platform Google font.
    light: "poppinsLight",
    normal: "poppinsRegular",
    medium: "poppinsMedium",
    semiBold: "poppinsSemiBold",
    bold: "poppinsBlack",
  },
  helveticaNeue: {
    // iOS only font.
    thin: "HelveticaNeue-Thin",
    light: "HelveticaNeue-Light",
    normal: "Helvetica Neue",
    medium: "HelveticaNeue-Medium",
  },
  courier: {
    // iOS only font.
    normal: "Courier",
  },
  sansSerif: {
    // Android only font.
    thin: "sans-serif-thin",
    light: "sans-serif-light",
    normal: "sans-serif",
    medium: "sans-serif-medium",
  },
  monospace: {
    // Android only font.
    normal: "monospace",
  },
}

const sizes = {
  h1: 36,
  h2: 24,
  h3: 18,
  h4: 14,
  p1: 14,
  p2: 12,
  btn1: 18,
  btn2: 14,
  overline: 10,
}

export const typography = {
  fonts,
  sizes,

  primary: fonts.poppins,

  secondary: Platform.select({ ios: fonts.helveticaNeue, android: fonts.sansSerif }),

  code: Platform.select({ ios: fonts.courier, android: fonts.monospace }),
}
