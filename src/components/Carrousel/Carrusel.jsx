import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./TresCarrusel.css";
import axios from "axios";

function NextArrow(props) {
  return <div className="custom-arrow next-arrow" onClick={props.onClick}>⮞</div>;
}

function PrevArrow(props) {
  return <div className="custom-arrow prev-arrow" onClick={props.onClick}>⮜</div>;
}

function Carrusel({ titulo, categoria }) {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    axios
      .get("http://3.135.235.62:8080/api/productos")
      .then((res) => {
        const filtrados = res.data.filter((p) =>
          (p.categorias || "").toLowerCase() === (categoria || "").toLowerCase()
        );
        setProductos(filtrados);
      })
      .catch((err) => console.error("ERROR BACKEND:", err));
  }, [categoria]);

  const settings = {
    dots: true,
    infinite: productos.length > 1,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: productos.length > 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  return (
    <div className="slider-container" style={{ minHeight: "400px" }}>
      <h2 className="carrusel-titulo">{titulo}</h2>

      {productos.length === 0 ? (
        <p style={{ color: "white" }}>Cargando productos…</p>
      ) : (
        <Slider {...settings}>
          {productos.map((p) => (
            <div className="product" key={p.id}>
              <img
                src={`http://3.135.235.62:8080/api/productos/imagenes/${p.imagen}`}
                alt={p.nombre}
              />
              <div className="product-body">
                <p>{p.categorias}</p>
                <h3>{p.nombre}</h3>
                <h4>${p.precio.toLocaleString("es-CL")}</h4>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
}

export default Carrusel;
