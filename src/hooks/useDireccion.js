import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { pruebaApi } from "../api";
import { useNavigate } from "react-router-dom";

export const useDireccion = () => {
    const queryClient = useQueryClient();

    // CREATE ///////////////////////////////////////////////////////
    const axiosPostDireccion = async (id, data) => {
        console.log(data);
        return await pruebaApi
            .post(`estudiante/${id}/address`, data)
            .then(({ data }) => data);
    };

    const createDireccion = (id) => {
        return useMutation({
            mutationFn: (data) => axiosPostDireccion(id, data),
            onSuccess: (data) => {
                toast.success(data.msg);
                // Invalida la caché de la consulta "sorteo" en el queryClient
                queryClient.invalidateQueries({ queryKey: ["direcciones"] });
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
    const axiosGetDireccionesById = async (id) => {
        return await pruebaApi
            .get(`estudiante/${id}/address`)
            .then(({ data }) => data);
    };

    const readDirecciones = (id) => {
        return useQuery({
            queryKey: ["direcciones", id],
            queryFn: () => axiosGetDireccionesById(id),
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
    const axiosPatchDireccion = async (id, data) => {
        return await pruebaApi
            .patch(`estudiante/${id}/address`, data)
            .then(({ data }) => data);
    };

    const updateDireccion = (id) => {
        return useMutation({
            mutationFn: (data) => axiosPatchDireccion(id, data),
            onSuccess: (data) => {
                toast.success(data.msg);
                // Invalida la caché de la consulta "sorteo" en el queryClient
                queryClient.invalidateQueries({ queryKey: ["direcciones"] });
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
    const axiosDeleteDireccion = async (id) => {
        return await pruebaApi
            .delete(`estudiante/${id}/address`)
            .then(({ data }) => data);
    };

    const deleteDireccion = (id) => {
        return useMutation({
            mutationFn: () => axiosDeleteDireccion(id),
            onSuccess: (data) => {
                toast.success(data.msg);
                // Invalida la caché de la consulta "sorteo" en el queryClient
                queryClient.invalidateQueries({ queryKey: ["direcciones"] });

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
        createDireccion,
        readDirecciones,
        updateDireccion,
        deleteDireccion,
        
    };
};
