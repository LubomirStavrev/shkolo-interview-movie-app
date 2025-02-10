"use client"

import { useState } from "react"
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native"
import { useRouter } from "expo-router"
import styled from "@emotion/native"
import { useAuth } from "../context/AuthContext"
import { STRINGS } from "../constants/strings"
import { CustomColors } from "../constants/colors"

const LoginScreen = () => {
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleLogin = async () => {
    if (loading) return
    setLoading(true)
    setError(null)
    try {
      await login()
      router.replace("/")
    } catch (error) {
      setError("Failed to login with Facebook")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      {loading ? (
        <ActivityIndicator size="large" color={CustomColors.brand.facebook} />
      ) : (
        <Container>
          <Title>{STRINGS.WELCOME.TITLE}</Title>
          <LoginButton onPress={handleLogin}>
            <ButtonText>Login with Facebook</ButtonText>
          </LoginButton>
          {error && <ErrorText>{error}</ErrorText>}
        </Container>
      )}
    </Container>
  )
}

const Container = styled(View)(({ theme }) => ({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing.md,
  backgroundColor: theme.colors.background.primary,
}))

const Title = styled(Text)(({ theme }) => ({
  fontSize: 24,
  fontWeight: "bold",
  marginBottom: theme.spacing.md,
  color: theme.colors.text.primary,
}))

const LoginButton = styled(TouchableOpacity)(({ theme }) => ({
  backgroundColor: theme.colors.brand.facebook,
  padding: theme.spacing.sm,
  borderRadius: theme.spacing.xs,
  width: "100%",
  alignItems: "center",
}))

const ButtonText = styled(Text)(({ theme }) => ({
  color: theme.colors.common.white,
  fontSize: 16,
  fontWeight: "bold",
}))

const ErrorText = styled(Text)(({ theme }) => ({
  color: theme.colors.status.error,
  marginTop: theme.spacing.sm,
}))

export default LoginScreen

