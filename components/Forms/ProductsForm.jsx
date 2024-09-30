export default function ProductsForm({ handleSubmit, setModal }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white shadow-lg rounded-lg p-8 space-y-6 max-w-lg w-full">
        <form onSubmit={handleSubmit} className="space-y-6 text-black">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label
                className="block text-sm font-medium text-gray-600"
                htmlFor="nombre"
              >
                Nombre del Producto
              </label>
              <input
                type="text"
                name="nombre"
                placeholder="Nombre del producto"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500 focus:outline-none sm:text-sm"
                required
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-600"
                htmlFor="precio"
              >
                Precio
              </label>
              <input
                type="text"
                name="precio"
                placeholder="Precio"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500 focus:outline-none sm:text-sm"
                required
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-600"
                htmlFor="stock"
              >
                Stock
              </label>
              <input
                type="number"
                name="stock"
                placeholder="Stock"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500 focus:outline-none sm:text-sm"
                required
              />
            </div>
          </div>

          {/* Textarea debajo de los inputs */}
          <div>
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="descripcion"
            >
              Descripción del Producto
            </label>
            <textarea
              name="descripcion"
              placeholder="Descripción del producto"
              cols={10}
              rows={4}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500 focus:outline-none sm:text-sm resize-none"
              required
            />
          </div>

          <div className="text-center flex gap-10">
            <button
              onClick={() => setModal(false)}
              className="w-full bg-red-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition ease-in-out duration-150 focus:outline-none"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="w-full bg-green-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition ease-in-out duration-150 focus:outline-none"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
