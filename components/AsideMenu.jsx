"use client";

import { logo_empresa } from "@/public";
import { asideMenuLinks } from "@/utils/staticData";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AsideMenu() {
  const path = usePathname();

  return (
    <div className="xl:rounded-r grid grid-rows-1 lg:grid-rows-[auto,1fr,auto] h-screen w-full sm:w-64 bg-gray-900">
      {/* Logo y empresa */}
      <div className="hidden xl:flex p-6 items-center space-x-3">
        <Image
          src={logo_empresa}
          width={50}
          height={50}
          className="bg-white rounded-full p-[2px]"
          alt="logo de la empresa"
        />
        <p className="text-2xl leading-6 text-white">Empresa</p>
      </div>

      {/* Menú de navegación */}
      <div className="flex flex-col items-center p-4 gap-10 border-gray-600 border-b">
        {asideMenuLinks.map((link, index) => (
          <Link
            href={link.url}
            key={index}
            id={path && path.startsWith(link.url) ? "active" : null}
            className="flex justify-start items-center space-x-6 w-full text-white rounded"
          >
            <FontAwesomeIcon icon={link.icon} />
            <p className="text-base leading-4">{link.label}</p>
          </Link>
        ))}
      </div>

      {/* Usuario en la parte inferior */}
      <div className="grid justify-center gap-5 p-4 bg-gray-800">
        <div className="grid lg:flex justify-center items-center gap-5">
          <img
            className="rounded-full"
            src="https://i.ibb.co/L1LQtBm/Ellipse-1.png"
            alt="avatar"
            width={50}
            height={50}
          />
          <div className="flex flex-col items-start">
            <p className="cursor-pointer text-sm leading-5 text-white">Alexis Enache</p>
            <p className="cursor-pointer text-xs leading-3 text-gray-300">alexis81@gmail.com</p>
          </div>
        </div>

        <div className="flex items-center cursor-pointer text-white">
          <FontAwesomeIcon icon={faRightFromBracket} className="mr-1" />
          <span className="text-sm">Log Out</span>
        </div>
      </div>
    </div>
  );
}
