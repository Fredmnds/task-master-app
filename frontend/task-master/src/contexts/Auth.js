import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authenticateUser } from "../services/authServices";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(null);

  useEffect(() => {
    const loadAuthData = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        setAuthData(JSON.parse(storedUser));
      }
    };
    loadAuthData();
  }, []);

  async function signIn(data) {
    const userData = await authenticateUser(data);
    setAuthData(userData);
    await AsyncStorage.setItem("user", JSON.stringify(userData));
  }

  async function signOut() {
    setAuthData(null);
    await AsyncStorage.removeItem("user");
  }

  return (
    <AuthContext.Provider value={{ authData, isAuthenticated: !!authData, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}