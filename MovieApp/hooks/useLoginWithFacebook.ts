import AsyncStorage from "@react-native-async-storage/async-storage"
import { API_ENDPOINT } from "../config/api"

const API_URL = API_ENDPOINT // Replace with your actual Laravel backend URL

export const loginWithFacebook = async (idToken: string) => {
  try {
    const response = await fetch(`${API_URL}/auth/facebook`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idToken }),
    })

    if (!response.ok) {
      throw new Error("Failed to authenticate with backend")
    }

    const data = await response.json()
    await AsyncStorage.setItem("userToken", data.access_token)
    return data.access_token
  } catch (error) {
    console.error("Error logging in with Facebook:", error)
    throw error
  }
}

export const logout = async () => {
  await AsyncStorage.removeItem("userToken")
}

export const getAuthToken = async () => {
  return await AsyncStorage.getItem("userToken")
}

