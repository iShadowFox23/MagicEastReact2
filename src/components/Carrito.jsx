import React, { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";
import { useNavigate } from "react-router-dom";
import "./Carrito.css";

function Carrito() {
  const { carrito, eliminarDelCarrito } = useContext(CarritoContext);
  const navigate = useNavigate();

  const total = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  const irACheckout = () => {
    navigate("/checkout");
  };

  const getImagen = (item) => {
    if (item.imagenUrl?.startsWith("http")) return item.imagenUrl;
    if (item.imagen?.startsWith("http")) return item.imagen;
    if (item.imagenUrl) return `http://3.135.235.62:8080/${item.imagenUrl}`;
    if (item.imagen) return `http://3.135.235.62:8080/${item.imagen}`;
    return "/images/sin-imagen.png";
  };

  return (
    <div className="carrito-container">
      <h1>Carrito de compras</h1>

      {carrito.length === 0 ? (
        <p>El carrito se encuentra vacío.</p>
      ) : (
        <>
          <div className="carrito-list">
            {carrito.map((item) => (
              <div className="carrito-item" key={item.id}>
                <img
                  src={getImagen(item)}
                  alt={item.nombre}
                  className="carrito-img"
                />

                <div className="carrito-info">
                  <h4>{item.nombre}</h4>
                  <p>Cantidad: {item.cantidad}</p>
                  <p>Precio unitario: ${item.precio.toLocaleString()}</p>
                  <p>
                    Subtotal: $
                    {(item.precio * item.cantidad).toLocaleString()}
                  </p>

                  <button
                    className="btn-eliminar"
                    onClick={() => eliminarDelCarrito(item.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="carrito-resumen">
            <h3>Total: ${total.toLocaleString()}</h3>

            <button className="btn-comprar" onClick={irACheckout}>
              Realizar compra
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Carrito;
