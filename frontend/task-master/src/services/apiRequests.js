import api from "./api";
import { Alert } from "react-native";

export const makePostRequest = async (route, data, successmessage) => {

    try {
        const response = await api.post(route, data);
        if (successmessage) {
            Alert.alert("Sucesso", "Ação realizada com sucesso!");

        }

        return response.data;
    } catch (error) {
        console.log("Erro completo:", error);
        console.log("Status:", error.response?.status);
        console.log("Dados do erro:", error.response?.data);
        console.log("Mensagem de erro:", error.message);

        const errorMessage = error.response?.data?.message || "Erro ao realizar a requisição.";
        console.error("Erro:", errorMessage);

        Alert.alert("Erro", errorMessage);

        throw error;
    }

};

export const makeGetRequest = async (route, params = {}) => {
    try {
        const response = await api.get(route, { params });
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Erro ao realizar a requisição.";
        console.error("Erro:", errorMessage);

        Alert.alert("Erro", errorMessage);

        throw error;
    }
};

export const makePutRequest = async (route, data) => {
    try {
        const response = await api.put(route, data);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Erro ao realizar a requisição.";
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