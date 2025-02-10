import { Platform } from "react-native";
import { sha256 } from "react-native-sha256";
import {
  AccessToken,
  AuthenticationToken,
  LoginManager,
} from "react-native-fbsdk-next";
import auth from "@react-native-firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from '../../config/api';

function generateNonce(length = 16) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let nonce = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    nonce += characters[randomIndex];
  }
  return nonce;
}

async function onFacebookButtonPressIOS() {
  try {
    const nonce = generateNonce();
    const nonceSha256 = await sha256(nonce);

    const result = await LoginManager.logInWithPermissions(
      ["public_profile", "email"],
      "limited",
      nonceSha256
    );
    if (result.isCancelled) throw new Error("User cancelled the login process");

    const data = await AuthenticationToken.getAuthenticationTokenIOS();
    if (!data)
      throw new Error("Something went wrong obtaining authentication token");

    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.authenticationToken,
      nonce
    );
    const userCredential =
      await auth().signInWithCredential(facebookCredential);
    const idToken = await userCredential.user.getIdToken();

    return { user: userCredential.user, idToken };
  } catch (error) {
    console.error("Facebook login error:", error);
    throw error;
  }
}

async function onFacebookButtonPressAndroid() {
  try {
    const result = await LoginManager.logInWithPermissions([
      "public_profile",
      "email",
    ]);
    if (result.isCancelled) throw new Error("User cancelled the login process");

    const data = await AccessToken.getCurrentAccessToken();
    if (!data) throw new Error("Something went wrong obtaining access token");

    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken
    );
    const userCredential =
      await auth().signInWithCredential(facebookCredential);
    const idToken = await userCredential.user.getIdToken();

    return { user: userCredential.user, idToken };
  } catch (error) {
    console.error("Facebook login error:", error);
    throw error;
  }
}

export const loginWithFacebook = async () => {
  try {
    const loginFunction =
      Platform.OS === "ios"
        ? onFacebookButtonPressIOS
        : onFacebookButtonPressAndroid;
    const { user, idToken } = await loginFunction();

    const url = `${API_BASE_URL}/api/auth/facebook`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ idToken }),
    });

    const responseText = await response.text();

    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status}, body: ${responseText}`
      );
    }

    const data = JSON.parse(responseText);
    await AsyncStorage.setItem("userToken", data.access_token);
    return { user, idToken };
  } catch (error) {
    console.error("Error logging in with Facebook:", error);
    throw error;
  }
};
