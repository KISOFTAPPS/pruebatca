import { useForm } from "react-hook-form";
import { useTelefono } from "../../../hooks/useTelefono";

const TelefonoEdit = ({ telefono = {}, index = 0, telefonoId = 0 }) => {
    // Importamos funciones y hooks necesarios para trabajar con números de teléfono
    const { updateTelefono, deleteTelefono } = useTelefono();

    // Configuramos la función para actualizar un número de teléfono
    const { mutate, isPending } = updateTelefono(telefonoId);

    // Configuramos la función para eliminar un número de teléfono
    const { mutate: mutateDelTelefono, isPending: isPendingDelTelefono } =
        deleteTelefono(telefonoId);

    // Obtenemos los valores del número de teléfono
    const values = telefono;

    // Configuramos los registros y validación de formulario para el número de teléfono
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ values });

    // Función para enviar el formulario de actualización de número de teléfono
    const onSubmit = handleSubmit((data) => {
        mutate(data);
    });

    // Función para eliminar el número de teléfono
    const onDeleteTelefono = () => {
        mutateDelTelefono();
    };

    return (
        <tr>
            <form
                method="GET"
                id={`telefono_form_${telefonoId}`}
                onSubmit={onSubmit}
            />
            <th>{index + 1}</th>
            <th>
                <input
                    type="tel"
                    minLength={7}
                    maxLength={7}
                    className={`input input-bordered input-xs ${
                        errors.phone ? "input-error" : ""
                    }`}
                    {...register("phone", {
                        required: true,
                        minLength: 7,
                        maxLength: 7,
                        pattern: /^[0-9]+$/,
                    })}
                />
            </th>
            <th>
                <select
                    className={`select select-bordered select-xs ${
                        errors.phone_type ? "input-error" : ""
                    }`}
                    {...register("phone_type", {
                        required: true,
                        maxLength: 10,
                    })}
                >
                    <option value="Mobile">Movil</option>
                    <option value="Home">Casa</option>
                    <option value="Work">Trabajo</option>
                    <option value="Other">Otro</option>
                </select>
            </th>
            <th>
                <input
                    type="text"
                    minLength={1}
                    maxLength={3}
                    className={`input input-bordered input-xs ${
                        errors.country_code ? "input-error" : ""
                    }`}
                    {...register("country_code", {
                        required: true,
                        minLength: 1,
                        maxLength: 3,
                        pattern: /^[0-9]+$/,
                    })}
                />
            </th>
            <th>
                <input
                    type="text"
                    minLength={1}
                    maxLength={3}
                    className={`input input-bordered input-xs ${
                        errors.area_code ? "input-error" : ""
                    }`}
                    {...register("area_code", {
                        required: true,
                        minLength: 1,
                        maxLength: 3,
                        pattern: /^[0-9]+$/,
                    })}
                />
            </th>
            <th>
                <button
                    className="btn btn-sm btn-success"
                    form={`telefono_form_${telefonoId}`}
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
                                .getElementById(`my_modal_${telefonoId}`)
                                .showModal()
                        }
                    >
                        Eliminar
                    </button>
                    <dialog
                        id={`my_modal_${telefonoId}`}
                        className="modal modal-bottom sm:modal-middle"
                    >
                        <div className="modal-box">
                            <h3 className="font-bold text-lg text-center">
                                ¡Atención!
                            </h3>
                            <p className="py-4">
                                Estás a punto de eliminar un teléfono de este
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
                                    onClick={onDeleteTelefono}
                                    disabled={isPendingDelTelefono}
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

export default TelefonoEdit;
