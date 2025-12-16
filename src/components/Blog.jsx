import { Link } from "react-router-dom";
import "./Blog.css";

function Blog() {
  return (
    <>
      <section className="blog-banner">
        <div className="container">
          <h2>Blog MagicEast</h2>
          <p>Noticias, eventos, tutoriales y más!</p>
        </div>
      </section>

      <section className="blog-section">
        <div className="container">

          {/* Noticia 1 */}
          <div className="blog-item">
            <img src="/images/PlanesWalker.jpg" alt="Aprende a jugar Magic" />
            <div className="blog-content">
              <Link to="/tutorial" style={{ textDecoration: 'none', color: 'inherit' }}>
                <h3>Aprende a jugar Magic: The Gathering</h3>
              </Link>
              <p>
                Descubre los fundamentos de Magic: The Gathering. Aprende cómo funcionan las cartas,
                las fases del turno y los tipos de mazos para empezar a jugar con confianza.
              </p>
            </div>
          </div>

          {/* Noticia 2 */}
          <div className="blog-item">
            <img src="/images/COMMANDER-HALLOWEEN.jpg" alt="Evento de Halloween" />
            <div className="blog-content">
              <h2>👻 Commander de miedo 🎃</h2>
              <p>
                ¡Celebra Halloween con MagicEast! Ven a pasar una noche aterradoramente divertida
                el 30 de octubre a las 19:00 en el HUB de Providencia.
              </p>
            </div>
          </div>

          {/* Noticia 3 */}
          <div className="blog-item">
            <img src="/images/MagicIcon.png" alt="Torneo LandFall" />
            <div className="blog-content">
              <h3>Tabla anual precon LandFall</h3>
              <p>
                Conoce la tabla global de puntos para clasificar al torneo anual de precon,
                organizado por LandFall.
              </p>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

export default Blog;
