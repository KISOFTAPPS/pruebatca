// Importa el módulo axios y la función getEnvVariables desde "../helpers"
import axios from "axios";
import { getEnvVariables } from "../helpers";

// Obtiene los valores de las variables de entorno
const [VITE_API_URL_PRUEBAS] = getEnvVariables();

// Crea una instancia de axios llamada sorteoApi con la URL base de VITE_API_URL_PRUEBAS y withCredentials configurado en true para enviar y recibir cookies
const pruebaApi = axios.create({
    baseURL: VITE_API_URL_PRUEBAS,
    withCredentials: true,
});


export default pruebaApi;
