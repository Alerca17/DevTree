import { Link } from "react-router-dom";

export default function RegisterView(){
    return(
           <>
            <h1 className="text-4xl text-white font-bold">Crear Cuenta</h1>
            <nav className="mt-10">
                <Link className="text-center text-white text-lg block"
                 to="/auth/login">
                    ¿Ya tienes cuenta? Inicia sesion aqui   
                </Link>
            </nav>
        </>
    )
}