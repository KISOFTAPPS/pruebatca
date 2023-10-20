import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { pruebaApi } from "../api";
import { useNavigate } from "react-router-dom";


export const useTelefono = () => {
    const queryClient = useQueryClient();

    // CREATE ///////////////////////////////////////////////////////
    const axiosPostTelefono = async (id, data) => {
        return await pruebaApi
            .post(`estudiante/${id}/phone`, data)
            .then(({ data }) => data);
    };

    const createTelefono = (id) => {
        return useMutation({
            mutationFn: (data) => axiosPostTelefono(id, data),
            onSuccess: (data) => {
                toast.success(data.msg);
                // Invalida la caché de la consulta "sorteo" en el queryClient
                queryClient.invalidateQueries({ queryKey: ["telefonos"] });
            },
            onError: (error) => {
                // Imprime el mensaje de error en la consola
                console.error("Error:", error.response.data.errors);

                // Muestra mensajes de error utilizando la librería de notificaciones (toast)
                error.response.data.errors
                    ? error.response.data.errors.map(({ msg, param }) =>
                          toast.error(`${param}: ${msg}`)
                      )
                    : toast.error(error.response.data.msg);
            },
        });
    };

    // READ ///////////////////////////////////////////////////////
    const axiosGetTelefonosById = async (id) => {
        return await pruebaApi
            .get(`estudiante/${id}/phone`)
            .then(({ data }) => data);
    };

    const readTelefonos = (id) => {
        return useQuery({
            queryKey: ["telefonos", id],
            queryFn: () => axiosGetTelefonosById(id),
            throwOnError: true,
            refetchOnWindowFocus: true,
            onError: (error) => {
                // Imprime el mensaje de error en la consola
                console.error(
                    "Error al obtener el sorteo:",
                    error.response.data.errors
                );

                // Muestra mensajes de error utilizando la librería de notificaciones (toast)
                error.response.data.errors
                    ? error.response.data.errors.map(({ msg, param }) =>
                          toast.error(`${param}: ${msg}`)
                      )
                    : toast.error(error.response.data.msg);
            },
        });
    };

    // UPDATE ///////////////////////////////////////////////////////
    const axiosPatchTelefono = async (id, data) => {
        return await pruebaApi
            .patch(`estudiante/${id}/phone`, data)
            .then(({ data }) => data);
    };

    const updateTelefono = (id) => {
        return useMutation({
            mutationFn: (data) => axiosPatchTelefono(id, data),
            onSuccess: (data) => {
                toast.success(data.msg);
                // Invalida la caché de la consulta "sorteo" en el queryClient
                queryClient.invalidateQueries({ queryKey: ["telefonos"] });
            },
            onError: (error) => {
                // Imprime el mensaje de error en la consola
                console.error("Error:", error.response.data.errors);

                // Muestra mensajes de error utilizando la librería de notificaciones (toast)
                error.response.data.errors
                    ? error.response.data.errors.map(({ msg, param }) =>
                          toast.error(`${param}: ${msg}`)
                      )
                    : toast.error(error.response.data.msg);
            },
        });
    };

    // DELETE ///////////////////////////////////////////////////////
    const axiosDeleteTelefono = async (id) => {
        return await pruebaApi
            .delete(`estudiante/${id}/phone`)
            .then(({ data }) => data);
    };

    const deleteTelefono = (id) => {
        return useMutation({
            mutationFn: () => axiosDeleteTelefono(id),
            onSuccess: (data) => {
                toast.success(data.msg);
                // Invalida la caché de la consulta "sorteo" en el queryClient
                queryClient.invalidateQueries({ queryKey: ["telefonos"] });
            },
            onError: (error) => {
                // Imprime el mensaje de error en la consola
                console.error("Error:", error.response.data.errors);

                // Muestra mensajes de error utilizando la librería de notificaciones (toast)
                error.response.data.errors
                    ? error.response.data.errors.map(({ msg, param }) =>
                          toast.error(`${param}: ${msg}`)
                      )
                    : toast.error(error.response.data.msg);
            },
        });
    };

    return {
        createTelefono,
        readTelefonos,
        updateTelefono,
        deleteTelefono,
    };
};
