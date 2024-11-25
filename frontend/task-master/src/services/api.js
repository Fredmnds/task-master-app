import axios from "axios";

const api = axios.create({
    baseURL: "http://192.168.18.2:3000/" // Mudar para o ip do PC que está rodando a api
})

export default api;