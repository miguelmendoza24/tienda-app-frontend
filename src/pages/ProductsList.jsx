import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { useNavigate } from "react-router-dom";

function Products() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:3000/product/list", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          if (res.status === 401 || res.status === 403) {
            navigate("/login");
            return;
          }
          const errorData = await res.json();
          throw new Error(errorData.message || "Error al cargar productos");
        }
        return res.json();
      })
      .then((data) => {
        setProductos(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [token, navigate]);

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="row">
      <h2>Productos disponibles</h2>
      {productos.length === 0 ? (
        <p>No hay productos disponibles.</p>
      ) : (
      <ul>
        {productos.map((prod) => (
          <div key={prod._id} className="col-md-4 mb-3">
            <div className="card h-100">
              <div className="card-body">
            <h5 className="card-title">{prod.name}</h5>
            <p className="card-text">Categoria: {prod.category}</p>
                <p className="card-text">Precio: $ {prod.price}</p>
                <p className="card-text">Stock: {prod.stock}</p>
              </div>
            </div>
          </div>
        ))}
      </ul>
      )}
    </div>
  );
}

export default Products;
