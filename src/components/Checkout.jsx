import React, { useContext, useState, useRef } from "react";
import { CarritoContext } from "./FuncionesCarrito";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import { procesarCompra, crearOrden } from "../api/checkoutApi"; // ⬅ IMPORTANTE
import "./Checkout.css";

const URL_IMAGEN_BASE = "http://3.135.235.62:8080/api/productos/imagenes/";

function Checkout() {
  const { carrito, vaciarCarrito } = useContext(CarritoContext);
  const navigate = useNavigate();

  const [direccion, setDireccion] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [region, setRegion] = useState("");
  const [telefono, setTelefono] = useState("");

  const [mostrarModal, setMostrarModal] = useState(false);
  const [cargandoCompra, setCargandoCompra] = useState(false);
  const [error, setError] = useState(""); // Nuevo estado para errores

  const boletaRef = useRef(null);

  const total = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );


  const validarFormulario = () => {
    setError(""); // Limpiar errores previos
    if (!direccion.trim() || !ciudad.trim() || !region.trim() || !telefono.trim()) {
      setError("Por favor completa todos los campos de envío.");
      return false;
    }

    if (!/^\+569\d{8}$/.test(telefono.trim())) {
      setError("El teléfono debe tener el formato +569XXXXXXXX.");
      return false;
    }

    if (carrito.length === 0) {
      setError("Tu carrito está vacío.");
      return false;
    }

    return true;
  };


  const confirmarCompra = async () => {
    if (!validarFormulario()) return;

    setCargandoCompra(true);
    setError("");

    // Obtener usuario del localStorage
    const usuarioStr = localStorage.getItem("usuario");
    if (!usuarioStr) {
      setError("Debes iniciar sesión para realizar una compra.");
      setCargandoCompra(false);
      return;
    }

    let usuarioId;
    try {
      const usuario = JSON.parse(usuarioStr);
      usuarioId = usuario.id;
    } catch (e) {
      setError("Error al obtener datos del usuario. Por favor inicia sesión nuevamente.");
      setCargandoCompra(false);
      return;
    }

    // Construir JSON de compra (CreateOrderRequest)
    // val usuarioId: Long,
    // val direccionEnvio: String,
    // val items: List<OrderItemRequest>
    const ordenPayload = {
      usuarioId: usuarioId,
      direccionEnvio: `${direccion}, ${ciudad}, ${region}`,
      items: carrito.map((item) => ({
        productoId: item.id,
        cantidad: item.cantidad,
      })),
    };

    try {
      console.log("Enviando orden:", ordenPayload);

      // await procesarCompra(compraPayload); // ⬅ ANTIGUO
      await crearOrden(ordenPayload); // ⬅ NUEVO

      // Si llega aquí → la compra se procesó correctamente
      setMostrarModal(true);

    } catch (error) {
      console.error("Error al procesar compra:", error);
      // ... existing error handling ...
      const mensaje =
        error.response?.data || "Error al procesar compra en el servidor.";

      setError(`❌ No se pudo procesar la compra: ${mensaje}`);
    } finally {
      setCargandoCompra(false);
    }
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    vaciarCarrito();
    navigate("/");
  };

  const descargarBoleta = async () => {
    if (!boletaRef.current) return;

    const canvas = await html2canvas(boletaRef.current);
    const link = document.createElement("a");
    link.download = "boleta-magiceast.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Finalizar Compra</h2>

      {carrito.length === 0 ? (
        <p className="checkout-vacio">Tu carrito está vacío.</p>
      ) : (
        <div className="checkout-content">
          {/* Items */}
          <div className="checkout-items">
            {carrito.map((item) => (
              <div className="checkout-item" key={item.id}>
                <img
                  src={
                    item.imagen
                      ? `${URL_IMAGEN_BASE}${item.imagen}`
                      : "/images/placeholder.jpg"
                  }
                  alt={item.nombre}
                />

                <div className="checkout-item-info">
                  <h4>{item.nombre}</h4>
                  <p>Cantidad: {item.cantidad}</p>
                  <p>Precio: ${item.precio.toLocaleString("es-CL")} c/u</p>
                  <p>
                    Subtotal: $
                    {(item.precio * item.cantidad).toLocaleString("es-CL")}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Envío + Resumen */}
          <div className="checkout-columna">
            <div className="checkout-envio">
              <h3>Dirección de Envío</h3>

              <label>Dirección *</label>
              <input
                type="text"
                placeholder="Ej: Avenida Siempre Viva 742"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
              />

              <label>Ciudad *</label>
              <input
                type="text"
                placeholder="Ej: Santiago"
                value={ciudad}
                onChange={(e) => setCiudad(e.target.value)}
              />

              <label>Región *</label>
              <input
                type="text"
                placeholder="Ej: Metropolitana"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              />

              <label>Teléfono *</label>
              <input
                type="text"
                placeholder="+56912345678"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </div>

            <div className="checkout-resumen">
              <h3>Resumen</h3>

              <p className="checkout-total">
                Total: <strong>${total.toLocaleString("es-CL")}</strong>
              </p>

              {error && <p className="error-message" style={{ color: "red", fontWeight: "bold" }}>{error}</p>}

              <button
                className="checkout-btn"
                onClick={confirmarCompra}
                disabled={cargandoCompra}
              >
                {cargandoCompra ? "Procesando..." : "Confirmar compra"}
              </button>

              <button className="checkout-volver" onClick={() => navigate(-1)}>
                Volver
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de boleta */}
      {mostrarModal && (
        <div className="boleta-modal-overlay">
          <div className="boleta-modal">
            <div ref={boletaRef} className="boleta-contenido">
              <h2>Boleta MagicEast</h2>
              <p>
                <strong>Dirección:</strong> {direccion}
              </p>
              <p>
                <strong>Ciudad:</strong> {ciudad}
              </p>
              <p>
                <strong>Región:</strong> {region}
              </p>
              <p>
                <strong>Teléfono:</strong> {telefono}
              </p>

              <hr />

              <table className="boleta-tabla">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cant.</th>
                    <th>Precio</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {carrito.map((item) => (
                    <tr key={item.id}>
                      <td>{item.nombre}</td>
                      <td>{item.cantidad}</td>
                      <td>${item.precio.toLocaleString("es-CL")}</td>
                      <td>
                        $
                        {(item.precio * item.cantidad).toLocaleString("es-CL")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="boleta-total">
                Total: <strong>${total.toLocaleString("es-CL")}</strong>
              </div>
            </div>

            <div className="boleta-acciones">
              <button onClick={descargarBoleta}>Descargar boleta</button>
              <button onClick={cerrarModal}>Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;
