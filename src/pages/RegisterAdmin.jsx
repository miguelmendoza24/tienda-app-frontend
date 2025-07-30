import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterAdmin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!name.trim() || !email.trim() || !password.trim()) {
      setErrorMsg("Por favor, completa todos los campos.");
      return;
    }

    if (password.length < 6) {
      setErrorMsg("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/user/register-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMsg("Administrador registrado correctamente.");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setErrorMsg(data.error || data.message || "Error al registrar administrador.");
      }
    } catch (error) {
      setErrorMsg("Error de conexión, intenta más tarde.");
    }
    setLoading(false);
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2>Registrar Administrador</h2>
      <form onSubmit={handleSubmit}>
        {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
        {successMsg && <div className="alert alert-success">{successMsg}</div>}

        <input
          className="form-control mb-3"
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          {loading ? "Registrando..." : "Registrar administrador"}
        </button>
      </form>
    </div>
  );
}

export default RegisterAdmin;
