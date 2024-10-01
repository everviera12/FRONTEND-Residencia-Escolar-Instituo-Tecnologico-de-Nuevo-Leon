"use client";

import { Grid } from "gridjs-react";
import { _ } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";
import { useState } from "react";
import ProductsForm from "@/components/Forms/ProductsForm";
import ActionsProducts from "@/components/ActionsTable/ActionsProducts";
import Loader from "@/components/Loader";
import { handleSubmit, updateProduct } from "@/services/fetchProductos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faFile } from "@fortawesome/free-solid-svg-icons";

export default function ProductosPage() {
  const [modal, setModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      nombre: formData.get("nombre"),
      precio: formData.get("precio"),
      stock: formData.get("stock"),
      descripcion: formData.get("descripcion"),
    };

    try {
      if (selectedProduct) {
        await updateProduct(selectedProduct, data);
        alert("Producto actualizado exitosamente");
      } else {
        await handleSubmit(e);
        alert("Producto guardado exitosamente");
      }

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDelete = async () => {
    if (!selectedProduct) return;

    const confirmDelete = window.confirm(
      `¿Estás seguro de que quieres eliminar el producto?`
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
    <div className="grid justify-center px-10 gap-5">
      <div className="flex justify-between items-center">
        <h1 className="text-yellow-400 font-bold text-4xl">Tabla de Productos</h1>
        {/* Botón para AGREGAR producto */}
        <button
          className="text-md bg-green-800 px-5 py-1.5 rounded-md text-white font-semibold hover:text-opacity-40 transition-all"
          onClick={() => {
            setSelectedProduct(null);
            setModal(true);
          }}
        >
          Agregar <FontAwesomeIcon icon={faCirclePlus} />
        </button>
      </div>


      {modal && (
        <ProductsForm
          handleSubmit={handleCreateOrUpdate}
          setModal={setModal}
          selectedProduct={selectedProduct}
        />
      )}

      {loading && <Loader />}

      <div className="container max-w-7xl">
        <Grid
          server={{
            url: "http://localhost:3000/productos",
            handle: async (res) => {
              setLoading(false);
              if (res.status === 404) return await { data: [] };
              if (res.ok) return await res.json();

              throw new Error("errir al obtener los datos");
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
                  <ActionsProducts
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
