import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import "../styles/layout.css"

function Layout() {
  const { user, logout } = useAuth();

  return (
    <div className="container mt-4">
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4 p-3 rounded shadow">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">🛒 Tienda "Doña pelos"</Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav d-flex flex-wrap gap-2 align-items-center">
              {user ? (
                <>
                  <li className="nav-item">
                    <span className="nav-link disabled">{user.email}</span>
                  </li>
                  <li className="nav-item">
                    <Link className="btn btn-outline-primary custom-btn" to="/products">
                      Productos
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="btn btn-outline-warning custom-btn" to="/admin">
                      Admin
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-danger custom-btn" onClick={logout}>
                      Cerrar sesión
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="btn btn-success custom-btn" to="/login">
                      Iniciar sesión
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="btn btn-primary custom-btn" to="/register">
                      Registrarse
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <Outlet />
    </div>
  );
}

export default Layout;
