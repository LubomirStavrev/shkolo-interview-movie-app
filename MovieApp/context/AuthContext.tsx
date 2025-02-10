"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { loginWithFacebook } from "../hooks/auth/facebookAuth";
import auth from "@react-native-firebase/auth";
import type { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useRouter } from "expo-router";

interface HandleLogout {
  (router: ReturnType<typeof useRouter>): Promise<void>;
}

interface AuthContextType {
  user: FirebaseAuthTypes.User | null;
  authenticated: boolean;
  login: () => Promise<void>;
  handleLogout: HandleLogout;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  authenticated: false,
  login: async () => {},
  handleLogout: async (router: ReturnType<typeof useRouter>) => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      setUser(user);
      setAuthenticated(!!user);
      if (initializing) setInitializing(false);
    });

    return subscriber; // unsubscribe on unmount
  }, [initializing]);

  const login = async () => {
    try {
      const { user, idToken } = await loginWithFacebook();
      await SecureStore.setItemAsync("idToken", idToken);
      setUser(user);
      setAuthenticated(true);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const handleLogout: HandleLogout = async (router) => {
    try {
      await auth().signOut();
      await SecureStore.deleteItemAsync("idToken");
      await SecureStore.deleteItemAsync("userToken");
      setUser(null);
      setAuthenticated(false);

      router.back();
      router.dismissAll();
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };

  if (initializing) return null;

  return (
    <AuthContext.Provider value={{ user, authenticated, login, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
