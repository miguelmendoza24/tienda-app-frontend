import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { useNavigate } from "react-router-dom";

function Products() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("")
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


  const handleBuy = async (code) => {
    try {
      const res = await fetch("http://localhost:3000/purchase/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          code,
          quantity: 1,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Error al comprar");
      }

      setMessage("Compra realizada con éxito");

     
      setProductos((prev) =>
        prev.map((p) =>
          p.code === code ? { ...p, stock: p.stock - 1 } : p
        )
      );
    } catch (err) {
      setMessage(` ${err.message}`);
    }
  };

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mt-4">
      <h2>Productos disponibles</h2>
      {message && <div className="alert alert-info">{message}</div>}

      {productos.length === 0 ? (
        <p>No hay productos disponibles.</p>
      ) : (
        <div className="row">
          {productos.map((prod) => (
            <div key={prod._id} className="col-md-4 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{prod.name}</h5>
                  <p className="card-text">Categoría: {prod.category}</p>
                  <p className="card-text">Precio: $ {prod.price}</p>
                  <p className="card-text">Stock: {prod.stock}</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleBuy(prod.code)}
                    disabled={prod.stock < 1}
                  >
                    Comprar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;