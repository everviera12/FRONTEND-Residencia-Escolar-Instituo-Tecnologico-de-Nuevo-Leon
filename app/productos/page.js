"use client";

import { Grid } from "gridjs-react";
import { _ } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";
import { handleSubmit } from "@/fetching/fetchProductos";
import { useState } from "react";
import ProductsForm from "@/components/Forms/ProductsForm";
import ActionsTable from "@/components/ActionsTable";
import Loader from "@/components/Loader";

export default function ProductosPage() {
  const [modal, setModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleDelete = async () => {
    if (!selectedProduct) return;

    const confirmDelete = window.confirm(
      `¿Estás seguro de que quieres eliminar el producto ${selectedProduct.nombre}?`
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:3000/productos/producto/${selectedProduct.id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        alert("Producto eliminado con éxito");
        window.location.reload();
      } else {
        const errorData = await response.json();
        alert(`Error al eliminar el producto: ${errorData.message}`);
      }
    } catch (error) {
      alert("Error al eliminar el producto: " + error.message);
    }
  };

  return (
    <div className="grid px-10 gap-5 py-16">
      <h1 className="text-yellow-400 font-bold text-4xl">Tabla de Productos</h1>

      {modal && (
        <ProductsForm handleSubmit={handleSubmit} setModal={setModal} />
      )}

      {loading && <Loader />}

      <div>
        <Grid
          server={{
            url: "http://localhost:3000/productos",
            handle: async (res) => {
              setLoading(false);
              if (res.status === 404) return await { data: [] };
              if (res.ok) return await res.json();

              throw new Error("oh no :(");
            },
            then: (data) =>
              data.map((producto) => [
                producto.nombre,
                producto.descripcion,
                parseFloat(producto.precio).toLocaleString("es-MX", {
                  style: "currency",
                  currency: "MXN",
                }),
                producto.stock,
                _(
                  <ActionsTable
                    setModal={setModal}
                    handleDelete={handleDelete}
                    producto={producto}
                    setSelectedProduct={setSelectedProduct}
                  />
                ),
              ]),
          }}
          columns={["Nombre", "Descripción", "Precio", "Stock", "Acciones"]}
          search={true}
          sort={true}
          pagination={{
            limit: 6,
          }}
        />
      </div>
    </div>
  );
}
