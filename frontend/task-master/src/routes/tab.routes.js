import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "react-native-vector-icons";
import Home from "../screen/Home";
import Settings from "../screen/Settings";

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
    return (
        <Tab.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="Tarefas"
            keyboardHidesTabBar={true}
        >
            <Tab.Screen
                name="Tarefas"
                component={Home}
                options={{
                    tabBarIcon: ({ color, size }) => <Feather name="home" color={color} size={size} />,
                    tabBarLabel: "Tarefas",
                }}
            />
            <Tab.Screen
                name="Perfil"
                component={Settings}
                options={{
                    tabBarIcon: ({ color, size }) => <Feather name="user" color={color} size={size} />,
                    tabBarLabel: "Perfil",
                }}
            />
        </Tab.Navigator>
    );
}
