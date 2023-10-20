export const getEnvVariables = () => {
    const VITE_API_URL_PRUEBAS = import.meta.env.VITE_API_URL_PRUEBAS;

    return [VITE_API_URL_PRUEBAS ];
};
