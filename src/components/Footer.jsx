import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer id="footer">
      <div className="section">
        <div className="footer-container">
          <div className="footer">
            <h3 className="footer-title">Sobre Nosotros</h3>
            <p>En Magic East tenemos los mejores productos al mejor precio. Somos la mejor de las cuatro direcciones cardinales.</p>
            <ul className="footer-links">
              <li><a href="#"><i className="fa fa-map-marker" /> Seminario 505, Providencia, Santiago de Chile</a></li>
              <li><a href="#"><i className="fa fa-phone" /> +56 9 0303 4567</a></li>
              <li><a href="#"><i className="fa fa-envelope-o" /> contacto@magiceast.cl</a></li>
            </ul>
          </div>

          <div className="footer">
            <h3 className="footer-title">Categorías</h3>
            <ul className="footer-links">
              <li><a href="#">Ofertas</a></li>
              <li><Link to="/catalogo">Mazos</Link></li>
              <li><a href="#">Sobres</a></li>
              <li><a href="#">Eventos</a></li>
              <li><a href="#">Version 2</a></li>
            </ul>
          </div>

          <div className="footer">
            <h3 className="footer-title">Información</h3>
            <ul className="footer-links">
              <li><Link to="/about">Sobre nosotros</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><a href="#">Política de Privacidad</a></li>
              <li><a href="#">Política de Reembolsos</a></li>
              <li><a href="#">Términos y Condiciones</a></li>
            </ul>
          </div>

          <div className="footer">
            <h3 className="footer-title">Servicios</h3>
            <ul className="footer-links">
              <li><Link to="/login" >Mi cuenta</Link></li>
              <li><Link to="/Producto">Ver carrito</Link></li>
              <li><a href="#">Seguimiento del pedido</a></li>
              <li><a href="#">Soporte</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
