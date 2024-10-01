"use client";

import { Grid } from "gridjs-react";
import { _ } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";
import { useState } from "react";
import Loader from "@/components/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import ClientsForm from "@/components/Forms/ClientsForm";
import { handleSubmitClients, updateClient } from "@/services/fetchClientes";
import ActionsClients from "@/components/ActionsTable/ActionsClients";

export default function ClientesPage() {

  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedClient, setSelectedClient] = useState(null);

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      nombre: formData.get("nombre"),
      direccion: formData.get("direccion"),
      telefono: formData.get("telefono"),
    };

    try {
      if (selectedClient) {
        await updateClient(selectedClient, data);
        alert("Cliente actualizado exitosamente");
        return <Loader />
      } else {
        await handleSubmitClients(e);
        alert("Cliente guardado exitosamente");
        return <Loader />
      }

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="grid justify-center px-10 gap-5">
      <div className="flex justify-between items-center">
        <h1 className="text-yellow-400 font-bold text-4xl">Tabla de Clientes</h1>
        {/* Botón para AGREGAR producto */}
        <button
          className="text-md bg-green-800 px-5 py-1.5 rounded-md text-white font-semibold hover:text-opacity-40 transition-all"
          onClick={() => {
            setSelectedClient(null);
            setModal(true);
          }}
        >
          Agregar <FontAwesomeIcon icon={faCirclePlus} />
        </button>
      </div>

      {modal && (
        <ClientsForm
          handleCreateOrUpdate={handleCreateOrUpdate}
          setModal={setModal}
          selectedClient={selectedClient}
        />
      )}

      {loading && <Loader />}


      <div className="container max-w-7xl">
        <Grid
          server={{
            url: "http://localhost:3000/clientes",
            handle: async (res) => {
              setLoading(false);
              if (res.status === 404) return await { data: [] };
              if (res.ok) return await res.json();

              throw new Error("errir al obtener los datos");
            },
            then: (data) =>
              data.map((cliente) => [
                cliente.nombre,
                cliente.direccion,
                cliente.telefono,
                _(
                  <ActionsClients
                    setModal={setModal}
                    // handleDelete={handleDelete}
                    cliente={cliente}
                    setSelectedClient={setSelectedClient}
                  />
                ),
              ]),
          }}
          columns={["Nombre", "Direccion", "Telefono", "Acciones"]}
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