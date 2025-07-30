import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import { AuthProvider, useAuth } from "./auth/AuthProvider";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import RegisterAdmin from "./pages/RegisterAdmin";
import Products from "./pages/ProductsList";
import AdminPanel from "./pages/AdminPanel";

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Rutas públicas */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="register-admin" element={<RegisterAdmin />} />
        <Route path="products" element={<Products />} />

        {/* Rutas privadas */}
        <Route
          index
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        {/* Ruta admin */}
        <Route
          path="admin"
          element={
            user?.rol === "admin" ? <AdminPanel /> : <Navigate to="/" />
          }
        />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;



