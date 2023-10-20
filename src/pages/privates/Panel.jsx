import { useNavigate } from "react-router-dom";
import { useEstudiante } from "../../hooks/useEstudiante";
import moment from "moment";
import { useForm } from "react-hook-form";

const Panel = () => {
    // Importamos la función de navegación
    let navigate = useNavigate();

    // Importamos funciones y hooks necesarios para trabajar con estudiantes
    const { readEstudiantes, createEstudiante } = useEstudiante();

    // Obtenemos la lista de estudiantes
    const { data, isLoading, isSuccess } = readEstudiantes();

    // Configuramos la función para crear un nuevo estudiante
    const { mutate, isPending } = createEstudiante();

    // Configuramos registros y validación de formulario para los datos del estudiante
    const {
        register,
        handleSubmit,
        formState: { errors, defaultValues },
        setValue,
    } = useForm();

    // Función para enviar el formulario de creación de estudiante
    const onSubmitEstudiante = handleSubmit((data) => {
        console.log(data); // Imprimir los datos del estudiante (puedes eliminar esta línea)
        mutate(data);
    });

    // Función para navegar a la página de edición de estudiante
    const handleGoTo = (student_id) => {
        navigate(`/editestudiante/${student_id}`);
    };
    return (
        <section
            className="hero min-h-screen bg-base-200"
            style={{ backgroundImage: "url(/assets/imgs/BG.png)" }}
        >
            <div className="hero-overlay bg-opacity-60" />
            <div className="hero-content text-center">
                <div className="flex flex-col xl:flex-row justify-center items-center gap-5">
                    <div className="max-w-md">
                        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                            <form
                                className="card-body"
                                onSubmit={onSubmitEstudiante}
                            >
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
                                            *Genero
                                        </span>
                                    </label>
                                    <select
                                        className={`select select-bordered select-xs ${
                                            errors.gender ? "input-error" : ""
                                        }`}
                                        {...register("gender", {
                                            required: true,
                                            maxLength: 20,
                                            pattern: /^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]/i,
                                        })}
                                    >
                                        <option value={"Male"}>
                                            Masculino
                                        </option>
                                        <option value={"Female"}>
                                            Femenino
                                        </option>
                                        <option value={"Other"}>Otro</option>
                                    </select>
                                </div>

                                <div className="form-control mt-6">
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-sm"
                                    >
                                        Registrar estudiante
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="h-72 w-[15rem] xl:w-[45rem] bg-base-100 bg-opacity-80 rounded-xl border-2 overflow-auto">
                        {isLoading ? (
                            <div className=" h-full w-full flex items-center justify-center">
                                <span className="loading loading-spinner loading-lg" />
                            </div>
                        ) : (
                            <table className="table table-xs">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>ID</th>
                                        <th>Primer nombre</th>
                                        <th>Segundo nombre</th>
                                        <th>Apellido</th>
                                        <th>Genero</th>
                                        <th>Registro</th>
                                        <th>Activo</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.estudiantes.map(
                                        (
                                            {
                                                created_on,
                                                first_name,
                                                gender,
                                                last_name,
                                                middle_name,
                                                student_id,
                                                active,
                                            },
                                            index
                                        ) => (
                                            <tr>
                                                <th>{index + 1}</th>
                                                <th>{student_id}</th>
                                                <td>{first_name}</td>
                                                <td>{middle_name}</td>
                                                <td>{last_name}</td>
                                                <td>{gender}</td>
                                                <td>
                                                    {moment(created_on).format(
                                                        "DD/MM/YYYY"
                                                    )}
                                                </td>
                                                <td className="font-extrabold">
                                                    {active ? (
                                                        <p className="text-green-500">
                                                            Si
                                                        </p>
                                                    ) : (
                                                        <p className="text-red-500">
                                                            No
                                                        </p>
                                                    )}
                                                </td>
                                                <td className="font-extrabold">
                                                    <button
                                                        className="btn btn-sm"
                                                        onClick={() =>
                                                            handleGoTo(
                                                                student_id
                                                            )
                                                        }
                                                    >
                                                        INFO/EDIT
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Panel;
