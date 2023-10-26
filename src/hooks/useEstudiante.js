import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { pruebaApi } from "../api";
import { useNavigate } from "react-router-dom";

export const useEstudiante = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const axiosPostEstudiante = async (data) => {
        console.log(data);
        return await pruebaApi
            .post(`estudiante`, data)
            .then(({ data }) => data);
    };

    const createEstudiante = () => {
        return useMutation({
            mutationFn: axiosPostEstudiante,
            onSuccess: (data) => {
                toast.success(data.msg);
                // Invalida la caché de la consulta "sorteo" en el queryClient
                queryClient.invalidateQueries({ queryKey: ["estudiantes"] });
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

    const axiosGetEstudiantes = async () => {
        return await pruebaApi.get(`estudiante`).then(({ data }) => data);
    };

    const readEstudiantes = () => {
        return useQuery({
            queryKey: ["estudiantes"],
            queryFn: axiosGetEstudiantes,
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

    const axiosGetEstudianteById = async (id) => {
        try {
            return await pruebaApi
                .get(`estudiante/${id}`)
                .then(({ data }) => data);
        } catch (error) {
            navigate("*");
        }
    };

    const readEstudiante = (id) => {
        return useQuery({
            queryKey: ["estudiantes", id],
            queryFn: () => axiosGetEstudianteById(id),
            throwOnError: true,
            refetchOnWindowFocus: true,
            onError: (error) => {
                navigate("/panel");
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

    const axiosPatchEstudiante = async (id, data) => {
        return await pruebaApi
            .patch(`estudiante/${id}`, data)
            .then(({ data }) => data);
    };

    const updateEstudiante = (id) => {
        return useMutation({
            mutationFn: (data) => axiosPatchEstudiante(id, data),
            onSuccess: (data) => {
                toast.success(data.msg);
                // Invalida la caché de la consulta "sorteo" en el queryClient
                queryClient.invalidateQueries({ queryKey: ["estudiantes"] });
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

    const axiosDeleteEstudiante = async (id) => {
        return await pruebaApi
            .delete(`estudiante/${id}`)
            .then(({ data }) => data);
    };

    const deleteEstudiante = (id) => {
        return useMutation({
            mutationFn: () => axiosDeleteEstudiante(id),
            onSuccess: (data) => {
                toast.success(data.msg);
                // Invalida la caché de la consulta "sorteo" en el queryClient
                queryClient.invalidateQueries({ queryKey: ["estudiantes"] });

                navigate("/panel");
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
        createEstudiante,
        readEstudiantes,
        readEstudiante,
        updateEstudiante,
        deleteEstudiante,
    };
};
