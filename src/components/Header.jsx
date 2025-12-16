import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { CarritoContext } from "./FuncionesCarrito";

function Header() {
  const { carrito, agregarAlCarrito, restarCantidad, eliminarDelCarrito } =
    useContext(CarritoContext);

  const [cartOpen, setCartOpen] = useState(false);

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const logout = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const toggleCart = () => setCartOpen(!cartOpen);

  const total = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  return (
    <header>
      <div id="top-header">
        <div className="topHeader">
          <ul className="header-links">
            <li>
              <a>
                <i className="fa fa-phone" /> +56 9 0303 4567
              </a>
            </li>
            <li>
              <a>
                <i className="fa fa-envelope-o" /> contacto@magiceast.cl
              </a>
            </li>
            <li>
              <a
                href="https://www.google.com/maps/place/Magicsur+Chile/"
                target="_blank"
              >
                <i className="fa fa-map-marker" /> Seminario 505, Providencia
              </a>
            </li>
          </ul>

          <ul className="header-links" style={{ paddingRight: 20 }}>
            <li>
              {usuario ? (
                <>
                  <span>
                    <i className="fa fa-user-o" /> Hola, {usuario.nombre}
                  </span>
                  <button onClick={logout} className="logout-btn">
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <Link to="/login">
                  <i className="fa fa-user-o" /> Iniciar Sesión
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>

      <div id="header">
        <div className="header-container">
          <div className="header-logo">
            <Link to="/" className="logo-text">
              <span className="magic">Magic</span>
              <span className="west">East</span>
            </Link>
          </div>

          <div className="header-search">
            <form>
              <input className="input" placeholder="Búsqueda en catálogo" />
              <button className="search-btn">Buscar</button>
            </form>
          </div>

          <div
            className="cart-container"
            onMouseEnter={() => setCartOpen(true)}
            onMouseLeave={() => setTimeout(() => setCartOpen(false), 300)}
          >
            <button className="cart-toggle" onClick={toggleCart}>
              <i className="fa fa-shopping-cart" /> Carrito ({carrito.length})
            </button>

            <div className={`cart-dropdown ${cartOpen ? "open" : ""}`}>
              {carrito.length === 0 ? (
                <p>Tu carrito está vacío</p>
              ) : (
                <>
                  <ul>
                    {carrito.map((item) => (
                      <li key={item.id} className="cart-item">
                        <img
                          src={
                            item.imagen
                              ? `http://3.135.235.62:8080/api/productos/imagenes/${item.imagen}`
                              : "/images/placeholder.jpg"
                          }
                          alt={item.nombre}
                          className="cart-item-img"
                        />

                        <div className="cart-item-info">
                          <p>{item.nombre}</p>

                          <div className="cart-qty-controls">
                            <button
                              className="qty-btn"
                              onClick={() => restarCantidad(item.id)}
                              disabled={item.cantidad <= 1}
                            >
                              -
                            </button>

                            <span className="qty-value">{item.cantidad}</span>

                            <button
                              className="qty-btn"
                              onClick={() => agregarAlCarrito(item, 1)}
                              disabled={item.cantidad >= item.stock}
                            >
                              +
                            </button>

                            <button
                              className="btn-delete"
                              onClick={() => eliminarDelCarrito(item.id)}
                            >
                              <i className="fa fa-trash"></i>
                            </button>
                          </div>

                          <p>
                            {item.cantidad} x $
                            {item.precio.toLocaleString("es-CL")}
                          </p>

                          {item.cantidad >= item.stock && (
                            <small className="stock-alert">
                              Stock máximo alcanzado
                            </small>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="cart-total">
                    <strong>Total:</strong> ${total.toLocaleString("es-CL")}
                  </div>

                  <Link to="/checkout">
                    <button className="cart-checkout">Realizar Compra</button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
