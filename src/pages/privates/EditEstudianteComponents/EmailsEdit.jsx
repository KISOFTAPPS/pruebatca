import { useForm } from "react-hook-form";
import { useEmail } from "../../../hooks/useEmails";

const EmailsEdit = ({ email = {}, index = 0, emailId = "" }) => {
    // Importamos funciones y hooks necesarios para trabajar con correos electrónicos
    const { updateEmail, deleteEmail } = useEmail();

    // Configuramos la función para actualizar un correo electrónico
    const { mutate, isPending } = updateEmail(emailId);

    // Configuramos la función para eliminar un correo electrónico
    const { mutate: mutateDelEmail, isPending: isPendingDelEmail } =
        deleteEmail(emailId);

    // Obtenemos los valores del correo electrónico
    const values = email;

    // Configuramos los registros y validación de formulario para el correo electrónico
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ values });

    // Función para enviar el formulario de actualización de correo electrónico
    const onSubmit = handleSubmit((data) => {
        mutate(data);
    });

    // Función para eliminar el correo electrónico
    const onDeleteEmail = () => {
        mutateDelEmail();
    };

    return (
        <tr>
            <form
                method="GET"
                id={`email_form_${emailId}`}
                onSubmit={onSubmit}
            />
            <th>{index + 1}</th>
            <th>
                <input
                    type="email"
                    disabled
                    value={email.email}
                    className={`input input-bordered input-xs`}
                />
            </th>
            <th>
                <select
                    type="text"
                    className={`input input-bordered input-xs ${
                        errors.email_type ? "input-error" : ""
                    }`}
                    {...register("email_type", {
                        required: true,
                        pattern: /^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/i,
                    })}
                >
                    <option value={"PERSONAL"}>PERSONAL</option>
                    <option value={"WORK"}>TRABAJO</option>
                    <option value={"OTHER"}>OTRO</option>
                </select>
            </th>

            <th>
                <button
                    className="btn btn-sm btn-success"
                    form={`email_form_${emailId}`}
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
                                .getElementById(`my_modal_${emailId}`)
                                .showModal()
                        }
                    >
                        Eliminar
                    </button>
                    <dialog
                        id={`my_modal_${emailId}`}
                        className="modal modal-bottom sm:modal-middle"
                    >
                        <div className="modal-box">
                            <h3 className="font-bold text-lg text-center">
                                ¡Atención!
                            </h3>
                            <p className="py-4">
                                Estás a punto de eliminar un email de este
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
                                    onClick={onDeleteEmail}
                                    disabled={isPendingDelEmail}
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

export default EmailsEdit;
