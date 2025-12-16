import React, { useEffect, useState, useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carrusel.css";
import { listarProductos } from "../../api/productosApi";
import { CarritoContext } from "../FuncionesCarrito";
import { Link } from "react-router-dom";

function AgregadosRecientemente() {
  const [productos, setProductos] = useState([]);
  const { agregarAlCarrito } = useContext(CarritoContext);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await listarProductos();
        const data = response.data;
        // Shuffle array and take 9
        const shuffled = [...data].sort(() => 0.5 - Math.random());
        setProductos(shuffled.slice(0, 9));
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    };

    fetchProductos();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3, slidesToScroll: 3 }
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1, slidesToScroll: 1 }
      }
    ]
  };

  const API_IMG_URL = "http://3.135.235.62:8080/api/productos/imagenes";

  return (
    <div className="slider-container2">
      <h2 className="section-title" style={{ textAlign: "center", marginBottom: "20px", color: "white" }}>Productos agregados recientemente</h2>
      <Slider {...settings}>
        {productos.map((p) => (
          <div className="product" key={p.id}>
            <div className="product-img">
              <img
                src={p.imagen ? `${API_IMG_URL}/${p.imagen}` : "/images/placeholder.jpg"}
                alt={p.nombre}
                height={245}
                className="img-responsive"
                onError={(e) => { e.target.src = "/images/placeholder.jpg"; }}
              />
              <div className="product-label">
                {/* <span className="sale">-30%</span> */}
                <span className="new">Nuevo</span>
              </div>
            </div>

            <div className="product-body">
              <p className="product-category">{p.categoria || "General"}</p>
              <h3 className="product-name">
                <Link to={`/productodetalle/${p.id}`}>{p.nombre}</Link>
              </h3>
              <h4 className="product-price">
                ${p.precio?.toLocaleString("es-CL")}
                {/* <del className="product-old-price">$99.990</del> */}
              </h4>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default AgregadosRecientemente;
