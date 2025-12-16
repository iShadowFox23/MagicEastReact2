import React, { useState, useEffect, useContext } from "react";
import { obtenerProducto } from "../api/productosApi";
import { CarritoContext } from "./FuncionesCarrito";
import "./ProductoDetalle.css";

const URL_IMAGEN_BASE = "http://3.135.235.62:8080/api/productos/imagenes/";
const PLACEHOLDER_IMG = "/images/placeholder.jpg";

function ProductoDetalle({ idProducto }) {
  const { agregarAlCarrito } = useContext(CarritoContext);

  const [producto, setProducto] = useState(null);
  const [imagenSeleccionada, setImagenSeleccionada] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!idProducto) return;

    const fetchProducto = async () => {
      try {
        setCargando(true);
        setError(null);

        const response = await obtenerProducto(idProducto);
        const data = response.data;
        setProducto(data);

        setImagenSeleccionada(
          data.imagen ? `${URL_IMAGEN_BASE}${data.imagen}` : PLACEHOLDER_IMG
        );

        setCantidad(1);
      } catch (err) {
        setError("No se pudo cargar el producto.");
      } finally {
        setCargando(false);
      }
    };

    fetchProducto();
  }, [idProducto]);

  if (cargando) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;
  if (!producto) return <div>Producto no encontrado.</div>;

  const imagenes = producto.imagen
    ? [`${URL_IMAGEN_BASE}${producto.imagen}`]
    : [PLACEHOLDER_IMG];

  const handleCantidad = (delta) => {
    setCantidad((prev) => {
      let nueva = prev + delta;
      if (nueva < 1) nueva = 1;
      if (producto.stock && nueva > producto.stock) nueva = producto.stock;
      return nueva;
    });
  };

  const handleAgregarCarrito = () => {
    console.log("PRODUCTO QUE AGREGA:", producto);
    agregarAlCarrito(producto, cantidad);
  };

  return (
    <div className="producto-detalle-container">
      <div className="producto-thumbs">
        {imagenes.map((img, i) => (
          <img
            key={i}
            src={img}
            className={`thumb ${img === imagenSeleccionada ? "activa" : ""}`}
            onClick={() => setImagenSeleccionada(img)}
          />
        ))}
      </div>

      <div className="producto-imagen">
        <img src={imagenSeleccionada} alt={producto.nombre} />
      </div>

      <div className="producto-info">
        <h2>{producto.nombre}</h2>
        <p>{producto.categorias}</p>
        <h3>${producto.precio?.toLocaleString("es-CL")}</h3>
        <p className="producto-stock">
          {producto.stock > 0
            ? `Stock disponible: ${producto.stock}`
            : "Sin stock disponible"}
        </p>

        {producto.descripcion && (
          <p className="producto-descripcion" style={{ marginTop: "10px", fontSize: "14px", color: "#ccc" }}>
            {producto.descripcion}
          </p>
        )}
        <div className="producto-acciones">
          <div className="cantidad-selector">
            <button onClick={() => handleCantidad(-1)}>-</button>
            <input value={cantidad} readOnly />
            <button onClick={() => handleCantidad(1)}>+</button>
          </div>

          <button className="btn-carrito" onClick={handleAgregarCarrito}>
            Añadir al carro
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductoDetalle;
