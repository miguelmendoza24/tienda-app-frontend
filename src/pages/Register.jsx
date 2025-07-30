import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
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


    if (!nombre.trim() || !email.trim() || !password.trim()) {
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
      const response = await fetch("http://localhost:3000/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: nombre, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMsg("Registro exitoso. Serás redirigido...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        alert(data.error || data.message || "Error al registrarse");
      }
    } catch (error) {
      setErrorMsg("Error de conexion, intenta mas tarde.")
    }
    setLoading(false)
    
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
        {successMsg && <div className="alert alert-success">{successMsg}</div>}

        <input
          className="form-control mb-3"
          type="text"
          placeholder="Nombre"
          value={nombre}
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

      <p className="mt-3 text-center">
        ¿Ya tienes cuenta?{" "}
        <Link to="/login" className="text-primary">
          Inicia sesión aquí
        </Link>
      </p>
    </div>
  );
 
}

export default Register;
