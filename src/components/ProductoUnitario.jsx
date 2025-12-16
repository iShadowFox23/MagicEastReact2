import { useState } from "react";
import "./ProductoDetalle.css";

function ProductoDetalle({ producto }) {
  const [imagenSeleccionada, setImagenSeleccionada] = useState(producto.imagenes[0]);
  const [cantidad, setCantidad] = useState(1);

  const handleCantidad = (delta) => {
    setCantidad((prev) => Math.max(1, prev + delta));
  };

  const handleAgregarCarrito = () => {
    console.log(`Añadido al carrito: ${cantidad} x ${producto.nombre}`);
    
  };

  return (
    <div className="producto-detalle-container">
      {/* Miniaturas */}
      <div className="producto-thumbs">
        {producto.imagenes.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Miniatura ${index + 1}`}
            className={`thumb ${img === imagenSeleccionada ? "activa" : ""}`}
            onClick={() => setImagenSeleccionada(img)}
          />
        ))}
      </div>

      {/* Imagen principal */}
      <div className="producto-imagen">
        <img src={imagenSeleccionada} alt={producto.nombre} />
      </div>

      {/* Detalles */}
      <div className="producto-info">
        <h2 className="producto-nombre">{producto.nombre}</h2>
        <p className="producto-categoria">{producto.categoria}</p>

        <h3 className="producto-precio">${producto.precio.toLocaleString("es-CL")}</h3>

        {producto.descuento > 0 && (
          <p className="producto-descuento">
            Antes: <span className="tachado">${producto.precioAntiguo.toLocaleString("es-CL")}</span> (-{producto.descuento}%)
          </p>
        )}

        <p className="producto-descripcion">{producto.descripcion}</p>

        <div className="producto-acciones">
          <div className="cantidad-selector">
            <button onClick={() => handleCantidad(-1)}>-</button>
            <input type="number" value={cantidad} readOnly />
            <button onClick={() => handleCantidad(1)}>+</button>
          </div>
          <button className="btn-carrito" onClick={handleAgregarCarrito}>
            <i className="fa fa-shopping-cart" /> Añadir al carro
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductoDetalle;