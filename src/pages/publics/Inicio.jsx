import { useNavigate } from "react-router-dom";

const inicio = () => {
    const navigate = useNavigate()

    const handlePanel = ()=>{
        navigate("panel")
    }
   
    return (
        <section className="hero min-h-screen bg-base-200" style={{backgroundImage: 'url(/assets/imgs/BG.png)'}}>
        <div className="hero-overlay bg-opacity-60"/>
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img
                    src="/assets/imgs/logoTCA.png"
                    className="max-w-xs rounded-full opacity-90 drop-shadow"
                />
                <div className="text-white">
                    <h1 className="text-5xl font-bold">Karim I. Sabag Ochoa</h1>
                    <p className="py-6">
                        Presento como prueba una aplicación CRUD
                        personalizada para TCA. Esta herramienta
                        automatiza las tareas de Crear, Leer, Actualizar y
                        Eliminar datos, mejorando la eficiencia y precisión en
                        la gestión de información.
                    </p>
                    <button className="btn btn-primary m-1" onClick={handlePanel}>Panel</button>
                    
                </div>
            </div>
        </section>
    );
};

export default inicio;
