import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackRoutes from "./stack.routes";
import TabRoutes from "./tab.routes";
import { useAuth } from "../contexts/Auth";

export default function Routes() {
  const { authData } = useAuth();
  return (
    <NavigationContainer>
      {authData ? <TabRoutes /> : <StackRoutes />}
    </NavigationContainer>
  );
}
