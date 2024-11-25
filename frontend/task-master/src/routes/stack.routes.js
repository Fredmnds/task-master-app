import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screen/Login";
import UserRegisterScreen from "../screen/RegisterUser";


const Stack = createNativeStackNavigator();

export default function StackRoutes() {
    return (
        <Stack.Navigator initialRouteName="Login" screenOptions={{ animation: "slide_from_right" }}>
            <Stack.Screen
                name="Login"
                component={LoginScreen}
            />
            <Stack.Screen
                name="UserRegister"
                component={UserRegisterScreen}
                options={{ title: "Cadastro de Usuário" }}
            />

        </Stack.Navigator>
    )
}