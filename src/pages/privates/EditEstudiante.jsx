import { useEstudiante } from "../../hooks/useEstudiante";
import moment from "moment";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useDireccion } from "../../hooks/useDireccion";
import DireccionesEdit from "./EditEstudianteComponents/DireccionesEdit";
import { useEmail } from "../../hooks/useEmails";
import EmailsEdit from "./EditEstudianteComponents/EmailsEdit";
import { useTelefono } from "../../hooks/useTelefono";
import TelefonoEdit from "./EditEstudianteComponents/TelefonoEdit";

const EditEstudiante = () => {
    // Importa los módulos necesarios y extrae el parámetro 'ide' de las rutas
    let { ide } = useParams();

    // Utiliza el hook useEstudiante para gestionar datos de estudiantes
    const {
        readEstudiantes,
        readEstudiante,
        updateEstudiante,
        deleteEstudiante,
    } = useEstudiante();

    // Lee un estudiante específico utilizando 'ide'
    const {
        data: dataById,
        isLoading: isLoadingById,
        isSuccess: isSuccessById,
    } = readEstudiante(ide);

    // Actualiza un estudiante y gestiona su estado
    const { mutate: mutateUpEstudiante, isPending: isPendingUpEstudiante } =
        updateEstudiante(ide);

    // Elimina un estudiante y gestiona su estado
    const { mutate: mutateDelEstudiante, isPending: isPendingDelEstudiante } =
        deleteEstudiante(ide);

    // Utiliza el hook useDireccion para gestionar datos de direcciones
    const { readDirecciones, createDireccion } = useDireccion();

    // Crea una nueva dirección y gestiona su estado
    const { mutate: mutateCrDireccion, isPending: isPendingCrDireccion } =
        createDireccion(ide);

    // Lee las direcciones asociadas al estudiante específico
    const {
        data: dataDirById,
        isLoading: isLoadingDirById,
        isSuccess: isSuccessDirById,
    } = readDirecciones(ide);

    // Utiliza el hook useEmail para gestionar datos de correos electrónicos
    const { createEmail, readEmails } = useEmail();

    // Crea un nuevo correo electrónico y gestiona su estado
    const { mutate: mutateCrEmail, isPending: isPendingCrEmail } =
        createEmail(ide);

    // Lee los correos electrónicos asociados al estudiante específico
    const {
        data: dataEmaById,
        isLoading: isLoadingEmaById,
        isSuccess: isSuccessEmaById,
    } = readEmails(ide);

    // Utiliza el hook useTelefono para gestionar datos de números de teléfono
    const { readTelefonos, createTelefono } = useTelefono();

    // Crea un nuevo número de teléfono y gestiona su estado
    const { mutate: mutateCrTelefono, isPending: isPendingCrTelefono } =
        createTelefono(ide);

    // Lee los números de teléfono asociados al estudiante específico
    const {
        data: dataTelById,
        isLoading: isLoadingTelById,
        isSuccess: isSuccessTelById,
    } = readTelefonos(ide);

    // Obtiene los datos del estudiante, direcciones, correos electrónicos y teléfonos
    let estudiante = dataById?.estudiante || {};
    let direcciones = dataDirById?.direcciones || [];
    let emails = dataEmaById?.emails || [];
    let telefonos = dataTelById?.telefonos || [];

    // Configura el formulario para editar datos del estudiante
    const values = estudiante;
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ values });

    // Configura el formulario para agregar o editar datos de direcciones
    const {
        register: registerDireccion,
        handleSubmit: handleSubmitDireccion,
        formState: {
            errors: errorsDireccion,
            defaultValues: defaultValuesDireccion,
        },
        setValue: setValueDireccion,
    } = useForm();

    // Configura el formulario para agregar o editar datos de correos electrónicos
    const {
        register: registerEmail,
        handleSubmit: handleSubmitEmail,
        formState: { errors: errorsEmail, defaultValues: defaultValuesEmail },
        setValue: setValueEmail,
    } = useForm();

    // Configura el formulario para agregar o editar datos de números de teléfono
    const {
        register: registerTelefono,
        handleSubmit: handleSubmitTelefono,
        formState: {
            errors: errorsTelefono,
            defaultValues: defaultValuesTelefono,
        },
        setValue: setValueTelefono,
    } = useForm();

    // Define la función que se ejecutará al enviar el formulario de edición del estudiante
    const onSubmitEditEstudiante = handleSubmit((data) => {
        mutateUpEstudiante(data);
    });

    // Define la función que se ejecutará al enviar el formulario de dirección
    const onSubmitDireccion = handleSubmitDireccion((data) => {
        console.log(data);
        mutateCrDireccion(data);
    });

    // Define la función que se ejecutará al enviar el formulario de correo electrónico
    const onSubmitEmail = handleSubmitEmail((data) => {
        mutateCrEmail(data);
    });

    // Define la función que se ejecutará al enviar el formulario de número de teléfono
    const onSubmitTelefono = handleSubmitTelefono((data) => {
        mutateCrTelefono(data);
    });

    // Define la función para eliminar el estudiante
    const onDelete = () => {
        mutateDelEstudiante();
    };
    if (isSuccessById) {
        return (
            <section
                className="hero min-h-screen bg-base-200"
                style={{ backgroundImage: "url(/assets/imgs/BG.png)" }}
            >
                <div className="hero-overlay bg-opacity-60" />
                <div className="hero-content text-center xl:pt-20">
                    <div className="flex flex-col gap-5">
                        <div className="collapse bg-base-200">
                            <input type="radio" name="my-accordion-1" />
                            <div className="collapse-title text-xl font-medium">
                                Estudiante
                            </div>
                            <div className="collapse-content flex justify-center gap-5">
                                <div className="card flex-shrink-0 w-full max-w-xl shadow-2xl bg-base-100">
                                    <form
                                        className="card-body"
                                        onSubmit={onSubmitEditEstudiante}
                                    >
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">
                                                    ID
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                className={`input input-bordered input-xs`}
                                                value={estudiante.student_id}
                                                disabled
                                            />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">
                                                    *Nombre
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                className={`input input-bordered input-xs ${
                                                    errors.first_name
                                                        ? "input-error"
                                                        : ""
                                                }`}
                                                {...register("first_name", {
                                                    required: true,
                                                    maxLength: 50,
                                                    pattern:
                                                        /^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/i,
                                                })}
                                            />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">
                                                    Segundo nombre
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                className={`input input-bordered input-xs ${
                                                    errors.middle_name
                                                        ? "input-error"
                                                        : ""
                                                }`}
                                                {...register("middle_name", {
                                                    required: false,
                                                    maxLength: 50,
                                                    pattern:
                                                        /^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/i,
                                                })}
                                            />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">
                                                    *Apellidos
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                className={`input input-bordered input-xs  ${
                                                    errors.last_name
                                                        ? "input-error"
                                                        : ""
                                                }`}
                                                {...register("last_name", {
                                                    required: true,
                                                    maxLength: 50,
                                                    pattern:
                                                        /^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/i,
                                                })}
                                            />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">
                                                    *Género
                                                </span>
                                            </label>
                                            <select
                                                className={`select select-bordered select-xs ${
                                                    errors.gender
                                                        ? "input-error"
                                                        : ""
                                                }`}
                                                {...register("gender", {
                                                    required: true,
                                                    maxLength: 20,
                                                    pattern:
                                                        /^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]/i,
                                                })}
                                            >
                                                <option value={"MALE"}>
                                                    MASCULINO
                                                </option>
                                                <option value={"FEMALE"}>
                                                    FEMENINO
                                                </option>
                                                <option value={"OTHER"}>
                                                    OTRO
                                                </option>
                                            </select>
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">
                                                    Fecha de registro
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                className="input input-bordered input-xs"
                                                disabled
                                                value={moment(
                                                    estudiante.created_on
                                                ).format("DD/MM/YYYY")}
                                            />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">
                                                    *Activo
                                                </span>
                                            </label>
                                            <select
                                                className={`select select-bordered select-xs ${
                                                    errors.active
                                                        ? "input-error"
                                                        : ""
                                                }`}
                                                {...register("active", {
                                                    required: true,
                                                })}
                                            >
                                                <option
                                                    value={true}
                                                    className="text-green-500"
                                                >
                                                    SI
                                                </option>
                                                <option
                                                    value={false}
                                                    className="text-red-500"
                                                >
                                                    NO
                                                </option>
                                            </select>
                                        </div>
                                        <div className="form-control mt-6">
                                            <button
                                                type="submit"
                                                className="btn btn-primary btn-sm"
                                                disabled={isPendingUpEstudiante}
                                            >
                                                {isPendingUpEstudiante ? (
                                                    <span className="loading loading-spinner loading-xs" />
                                                ) : (
                                                    "Editar"
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="collapse bg-base-200">
                            <input type="radio" name="my-accordion-1" />
                            <div className="collapse-title text-xl font-medium">
                                Dirección
                            </div>
                            <div className="collapse-content flex flex-col xl:flex-row justify-center items-center gap-5">
                                <div className="max-w-md">
                                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                                        <form
                                            className="card-body"
                                            onSubmit={onSubmitDireccion}
                                        >
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">
                                                        *Dirección
                                                    </span>
                                                </label>
                                                <input
                                                    type="text"
                                                    className={`input input-bordered input-xs ${
                                                        errorsDireccion.address_line
                                                            ? "input-error"
                                                            : ""
                                                    }`}
                                                    {...registerDireccion(
                                                        "address_line",
                                                        {
                                                            required: true,
                                                            minLength: 10,
                                                            maxLength: 50,
                                                            pattern:
                                                                /^[ a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/i,
                                                        }
                                                    )}
                                                />
                                            </div>
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">
                                                        *Ciudad
                                                    </span>
                                                </label>
                                                <input
                                                    type="text"
                                                    className={`input input-bordered input-xs ${
                                                        errorsDireccion.city
                                                            ? "input-error"
                                                            : ""
                                                    }`}
                                                    {...registerDireccion(
                                                        "city",
                                                        {
                                                            required: true,
                                                            minLength: 5,
                                                            maxLength: 50,
                                                            pattern:
                                                                /^[ a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/i,
                                                        }
                                                    )}
                                                />
                                            </div>
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">
                                                        *Códigos postal
                                                    </span>
                                                </label>
                                                <input
                                                    type="text"
                                                    minLength={5}
                                                    maxLength={5}
                                                    className={`input input-bordered input-xs ${
                                                        errorsDireccion.zip_postcode
                                                            ? "input-error"
                                                            : ""
                                                    }`}
                                                    {...registerDireccion(
                                                        "zip_postcode",
                                                        {
                                                            required: true,
                                                            minLength: 5,
                                                            maxLength: 5,
                                                            pattern:
                                                                /^[0-9]+$/i,
                                                        }
                                                    )}
                                                />
                                            </div>
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">
                                                        *Estado
                                                    </span>
                                                </label>
                                                <input
                                                    type="text"
                                                    className={`input input-bordered input-xs ${
                                                        errorsDireccion.state
                                                            ? "input-error"
                                                            : ""
                                                    }`}
                                                    {...registerDireccion(
                                                        "state",
                                                        {
                                                            required: true,
                                                            minLength: 5,
                                                            maxLength: 50,
                                                            pattern:
                                                                /^[ a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/i,
                                                        }
                                                    )}
                                                />
                                            </div>
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">
                                                        *Tipo de dirección
                                                    </span>
                                                </label>
                                                <select
                                                    type="text"
                                                    className={`input input-bordered input-xs ${
                                                        errors.address_type
                                                            ? "input-error"
                                                            : ""
                                                    }`}
                                                    {...registerDireccion(
                                                        "address_type",
                                                        {
                                                            required: true,
                                                            pattern:
                                                                /^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/i,
                                                        }
                                                    )}
                                                >
                                                    <option value={"HOME"}>
                                                        CASA
                                                    </option>
                                                    <option value={"WORK"}>
                                                        TRABAJO
                                                    </option>
                                                    <option value={"OTHER"}>
                                                        OTRO
                                                    </option>
                                                </select>
                                            </div>

                                            <div className="form-control mt-6">
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary btn-sm"
                                                >
                                                    Agregar
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                                <div className="h-72 w-[15rem] xl:w-[65rem]  bg-base-100 bg-opacity-80 rounded-xl border-2 overflow-auto">
                                    <table className="table table-xs">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>Dirección</th>
                                                <th>Ciudad</th>
                                                <th>Códigos postal</th>
                                                <th>Estado</th>
                                                <th>Tipo de dirección</th>
                                                <th>Acciones</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {direcciones.map(
                                                (direccion, index) => (
                                                    <DireccionesEdit
                                                        direccion={direccion}
                                                        index={index}
                                                        idd={
                                                            direccion.address_id
                                                        }
                                                    />
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="collapse bg-base-200">
                            <input type="radio" name="my-accordion-1" />
                            <div className="collapse-title text-xl font-medium">
                                Email
                            </div>
                            <div className="collapse-content flex flex-col xl:flex-row justify-center items-center gap-5">
                                <div className="max-w-md">
                                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                                        <form
                                            className="card-body"
                                            onSubmit={onSubmitEmail}
                                        >
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">
                                                        *Email
                                                    </span>
                                                </label>
                                                <input
                                                    type="email"
                                                    className={`input input-bordered input-xs  ${
                                                        errorsEmail.email
                                                            ? "input-error"
                                                            : ""
                                                    }`}
                                                    {...registerEmail("email", {
                                                        required: true,
                                                        minLength: 5,
                                                        maxLength: 50,
                                                        pattern:
                                                            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
                                                    })}
                                                />
                                            </div>
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">
                                                        *Tipo de email
                                                    </span>
                                                </label>
                                                <select
                                                    className={`select select-bordered select-xs ${
                                                        errorsEmail.email_type
                                                            ? "input-error"
                                                            : ""
                                                    }`}
                                                    {...registerEmail(
                                                        "email_type",
                                                        {
                                                            required: true,
                                                            maxLength: 20,
                                                        }
                                                    )}
                                                >
                                                    <option value={"PERSONAL"}>
                                                        PERSONAL
                                                    </option>
                                                    <option value={"WORK"}>
                                                        TRABAJO
                                                    </option>
                                                    <option value={"OTHER"}>
                                                        OTRO
                                                    </option>
                                                </select>
                                            </div>
                                            <div className="form-control mt-6">
                                                <button className="btn btn-primary btn-sm">
                                                    Agregar
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="h-72 w-[15rem] xl:w-[35rem] bg-base-100 bg-opacity-80 rounded-xl border-2 overflow-auto">
                                    <table className="table table-xs">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>Email</th>
                                                <th>Tipo de email</th>
                                                <th>Acciones</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {emails.map((email, index) => (
                                                <EmailsEdit
                                                    email={email}
                                                    index={index}
                                                    emailId={email.email}
                                                />
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="collapse bg-base-200">
                            <input type="radio" name="my-accordion-1" />
                            <div className="collapse-title text-xl font-medium">
                                Teléfono
                            </div>
                            <div className="collapse-content flex flex-col xl:flex-row justify-center items-center gap-5">
                                <div className="max-w-md">
                                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                                        <form
                                            className="card-body"
                                            onSubmit={onSubmitTelefono}
                                        >
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">
                                                        *Teléfono
                                                    </span>
                                                </label>
                                                <input
                                                    type="tel"
                                                    minLength={7}
                                                    maxLength={7}
                                                    className={`input input-bordered input-xs  ${
                                                        errorsTelefono.phone
                                                            ? "input-error"
                                                            : ""
                                                    }`}
                                                    {...registerTelefono(
                                                        "phone",
                                                        {
                                                            required: true,
                                                            minLength: 7,
                                                            maxLength: 7,
                                                            pattern: /^[0-9]+$/,
                                                        }
                                                    )}
                                                />
                                            </div>
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">
                                                        *Tipo de teléfono
                                                    </span>
                                                </label>
                                                <select
                                                    className={`select select-bordered select-xs ${
                                                        errorsTelefono.phone_type
                                                            ? "input-error"
                                                            : ""
                                                    }`}
                                                    {...registerTelefono(
                                                        "phone_type",
                                                        {
                                                            required: true,
                                                            maxLength: 10,
                                                        }
                                                    )}
                                                >
                                                    <option value={"MOBILE"}>
                                                        MÓVIL
                                                    </option>
                                                    <option value={"HOME"}>
                                                        CASA
                                                    </option>
                                                    <option value={"WORK"}>
                                                        TRABAJO
                                                    </option>
                                                    <option value={"OTHER"}>
                                                        OTRO
                                                    </option>
                                                </select>
                                            </div>
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">
                                                        *Código de pais
                                                    </span>
                                                </label>
                                                <input
                                                    type="text"
                                                    minLength={1}
                                                    maxLength={3}
                                                    className={`input input-bordered input-xs  ${
                                                        errorsTelefono.country_code
                                                            ? "input-error"
                                                            : ""
                                                    }`}
                                                    {...registerTelefono(
                                                        "country_code",
                                                        {
                                                            required: true,
                                                            minLength: 1,
                                                            maxLength: 3,
                                                            pattern: /^[0-9]+$/,
                                                        }
                                                    )}
                                                />
                                            </div>
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">
                                                        *Código de area
                                                    </span>
                                                </label>
                                                <input
                                                    type="text"
                                                    minLength={1}
                                                    maxLength={3}
                                                    className={`input input-bordered input-xs  ${
                                                        errorsTelefono.area_code
                                                            ? "input-error"
                                                            : ""
                                                    }`}
                                                    {...registerTelefono(
                                                        "area_code",
                                                        {
                                                            required: true,
                                                            minLength: 1,
                                                            maxLength: 3,
                                                            pattern: /^[0-9]+$/,
                                                        }
                                                    )}
                                                />
                                            </div>
                                            <div className="form-control mt-6">
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary btn-sm"
                                                >
                                                    Agregar
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="h-72 w-[15rem]  xl:w-[65rem] bg-base-100 bg-opacity-80 rounded-xl border-2 overflow-auto">
                                    <table className="table table-xs">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>Telefono</th>
                                                <th>Tipo de telefono</th>
                                                <th>Código de pais</th>
                                                <th>Código de area</th>
                                                <th>Acciones</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {telefonos.map(
                                                (telefono, index) => (
                                                    <TelefonoEdit
                                                        telefono={telefono}
                                                        index={index}
                                                        telefonoId={
                                                            telefono.phone_id
                                                        }
                                                    />
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div>
                            <button
                                className="btn btn-sm btn-error"
                                onClick={() =>
                                    document
                                        .getElementById("my_modal_5")
                                        .showModal()
                                }
                            >
                                Eliminar estudiante permanentemente
                            </button>
                            <dialog
                                id="my_modal_5"
                                className="modal modal-bottom sm:modal-middle"
                            >
                                <div className="modal-box">
                                    <h3 className="font-bold text-lg">
                                        ¡Atención!
                                    </h3>
                                    <p className="py-4">
                                        Estás a punto de eliminar a un
                                        estudiante de forma permanente de
                                        nuestros registros. Esta acción no se
                                        puede deshacer y toda la información
                                        asociada a este estudiante se perderá
                                        definitivamente. Por favor, asegúrate de
                                        que esta es la acción que deseas tomar
                                        antes de continuar.
                                    </p>
                                    <div className="modal-action flex justify-center">
                                        <button
                                            className="btn btn-error"
                                            onClick={onDelete}
                                        >
                                            {isPendingDelEstudiante ? (
                                                <span className="loading loading-spinner loading-xs" />
                                            ) : (
                                                "Eliminar"
                                            )}
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
                    </div>
                </div>
            </section>
        );
    } else {
        return (
            <section className="hero min-h-screen bg-base-200">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <span className="loading loading-spinner loading-lg" />
                    </div>
                </div>
            </section>
        );
    }
};

export default EditEstudiante;
