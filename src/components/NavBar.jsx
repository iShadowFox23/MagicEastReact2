import { useState } from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav id="navigation">
      <div className="nav-container">

        {/* Botón hamburguesa */}
        <div className={`nav-toggle ${menuOpen ? "open" : ""}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Menú */}
        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>

          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
              end
            >
              Inicio
            </NavLink>
          </li>


          <li>
            <NavLink
              to="/catalogo"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Mazos
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/catalogobooster"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Sobres
            </NavLink>
          </li>


          <li>
            <NavLink
              to="/catalogoaccesorio"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Accesorios
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/scryfall-catalogo"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Singles
            </NavLink>
          </li>

        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
