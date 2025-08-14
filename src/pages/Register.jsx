import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUser } from "../apiConnection/usersApi";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setNombre] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();


  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");


    if (!name.trim() || !email.trim() || !password.trim()) {
      setErrorMsg("Por favor, completa todos los campos.")
      return
    }
    if (!validateEmail(email)) {
      setErrorMsg("Por favor, ingresa un correo válido.");
      return;
    }

    if (password.length < 6) {
      setErrorMsg("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    setLoading(true);

    try {
      const data = await createUser({name, email, password})
      if (!data.error) {
        setSuccessMsg("Registro exitoso. Serás redirigido...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        alert(data.error || data.message || "Error al registrarse");
      }
    } catch (error) {
      setErrorMsg("Error de conexion, intenta mas tarde.")
      console.log(error);
      
    }
    setLoading(false)
    
  };

  return (
    <div className="d-flex justify-content-center align-items-center">

      {loading && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-white bg-opacity-75">
          <div className="spinner-border text-primary">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      )}
      <div className="card p-4">
        <h4 className="mb-3 text-center">Registro</h4>
        <form onSubmit={handleSubmit}>
          {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
          {successMsg && <div className="alert alert-success">{successMsg}</div>}

          <input
            className="form-control mb-3"
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setNombre(e.target.value)}
            autoFocus
          />
          <input
            className="form-control mb-3"
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="form-control mb-3"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn btn-primary w-100" type="submit" disabled={loading}>
            {loading ? "Registrando..." : "Registrarse"}
          </button>
        </form>

        <p className="mt-2 text-center">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="text-primary">
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </div>
  );
 
}

export default Register;
