import './Tutorial.css';
function Tutorial(){
  return (
        <>
            <section className="tutorial-banner">
                <div className="container">
                    <h2>Tutorial sobre como jugar Magic: The Gathering</h2>
                    <p>Aprende a jugar Magic: The Gathering paso a paso</p>
                </div>
            </section>

            <section className="tutorial-section">
                <div className="container">
                    <div className="tutorial-container">
                        <div className="tutorial-step">
                            <h3>Paso 1: ¿Qué es Magic: The Gathering?</h3>
                            <p>
                                Es un juego de cartas coleccionables donde dos o más jugadores se enfrentan como poderosos magos llamados planeswalkers.
                            </p>
                            <img src="/public/images/PlanesWalker.jpg" alt="Qué es MTG" />
                        </div>

                        <div className="tutorial-step">
                            <h3>Paso 2: Objetivo del juego</h3>
                            <p>
                                El objetivo es reducir los puntos de vida de tu oponente de 20 a 0 utilizando criaturas, hechizos y otras habilidades mágicas.
                            </p>
                            <img src="/public/images/miracle.jpg" alt="Objetivo del juego" />
                        </div>

                        <div className="tutorial-step">
                            <h3>Paso 3: Tipos de cartas</h3>
                            <ul>
                                <li><strong>Tierras:</strong> Proveen maná para lanzar hechizos.</li>
                                <li><strong>Criaturas:</strong> Luchan contra el oponente.</li>
                                <li><strong>Instantáneos/Conjuros:</strong> Hechizos de un solo uso con efectos varios.</li>
                                <li><strong>Encantamientos/Artefactos:</strong> Efectos permanentes en el campo.</li>
                                <li><strong>Planeswalkers:</strong> Poderosos aliados con habilidades únicas.</li>
                            </ul>
                            <img src="/public/images/EndlessPunishment.jpg" alt="Tipos de cartas" />
                        </div>

                        <div className="tutorial-step">
                            <h3>Paso 4: Cómo se juega un turno</h3>
                            <ol>
                                <li>Roba una carta</li>
                                <li>Juega una tierra (una por turno)</li>
                                <li>Lanza hechizos o invoca criaturas</li>
                                <li>Ataca a tu oponente</li>
                                <li>Finaliza el turno</li>
                            </ol>
                            <img src="/public/images/avatar.jpeg" alt="Fases del turno" />
                        </div>

                        <div className="tutorial-step">
                            <h3>Paso 5: Cómo ganar</h3>
                            <p>
                                Ganas cuando reduces los puntos de vida del oponente a 0, o si este no puede robar una carta cuando le toca.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Tutorial;