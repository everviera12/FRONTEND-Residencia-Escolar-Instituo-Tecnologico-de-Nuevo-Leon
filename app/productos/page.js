"use client";

import { Grid } from "gridjs-react";
import { _ } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faFileEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { handleSubmit } from "@/fetching/fetchProductos";
import { useState } from "react";
import ProductsForm from "@/components/Forms/ProductsForm";
import ActionsTable from "@/components/ActionsTable";

export default function ProductosPage() {
  const [modal, setModal] = useState(false);

  return (
    <div className="grid px-10 gap-5 py-16">
      <h1 className="text-yellow-400 font-bold text-4xl">Tabla de Productos</h1>

      {modal && (
        <ProductsForm handleSubmit={handleSubmit} setModal={setModal} />
      )}

      <Grid
        server={{
          url: "http://localhost:3000/productos",
          handle: async (res) => {
            if (res.status === 404) return await { data: [] };
            if (res.ok) return await res.json();

            throw new Error("oh no :(");
          },
          then: (data) =>
            data.map((producto) => [
              producto.nombre,
              producto.descripcion,
              producto.precio,
              producto.stock,
              _(<ActionsTable setModal={setModal} />),
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
  );
}
