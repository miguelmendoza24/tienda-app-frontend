import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../apiConnection/productsApi";
import { buyProduct } from "../apiConnection/purchasesApi";

function Products() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();
  const navigate = useNavigate();


  const handleBuy = async (product) => {
    try {
      await buyProduct(token, product.code, 1);
      alert(`Compra realizada de: ${product.name}`);
      const data = await getProducts(token);
      setProductos(data);
    } catch (err) {
      alert(`Error al comprar: ${err.message}`);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    getProducts(token)
      .then((data) => {
        setProductos(data);
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false)
      });
  }, [token, navigate])

  if (loading) return <p>Cargando productos...</p>
  if (loading) return <p>Error: {error}</p>

  return (
    <div className="row">
      <h2>Productos disponibles</h2>
      {productos.length === 0 ? (
        <p>No hay productos disponibles.</p>
      ) : (
        <ul className="row">
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
                    onClick={() => handleBuy(prod)}
                    disabled={prod.stock <= 0}
                  >
                    {prod.stock > 0 ? "Comprar" : "Sin stock"}
                  </button>
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