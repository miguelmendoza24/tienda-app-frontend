import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { createProduct, getProducts, updateProduct } from "../apiConnection/productsApi";



function AdminPanel() {
  const { token } = useAuth();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ code: "", name: "", price: "", stock: "", _id: null });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isEdit = !!form._id

    try {
      const res = isEdit ? await updateProduct(token, form.code, form) : await createProduct(token, form)

      if (!res.error) {
        setForm({ code: "", name: "", price: "", stock: "", _id: null});
        const data = await getProducts(token);
        setProducts(data);
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

      const data = await getProducts(token);
      setProducts(data);
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

  const firstLoad = async () => {
    const data = await getProducts(token);
    setProducts(data);
  }
  useEffect(() => {
    firstLoad();
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
