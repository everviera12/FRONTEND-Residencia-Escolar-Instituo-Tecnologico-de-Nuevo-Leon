import {
  faBriefcase,
  faCube,
  faCubes,
  faPeopleArrows,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export const asideMenuLinks = [
  {
    url: '/dashboard',
    icon: faCubes,
    label: 'Dashboard',
  },
  {
    url: '/users',
    icon: faUser,
    label: 'Users',
  },
  {
    url: '/productos',
    icon: faCube,
    label: 'Productos',
  },
  {
    url: '/clientes',
    icon: faPeopleArrows,
    label: 'Clientes',
  },
  {
    url: '/instalaciones',
    icon: faBriefcase,
    label: 'Instalaciones',
  },
];

export const clientFormFields = [
  {
    db_field: 'nombre',
    label_text: 'Nombre del Cliente',
    input_type: 'text',
    placeholder: 'Nombre del cliente'
  },
  {
    db_field: 'direccion',
    label_text: 'Direccion',
    input_type: 'text',
    placeholder: 'Direccion del cliente'
  },
  {
    db_field: 'telefono',
    label_text: 'Numero de telefono',
    input_type: 'text',
    placeholder: 'ej. 8122941232'
  }
]