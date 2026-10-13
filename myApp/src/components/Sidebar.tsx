import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const options = [
  { path: "/", label: "Início" },
  { path: "/contador", label: "Contador" },
  { path: "/perfil", label: "Perfil" },
  { path: "/perfil-props", label: "Perfil com Props" },
  { path: "/perfil-children", label: "Perfil com Children" },
  { path: "/perfil-state", label: "Perfil com State" },
  { path: "/perfil-editavel", label: "Perfil Editável" },
  { path: "/table", label: "Tabela" },
  { path: "/list", label: "Lista" },
  { path: "/form", label: "Formulário" },
  { path: "/formActions", label: "Formulário com Ações" },
  { path: "/formActionsThemeMode", label: "Formulário com Tema" },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <h1 className="sidebar__titulo">Programação Web II</h1>
      <nav className="sidebar__nav">
        {options.map((option) => (
          <NavLink
            key={option.path}
            to={option.path}
            className={({ isActive }) =>
              isActive ? "sidebar__link sidebar__link--ativo" : "sidebar__link"
            }
          >
            {option.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
