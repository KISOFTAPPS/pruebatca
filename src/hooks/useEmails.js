import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { pruebaApi } from "../api";
import { useNavigate } from "react-router-dom";

export const useEmail = () => {
    const queryClient = useQueryClient();

    // CREATE ///////////////////////////////////////////////////////
    const axiosPostEmail = async (id, data) => {
        console.log(data);
        return await pruebaApi
            .post(`estudiante/${id}/email`, data)
            .then(({ data }) => data);
    };

    const createEmail = (id) => {
        return useMutation({
            mutationFn: (data) => axiosPostEmail(id, data),
            onSuccess: (data) => {
                toast.success(data.msg);
                // Invalida la caché de la consulta "sorteo" en el queryClient
                queryClient.invalidateQueries({ queryKey: ["emails"] });
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
    const axiosGetEmailsById = async (id) => {
        return await pruebaApi
            .get(`estudiante/${id}/email`)
            .then(({ data }) => data);
    };

    const readEmails = (id) => {
        return useQuery({
            queryKey: ["emails", id],
            queryFn: () => axiosGetEmailsById(id),
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
    const axiosPatchEmail = async (id, data) => {
        return await pruebaApi
            .patch(`estudiante/${id}/email`, data)
            .then(({ data }) => data);
    };

    const updateEmail = (id) => {
        return useMutation({
            mutationFn: (data) => axiosPatchEmail(id, data),
            onSuccess: (data) => {
                toast.success(data.msg);
                // Invalida la caché de la consulta "sorteo" en el queryClient
                queryClient.invalidateQueries({ queryKey: ["emails"] });
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
    const axiosDeleteEmail = async (id) => {
        return await pruebaApi
            .delete(`estudiante/${id}/email`)
            .then(({ data }) => data);
    };

    const deleteEmail = (id) => {
        return useMutation({
            mutationFn: () => axiosDeleteEmail(id),
            onSuccess: (data) => {
                toast.success(data.msg);
                // Invalida la caché de la consulta "sorteo" en el queryClient
                queryClient.invalidateQueries({ queryKey: ["emails"] });

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
        createEmail,
        readEmails,
        updateEmail,
        deleteEmail
    };
};
