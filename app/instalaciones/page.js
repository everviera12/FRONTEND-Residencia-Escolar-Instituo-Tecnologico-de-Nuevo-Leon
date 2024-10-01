"use client";

import Loader from "@/components/Loader";
import { table_columns_instalacion } from "@/utils/staticData";
import { Grid } from "gridjs-react";
import { _ } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";
import { useState } from "react";

export default function InstalacionPage() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="grid justify-center px-10">
      {loading && <Loader />}

      <div className="container max-w-7xl">
        <Grid
          server={{
            url: "http://localhost:3000/instalaciones",
            handle: async (res) => {
              setLoading(false);
              if (res.status === 404) return await { data: [] };
              if (res.ok) return await res.json();

              throw new Error("Error al obtener los datos");
            },
            then: (data) =>
              data.map((instalacion) => [
                instalacion.cliente_nombre,
                instalacion.producto_nombre,
                new Date(instalacion.fecha_instalacion).toLocaleDateString(
                  "es-MX",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }
                ),
                instalacion.descripcion,
                parseFloat(instalacion.costo_instalacion).toLocaleString("es-MX",
                  {
                    style: "currency",
                    currency: "MXN",
                  }
                ),
                instalacion.estado,
                _(),
              ]),
          }}
          columns={table_columns_instalacion}
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
