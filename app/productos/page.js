"use client";

import { Grid } from "gridjs-react";
import { _ } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faFileEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

export default function ProductosPage() {
  return (
    <div className="grid px-10 gap-5 py-16">
      <h1 className="text-yellow-400 font-bold text-4xl">Tabla de Productos</h1>

      <Grid
        server={{
          url: "http://localhost:3000/productos",
          handle: (res) => {
            if (res.status === 404) return { data: [] };
            if (res.ok) return res.json();

            throw new Error("oh no :(");
          },
          then: (data) =>
            data.map((producto) => [
              producto.nombre,
              producto.descripcion,
              producto.precio,
              producto.stock,
              _(
                <div className="flex justify-center gap-5">
                  <button
                    className={
                      "text-xl rounded-md text-green-400 hover:text-opacity-40 transition-all "
                    }
                    onClick={() => alert("clicked!")}
                  >
                    <FontAwesomeIcon icon={faFile} />
                  </button>

                  <button
                    className={
                      "text-xl rounded-md text-yellow-400 hover:text-opacity-40 transition-all "
                    }
                    onClick={() => alert("clicked!")}
                  >
                    <FontAwesomeIcon icon={faFileEdit} />
                  </button>

                  <button
                    className={
                      "text-xl rounded-md text-red-400 hover:text-opacity-40 transition-all "
                    }
                    onClick={() => alert("clicked!")}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
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
  );
}
