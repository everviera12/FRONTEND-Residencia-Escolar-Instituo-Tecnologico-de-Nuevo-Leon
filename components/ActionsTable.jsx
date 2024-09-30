import { faFile, faFileEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ActionsTable({setModal}) {
  return (
    <div className="flex justify-center gap-5">
      <button
        className={
          "text-xl rounded-md text-green-400 hover:text-opacity-40 transition-all "
        }
        onClick={setModal}
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
  );
}
