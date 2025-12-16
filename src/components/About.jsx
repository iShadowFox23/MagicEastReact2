import './About.css'

function About(){
    return(  
        
        <>
            <section className="sobre-nosotros-banner">
                <div className="container">
                    <h2>Sobre Nosotros</h2>
                    <p>Tu tienda especializada en Magic: The Gathering</p>
                </div>
            </section>
            
            <section className="">
                <div className="">
                    {/* Box que envuelve todo */}
                    <div className="">
                    <div className="AboutContainer">
                        <div>
                                <img src="/images/tienda.jpg" alt="Banner principal" />
                        </div>
                        <div className="">
                            <div className="">
                                <h3>Nuestra Historia</h3>
                                <p>
                                    MagicEast nació de la pasión por <strong>Magic: The Gathering</strong> y la idea de crear un espacio donde jugadores nuevos y veteranos pudieran
                                    encontrar cartas, mazos y accesorios de calidad. Desde nuestros inicios, buscamos fomentar una comunidad unida, competitiva y divertida.
                                </p>
                                    <h3>Misión</h3>
                                    <p>
                                    Ofrecer los mejores productos de MTG y crear un lugar donde los duelos se conviertan en recuerdos. Nos esforzamos por brindar
                                    un servicio cercano, confiable y lleno de entusiasmo por este increíble juego.
                                </p>
                                <h3>Valores</h3>
                                <p>
                                    <strong>Pasión</strong> por Magic y los juegos de mesa, 
                                    <strong> compromiso</strong> con la comunidad, 
                                    <strong> honestidad</strong> y cercanía, 
                                    y <strong>promoción</strong> del juego sano y responsable.
                                </p>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
        </>


    )
}
export default About