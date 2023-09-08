import React, { ComponentType } from "react"
import {
  Pressable,
  PressableProps,
  PressableStateCallbackType,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native"
import { colors, spacing, typography } from "../theme"
import { Text, TextProps } from "./Text"

type Presets = keyof typeof $viewPresets

export interface ButtonAccessoryProps {
  style: StyleProp<any>
  pressableState: PressableStateCallbackType
}

export interface ButtonProps extends PressableProps {
  tx?: TextProps["tx"]
  text?: TextProps["text"]
  txOptions?: TextProps["txOptions"]
  style?: StyleProp<ViewStyle>
  pressedStyle?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  pressedTextStyle?: StyleProp<TextStyle>
  preset?: Presets
  RightAccessory?: ComponentType<ButtonAccessoryProps>
  LeftAccessory?: ComponentType<ButtonAccessoryProps>
  children?: React.ReactNode
}

export function Button (props: ButtonProps) {
  const {
    tx,
    text,
    txOptions,
    style: $viewStyleOverride,
    pressedStyle: $pressedViewStyleOverride,
    textStyle: $textStyleOverride,
    pressedTextStyle: $pressedTextStyleOverride,
    children,
    RightAccessory,
    LeftAccessory,
    
    ...rest
  } = props

  const preset: Presets = $viewPresets[props.preset] ? props.preset : "default"
  function $viewStyle ({ pressed }) {
    return [
      $viewPresets[preset],
      $viewStyleOverride,
      !!pressed && [$pressedViewPresets[preset], $pressedViewStyleOverride],
    ]
  }
  function $textStyle ({ pressed }) {
    return [
      $textPresets[preset],
      $textStyleOverride,
      !!pressed && [$pressedTextPresets[preset], $pressedTextStyleOverride],
    ]
  }

  return (
    <Pressable style={$viewStyle} accessibilityRole='button' {...rest}>
      {state => (
        <>
          {!!LeftAccessory && <LeftAccessory style={$leftAccessoryStyle} pressableState={state} />}

          <Text tx={tx} text={text} txOptions={txOptions} style={$textStyle(state)}>
            {children}
          </Text>

          {!!RightAccessory && (
            <RightAccessory style={$rightAccessoryStyle} pressableState={state} />
          )}
        </>
      )}
    </Pressable>
  )
}

const $baseViewStyle: ViewStyle = {
  minHeight: 32,
  minWidth: 140,
  borderRadius: 20,
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
  paddingVertical: typography.sizes.overline,
  paddingHorizontal: 20,
  overflow: "hidden",
}

const $baseTextStyle: TextStyle = {
  fontSize: typography.sizes.btn1,
  lineHeight: 27,
  fontFamily: typography.primary.semiBold,
  textAlign: "center",
  flexShrink: 1,
  flexGrow: 0,
  zIndex: 2,
  color: colors.palette.white
}

const $rightAccessoryStyle: ViewStyle = { marginStart: spacing.xs, zIndex: 1 }
const $leftAccessoryStyle: ViewStyle = { marginEnd: spacing.xs, zIndex: 1 }

const $viewPresets = {
  default: [
    $baseViewStyle,
    {
      
      backgroundColor: colors.palette.accent500,
    },
  ] as StyleProp<ViewStyle>,
  disabled: [
    $baseViewStyle,
    {
      backgroundColor: colors.palette.neutral500,
    },
  ] as StyleProp<ViewStyle>,
  secondary: [
    $baseViewStyle,
    {
      backgroundColor: colors.palette.primary600,
    },
  ] as StyleProp<ViewStyle>,
  createEscrow: [
    $baseViewStyle,
    {
      backgroundColor: colors.palette.primary600,
      borderWidth: 2,
      borderColor: "red"
    },
  ] as StyleProp<ViewStyle>,
  outline: [
    $baseViewStyle,
    {
      backgroundColor: colors.transparent,
      borderWidth: 2,
      borderColor: colors.palette.accent400
    },
  ] as StyleProp<ViewStyle>,
  gradient: [
    $baseViewStyle,
    {
      backgroundColor: colors.transparent,
    },
  ] as StyleProp<ViewStyle>,

  filled: [$baseViewStyle, { backgroundColor: colors.palette.primary400 }] as StyleProp<ViewStyle>,
  gray: [$baseViewStyle, { backgroundColor: colors.palette.btn2 }] as StyleProp<ViewStyle>,

  reversed: [
    $baseViewStyle,
    { backgroundColor: colors.palette.primary400 },
  ] as StyleProp<ViewStyle>,
}

const $textPresets: Record<Presets, StyleProp<TextStyle>> = {
  default: [$baseTextStyle,],
  disabled: [$baseTextStyle,],
  secondary: [$baseTextStyle,],
  createEscrow: [$baseTextStyle, {fontSize: typography.sizes.btn2}],
  filled: [$baseTextStyle,],
  reversed: [$baseTextStyle, { color: colors.palette.black }],
  outline: [$baseTextStyle],
  gradient: [$baseTextStyle, { color: colors.palette.primary600 }],
  gray: [$baseTextStyle, { color: colors.palette.white, fontSize: 14, lineHeight: 21, fontFamily: typography.primary.semiBold, textTransform:"uppercase" }],
}

const $pressedViewPresets: Record<Presets, StyleProp<ViewStyle>> = {
  default: { backgroundColor: colors.palette.accent600 },
  disabled: { backgroundColor: colors.palette.neutral400 },
  secondary: { backgroundColor: colors.palette.primary500 },
  createEscrow: { backgroundColor: colors.palette.primary500 },
  filled: { backgroundColor: colors.palette.primary600 },
  reversed: { backgroundColor: colors.palette.primary600 },
  outline: { backgroundColor: colors.transparent, borderColor: colors.palette.accent600 },
  gradient: { backgroundColor: colors.palette.backdrop },
}

const $pressedTextPresets: Record<Presets, StyleProp<TextStyle>> = {
  default: { opacity: 0.9 },
  disabled: { opacity: 0.9 },
  secondary: { opacity: 0.9 },
  createEscrow: { opacity: 0.9 },
  filled: { opacity: 0.9 },
  reversed: { opacity: 0.9 },
  outline: { opacity: 0.9 },
  gradient: { opacity: 0.9 },
}
