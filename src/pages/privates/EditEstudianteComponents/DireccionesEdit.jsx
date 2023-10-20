import { useForm } from "react-hook-form";
import { useDireccion } from "../../../hooks/useDireccion";

const DireccionesEdit = ({ direccion = {}, index = 0, idd = 0 }) => {
    // Importamos funciones y hooks necesarios para trabajar con direcciones
    const { updateDireccion, deleteDireccion } = useDireccion();

    // Configuramos la función para actualizar una dirección
    const { mutate, isPending } = updateDireccion(idd);

    // Configuramos la función para eliminar una dirección
    const { mutate: mutateDelDireccion, isPending: isPendingDelDireccion } =
        deleteDireccion(idd);

    // Obtenemos los valores de la dirección
    const values = direccion;

    // Configuramos los registros y validación de formulario para la dirección
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ values });

    // Función para enviar el formulario de actualización de dirección
    const onSubmit = handleSubmit((data) => {
        mutate(data);
    });

    // Función para eliminar la dirección
    const onDeleteDireccion = () => {
        mutateDelDireccion();
    };

    return (
        <tr>
            <form
                method="GET"
                id={`direccion_form_${direccion.address_id}`}
                onSubmit={onSubmit}
            />
            <th>{index + 1}</th>
            <th>
                <input
                    type="text"
                    className={`input input-bordered input-xs ${
                        errors.address_line ? "input-error" : ""
                    }`}
                    {...register("address_line", {
                        required: true,
                        minLength: 10,
                        maxLength: 50,
                        pattern: /^[ a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/i,
                    })}
                />
            </th>
            <th>
                <input
                    type="text"
                    className={`input input-bordered input-xs ${
                        errors.city ? "input-error" : ""
                    }`}
                    {...register("city", {
                        required: true,
                        minLength: 5,
                        maxLength: 50,
                        pattern: /^[ a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/i,
                    })}
                />
            </th>
            <th>
                <input
                    type="text"
                    minLength={5}
                    maxLength={5}
                    className={`input input-bordered input-xs ${
                        errors.zip_postcode ? "input-error" : ""
                    }`}
                    {...register("zip_postcode", {
                        required: true,
                        minLength: 5,
                        maxLength: 5,
                        pattern: /^[0-9]+$/i,
                    })}
                />
            </th>
            <th>
                <input
                    type="text"
                    className={`input input-bordered input-xs ${
                        errors.state ? "input-error" : ""
                    }`}
                    {...register("state", {
                        required: true,
                        minLength: 5,
                        maxLength: 50,
                        pattern: /^[ a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/i,
                    })}
                />
            </th>
            <th>
                <button
                    className="btn btn-sm btn-success"
                    form={`direccion_form_${direccion.address_id}`}
                    disabled={isPending}
                >
                    {!isPending ? (
                        "Editar"
                    ) : (
                        <span className="loading loading-spinner loading-xs" />
                    )}
                </button>
            </th>
            <th>
                <div>
                    <button
                        className="btn btn-sm btn-error"
                        onClick={() =>
                            document
                                .getElementById(`my_modal_${direccion.idd}`)
                                .showModal()
                        }
                    >
                        Eliminar
                    </button>
                    <dialog
                        id={`my_modal_${direccion.idd}`}
                        className="modal modal-bottom sm:modal-middle"
                    >
                        <div className="modal-box">
                            <h3 className="font-bold text-lg text-center">
                                ¡Atención!
                            </h3>
                            <p className="py-4">
                                Estás a punto de eliminar una direccion de este
                                estudiante de forma permanente de nuestros
                                registros. Esta acción no se puede deshacer y
                                toda la información asociada se perderá
                                definitivamente. Por favor, asegúrate de que
                                esta es la acción que deseas tomar antes de
                                continuar.
                            </p>
                            <div className="modal-action flex justify-center">
                                <button
                                    className="btn btn-error"
                                    onClick={onDeleteDireccion}
                                    disabled={isPendingDelDireccion}
                                >
                                    Eliminar
                                </button>
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn btn-success">
                                        No
                                    </button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                </div>
            </th>
        </tr>
    );
};

export default DireccionesEdit;
