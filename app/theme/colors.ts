// TODO: write documentation for colors and palette in own markdown file and add links from here

const palette = {
  neutral300: "#EAE9E9",
  neutral400: "#d5d5d5",
  neutral500: "#BFBFBF",
  neutral600: "#707070",

  primary400: "#1B80A4",
  primary500: "#063E67",
  primary600: "#02284A",

  secondary400: "#F5C6B7",
  secondary500: "#EC886A",
  secondary600: "#E35226",

  accent400: "#37D2F4",
  accent500: "#39D6C5",
  accent600: "#7FECAA",

  backdrop: "rgba(0,0,0,0.4)",

  text: "#3D3D3D",
  success: "#6EB7A0",
  error: "#E85A69",
  info: "#F3AA64",
  disabled: "#E4E4E4",
  background: "#F4F4F4",

  gradientBlue: ["#063E67", "#1B80A4"],
  gradientDarlBlue: ["#063E67", "#02284A"],
  gradientGreen: ["#30C2E2", "#39D6C5", "#7FECAA"],
  gradientSalmon: ["#EC886A", "#F5C6B7"],
} as const

export const colors = {
  palette,

  transparent: "rgba(0, 0, 0, 0)",

  text: palette.text,

  textDim: palette.neutral600,

  background: palette.background,

  border: palette.neutral600,

  tint: palette.primary500,

  separator: palette.neutral400,

  error: palette.error,

  errorBackground: palette.error,
}
