import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { userLogin } from "../apiConnection/usersApi";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false)
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!email.trim() || !password.trim()) {
      setErrorMsg("Por favor, completa todos los campos")
      return;
    }
    
    setLoading(true);

    try {
      const data =  await userLogin({ email, password });
      console.log(data);
      
      if (!data.error) {
        console.log("mamo");
        setSuccessMsg("Inicio de sesión exitoso. Redirigiendo...");
        login(data.token);
        setTimeout(() => navigate("/"), 1500);
      } else {
        setErrorMsg(data.error || data.message || "Error al iniciar sesion")
        console.log("valio verde");
      }
    } catch (error) {
      setErrorMsg("Error de conexión, intenta más tarde.");
    }
    setLoading(false)
  };


  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div className="card p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h4 className="mb-3 text-center">Iniciar sesión</h4>
        <form onSubmit={handleSubmit}>
          {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
          {successMsg && <div className="alert alert-success">{successMsg}</div>}
          <div className="mb-3">
            <label>Email:</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>Contraseña:</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Ingresando..." : "Iniciar sesión"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
