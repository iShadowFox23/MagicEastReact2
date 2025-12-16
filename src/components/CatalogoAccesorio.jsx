import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listarProductos } from "../api/productosApi";
import "./Catalogo.css";

function CatalogoAccesorio() {
  const navigate = useNavigate();
  const URL_IMAGEN_BASE = "http://3.135.235.62:8080/api/productos/imagenes/";
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const handleIrAlProducto = (id) => {
    navigate(`/productodetalle/${id}`);
  };

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await listarProductos();
        
        const productosApi = response.data || [];

        //filtrado de categorias
        const filtrados = productosApi.filter((p) =>
          p.categorias?.toLowerCase().includes("accesorios tcg")
        );

        setProductos(filtrados);
      } catch (err) {
        console.error("Error al listar productos:", err);
        setError("Error al cargar los productos.");
      } finally {
        setCargando(false);
      }
    };

    fetchProductos();
  }, []);

  if (cargando) {
    return (
      <section className="catalogo">
        <h2 className="catalogo-titulo">Catálogo de Productos</h2>
        <p>Cargando productos...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="catalogo">
        <h2 className="catalogo-titulo">Catálogo de Productos</h2>
        <p style={{ color: "red" }}>{error}</p>
      </section>
    );
  }

  return (
    <section className="catalogo">
      <h2 className="catalogo-titulo">Accesorios</h2>
      <div className="catalogo-grid">
        {productos.length === 0 && (
          <p>No hay Accesorios disponibles por ahora.</p>
        )}

        {productos.map((item) => (
          <div key={item.id} className="producto-card">
            <img src={`${URL_IMAGEN_BASE}${item.imagen}`}alt={item.nombre}/>
            <h3>{item.nombre}</h3>
            <p className="precio">
              {item.precio != null
                ? `$${item.precio.toLocaleString("es-CL")}`
                : "Sin precio"}
            </p>
            <button
              className="btn-comprar"
              onClick={() => handleIrAlProducto(item.id)}
            >
              Ir al producto
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CatalogoAccesorio;
