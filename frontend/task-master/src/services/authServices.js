import api from "./api";
import { Alert } from "react-native";

export const authenticateUser = async (data) => {

    try {
        const response = await api.post("auth/login", data);
        return response.data;
    } catch (error) {
        console.log("Erro completo:", error);
        console.log("Status:", error.response?.status);
        console.log("Dados do erro:", error.response?.data);
        console.log("Mensagem de erro:", error.message);

        const errorMessage = error.response?.data?.message || "Erro ao realizar o login.";
        console.error("Erro:", errorMessage);

        Alert.alert("Erro", errorMessage);

        throw error;
    }

};

export const deleteAccount = async (route, params = {}) => {

    try {
        const response = await api.delete(route, { params });
        return response.data;
    } catch (error) {
        console.log("Erro completo:", error);
        console.log("Status:", error.response?.status);
        console.log("Dados do erro:", error.response?.data);
        console.log("Mensagem de erro:", error.message);

        const errorMessage = error.response?.data?.message || "Erro ao realizar o login.";
        console.error("Erro:", errorMessage);

        Alert.alert("Erro", errorMessage);

        throw error;
    }

};

export const makeDeleteRequest = async (route, params = {}) => {
    try {
        const response = await api.delete(route, { params });
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Erro ao realizar a requisição.";
        console.error("Erro:", errorMessage);
        Alert.alert("Erro", errorMessage);
        throw error;
    }
};