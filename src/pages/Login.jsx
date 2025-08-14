import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { userLogin } from "../apiConnection/usersApi";
import { jwtDecode } from "jwt-decode";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  
    const { login} = useAuth();
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
    e.preventDefault();
      setErrorMsg("");
      setSuccessMsg("");

      if (!email.trim() || !password.trim()) {
        setErrorMsg("Por favor, completa todos los campos")
        setLoading(false);
      return;
    }
      setLoading(true);

      try {
        const { token } = await userLogin({ email, password });
        const decoded = jwtDecode(token);
        login(token);

        setSuccessMsg("Inicio de sesión exitoso. Redirigiendo...");

        setLoading(false);
        setTimeout(() => {
          if (decoded.role === 'admin') {
            navigate('/admin');
          } else if (decoded.role === 'customer') {
            navigate('/home');
          } else {
            navigate('/');
          }
        }, 2000);

      } catch (error) {
        setErrorMsg(error, message || "Error al iniciar sesión");
        setLoading(false);
      } 
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

        <p className="mt-2 text-center">
          ¿No tienes cuenta?{" "}
          <Link to="/register" className="text-primary">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;