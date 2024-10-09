"use client";

import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import { _ } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";
import { Grid } from "gridjs-react";
import { table_columns_usuarios } from "@/utils/staticData";

export default function UsuariosPage() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="grid justify-center px-10">
      <div className="flex justify-between items-center">
        <h1 className="text-yellow-400 font-bold text-4xl">
          Tabla de Usuarios
        </h1>
      </div>

      {loading && <Loader />}

      <div className="container max-w-7xl">
        <Grid
          server={{
            url: "http://localhost:3000/usuarios",
            handle: async (res) => {
              setLoading(false);
              if (res.status === 404) return { data: [] };
              if (res.ok) return await res.json();

              throw new Error("Error al obtener los datos");
            },
            then: (data) =>
              data.map((usuario) => [
                usuario.nombre,
                usuario.usuario,
                usuario.email,
                usuario.rol,
                _(
                  <span
                    className={
                      usuario.estado ? "text-green-500" : "text-red-500"
                    }
                  >
                    {usuario.estado ? "Activo" : "Inactivo"}
                  </span>
                ),
                _(),
              ]),
          }}
          columns={table_columns_usuarios}
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
