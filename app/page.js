import { logo_empresa } from "@/public";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">

        <div className="grid gap-5 justify-center">
          <Image
            src={logo_empresa}
            alt="Logo"
            width={70}
            height={100}
            className="mx-auto rounded-full"
          />
          <h2 className="text-2xl font-bold text-center mb-6">Iniciar Sesión</h2>
        </div>

        <form>
          <div className="mb-4">
            <label htmlFor="usuario" className="block text-sm font-medium text-gray-700 mb-1">Usuario</label>
            <input
              type="text"
              id="usuario"
              required
              className="shadow-sm border outline-none border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
              placeholder="Ingresa tu usuario"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="contraseña" className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <input
              type="password"
              id="contraseña"
              required
              className="shadow-sm border outline-none border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
              placeholder="Ingresa tu contraseña"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 transition duration-200"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}
