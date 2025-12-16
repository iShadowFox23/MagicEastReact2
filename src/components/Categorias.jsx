import React from "react";
import { Link } from "react-router-dom";
import "./CategoriaCss.css";

function Categorias() {
  const categories = [
    {
      title: "Booster",
      image: "booster10.png",
      link: "/catalogobooster",
    },
    {
      title: "Mazos",
      image: "precon10.png",
      link: "/catalogo",
    },
    {
      title: "Accesorios",
      image: "accesorio2.jpg",
      link: "/catalogoaccesorio",
    },
  ];

  const API_IMG_URL = "http://3.135.235.62:8080/api/productos/imagenes";

  return (
    <div className="categorias-section">
      {categories.map((cat, index) => (
        <Link to={cat.link} className="shop" key={index} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="shop-img">
            <img
              src={`${API_IMG_URL}/${cat.image}`}
              alt={cat.title}
              onError={(e) => { e.target.src = "/images/placeholder.jpg"; }}
            />
          </div>
          <div className="shop-body">
            <h3>{cat.title}</h3>
            <span className="cta-btn">Ver Catálogo <i className="fa fa-arrow-circle-right"></i></span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Categorias;
