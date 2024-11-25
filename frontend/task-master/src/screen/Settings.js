import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useAuth } from "../contexts/Auth";
import { makeDeleteRequest } from "../services/authServices";

export default function SettingsScreen({ navigation }) {
    const { signOut, authData } = useAuth();
    const userId = authData.user.id;
    const userName = authData.user.name;

    const delAccount = () => {
        Alert.alert(
            "Confirmação",
            "Você tem certeza que deseja excluir sua conta?",
            [
                {
                    text: "Cancelar",
                    style: "cancel",
                },
                {
                    text: "Excluir",
                    style: "destructive",
                    onPress: async () => {
                        await signOut();
                        await makeDeleteRequest(`users/${userId}`);
                    },
                },
            ]
        );

    };

    const options = [
        { id: 1, title: "Excluir conta", icon: "trash-outline", color: "#333", onPress: () => delAccount() },
        { id: 2, title: "Sair", icon: "log-out-outline", color: "red", onPress: () => signOut() },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <View style={styles.iconContainer}>
                    <Icon name="person-circle-outline" size={100} color="#333" />
                </View>
                <Text style={styles.userName}>{userName}</Text>
            </View>
            {options.map(option => (
                <View key={option.id} style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={option.onPress}>
                        <Icon
                            name={option.icon}
                            size={22}
                            color={option.color}
                            style={styles.icon}
                        />
                        <Text style={styles.buttonText}>{option.title}</Text>
                    </TouchableOpacity>
                    <View style={styles.separator} />
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    profileContainer: {
        alignItems: "center",
        marginBottom: 120,
    },
    userName: {
        fontSize: 20,
    },
    iconContainer: {
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        paddingVertical: 15,
        paddingHorizontal: 30,
        width: "100%",
        alignItems: "center",
        borderBottomColor: "#ccc",
        flexDirection: "row",
        alignItems: "center",
    },
    icon: {
        marginRight: 10,
    },
    buttonText: {
        color: "#333",
        fontSize: 18,
    },
    separator: {
        height: 0.5,
        backgroundColor: "#ccc",
        marginVertical: 1,
        width: "70%",
        alignSelf: "center",
    },
});
