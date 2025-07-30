import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

function Layout() {
  const { user, logout } = useAuth();

  return (
    <div className="container mt-4">
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4 p-3 rounded shadow">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">🛒 Tienda App</Link>

          <div className="collapse navbar-collapse justify-content-end">
            {user ? (
              <ul className="navbar-nav">
                <li className="nav-item me-3">
                  <span className="nav-link disabled">{user.email}</span>
                </li>
                <li className="nav-item me-3">
                  <Link className="nav-link" to="/productos">Productos</Link>
                </li>
                <li className="nav-item me-3">
                  <Link className="nav-link" to="/admin">Admin</Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-danger" onClick={logout}>
                    Cerrar sesión
                  </button>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav">
                <li className="nav-item me-3">
                  <Link className="nav-link" to="/login">Iniciar sesión</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Registrarse</Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>

      <Outlet />
    </div>
  );
}

export default Layout;
