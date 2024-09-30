import { faFile, faFileEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ActionsTable({
  setModal,
  handleDelete,
  producto,
  setSelectedProduct,
}) {
  return (
    <div className="flex justify-center gap-5">
      <button
        className="text-xl rounded-md text-green-400 hover:text-opacity-40 transition-all"
        onClick={() => {
          setSelectedProduct(null);
          setModal(true);
        }}
      >
        <FontAwesomeIcon icon={faFile} />
      </button>

      {/* Botón para editar producto */}
      <button
        className="text-xl rounded-md text-yellow-400 hover:text-opacity-40 transition-all"
        onClick={() => {
          setSelectedProduct(producto);
          setModal(true);
        }}
      >
        <FontAwesomeIcon icon={faFileEdit} />
      </button>

      {/* Botón para eliminar producto */}
      <button
        className="text-xl rounded-md text-red-400 hover:text-opacity-40 transition-all"
        onClick={() => {
          setSelectedProduct(producto);
          handleDelete();
        }}
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
}
