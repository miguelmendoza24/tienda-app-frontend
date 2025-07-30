import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthProvider";

function AdminPanel() {
  const { token } = useAuth();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ code: "", name: "", price: "", stock: "", _id: null });

  const API_URL = "http://localhost:3000/product";

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (!res.ok) {
        const text = await res.text()
        throw new Error(text)
        }
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error al obtener productos", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isEdit = !!form._id

    try {
      const res = await fetch(isEdit ? `${API_URL}/update/${form.code}` : `${API_URL}/register`, {
        method: isEdit ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setForm({ code: "", name: "", price: "", stock: "", _id: null});
        fetchProducts();
      } else {
        const errorData = await res.json();
        console.error("Error en el servidor:", errorData);
      }
    } catch (error) {
      console.error("Error al agregar/actualizar producto", error);
    }
  };

  const handleDelete = async (code) => {
    try {
      const res = await fetch(`${API_URL}/delete/${code}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        const errorData = await res.json();
        console.error("Error del servidor:", errorData);
        return;
      }

      fetchProducts();
    } catch (error) {
      console.error("Error al eliminar producto", error);
    }
  };

  const handleEdit = (p) => {
    setForm({
      code: p.code,
      name: p.name,
      price: p.price,
      stock: p.stock,
      _id: p._id,
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  return (
    <div>
      <h2>Panel de Administrador</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <input
          name="code"
          placeholder="Código de barras"
          value={form.code}
          onChange={handleChange}
          className="form-control mb-2"
        />

        <input
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
          className="form-control mb-2"
        />
        <input
          name="price"
          placeholder="Precio"
          value={form.price}
          onChange={handleChange}
          className="form-control mb-2"
        />
        <input
          name="stock"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          className="form-control mb-2"
        />
        <button className="btn btn-primary">{form._id ? "Actualizar producto" : "Agregar producto"}</button>
      </form>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>{p.code}</td>
              <td>{p.name}</td>
              <td>${p.price}</td>
              <td>{p.stock}</td>
              <td>
                <button onClick={() => handleEdit(p)} className="btn btn-warning btn-sm me-2">
                  Editar
                </button>
                <button onClick={() => handleDelete(p.code)} className="btn btn-danger btn-sm">
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPanel;
