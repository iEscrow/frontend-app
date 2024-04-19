import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import { Dimensions, ImageStyle, TextInput, TextStyle, ViewStyle } from "react-native"
import {
  AutoImage,
  Button,
  Icon,
  Screen,
  Text,
  TextField,
  TextFieldAccessoryProps,
} from "../components"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import { api } from "app/services/api"

const { width } = Dimensions.get("screen")

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen(_props) {
  const authPasswordInput = useRef<TextInput>()

  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [attemptsCount, setAttemptsCount] = useState(0)
  const {
    authenticationStore: {
      authEmail,
      setAuthEmail,
      authPassword,
      setAuthPassword,
      setAuthToken,
      validationEmailError,
      validationPasswordError,
    },
  } = useStores()

  useEffect(() => {
    /* setAuthEmail("emiliano@testing.com")
    setAuthPassword("testing123") */

    return () => {
      setAuthPassword("")
      setAuthEmail("")
    }
  }, [])

  const emailError = isSubmitted ? validationEmailError : ""
  const passwordError = isSubmitted ? validationPasswordError : ""

  function login() {
    setIsSubmitted(true)
    setAttemptsCount(attemptsCount + 1)
    if (validationEmailError || validationPasswordError) return

    api
      .login({ username: authEmail, password: authPassword })
      .then((response) => {
        console.log("response", response)
        setAuthToken(response.data.token)
        setAuthEmail(response.data.user.email)
        setIsSubmitted(false)
      })
      .catch((error) => console.error(error))
  }

  const PasswordRightAccessory = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={isAuthPasswordHidden ? "view" : "hidden"}
            color={colors.palette.white}
            containerStyle={props.style}
            size={20}
            onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
          />
        )
      },
    [isAuthPasswordHidden],
  )

  const EmailLeftAccessory = () => (
    <Icon
      icon={"email"}
      color={colors.palette.white}
      style={$inputIcon}
      size={20}
      onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
    />
  )
  const PasswordLeftAccessory = () => (
    <Icon
      icon={"lock"}
      color={colors.palette.white}
      style={$inputIcon}
      size={20}
      onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
    />
  )

  return (
    <Screen
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
    >
      <AutoImage source={require("../../assets/images/logo.png")} style={$logo} />

      <Text testID="login-heading" tx="loginScreen.signIn" preset="loginHeading" style={$signIn} />

      <TextField
        value={authEmail}
        onChangeText={setAuthEmail}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="username"
        autoCorrect={false}
        keyboardType="default"
        placeholderTx="loginScreen.usernameFieldPlaceholder"
        helper={isSubmitted ? validationEmailError : ""}
        status={emailError ? "error" : undefined}
        onSubmitEditing={() => authPasswordInput.current?.focus()}
        LeftAccessory={EmailLeftAccessory}
      />

      <TextField
        ref={authPasswordInput}
        value={authPassword}
        onChangeText={setAuthPassword}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry={isAuthPasswordHidden}
        placeholderTx="loginScreen.passwordFieldPlaceholder"
        helper={isSubmitted ? validationPasswordError : ""}
        status={passwordError ? "error" : undefined}
        RightAccessory={PasswordRightAccessory}
        LeftAccessory={PasswordLeftAccessory}
      />

      <Button
        testID="login-button"
        tx="loginScreen.tapToSignIn"
        style={$tapButton}
        preset="default"
        onPress={login}
      />
      {/* <Button
        testID="login-button"
        tx="loginScreen.tapToSignIn"
        style={$tapButton}
        preset="secondary"
        onPress={login}
      />
      <Button
        testID="login-button"
        tx="loginScreen.tapToSignIn"
        style={$tapButton}
        preset="disabled"
        onPress={login}
      />

      <Button
        testID="login-button"
        tx="loginScreen.tapToSignIn"
        style={$tapButton}
        preset="outline"
        onPress={login}
      /> */}
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
}

const $signIn: TextStyle = {
  marginBottom: spacing.lg,
  lineHeight: 30,
}

const $textField: ViewStyle = {
  marginBottom: spacing.lg,
}

const $tapButton: ViewStyle = {
  marginTop: spacing.xs,
}

const $logo: ImageStyle = {
  width: (width * 140) / 360,
  height: (width * 61) / 360,
  marginLeft: "auto",
  marginRight: "auto",
  marginBottom: spacing.xxl,
  marginTop: spacing.lg,
}
const $inputIcon: ImageStyle = {
  flex: 1,
  marginLeft: spacing.md,
}
