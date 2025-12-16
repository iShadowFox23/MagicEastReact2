function NewsLetter(){
    return(
    <div id="newsletter" className="section">
        {/* container */}
        <div className="container">
            {/* row */}
            <div className="row">
            <div className="col-md-12">
                <div className="newsletter">
                <p>No te pierdas ninguna noticia</p>
                <form>
                    <input className="input" type="email" placeholder="Ingresa Tu Email" />
                    <button className="newsletter-btn"><i className="fa fa-envelope" /> Suscribirse</button>
                </form>
                <ul className="newsletter-follow">
                    <li>
                    <a href="#"><i className="fa fa-facebook" /></a>
                    </li>
                    <li>
                    <a href="#"><i className="fa fa-twitter" /></a>
                    </li>
                    <li>
                    <a href="#"><i className="fa fa-instagram" /></a>
                    </li>
                    <li>
                    <a href="#"><i className="fa fa-pinterest" /></a>
                    </li>
                </ul>
                </div>
            </div>
            </div>
            {/* /row */}
        </div>
        {/* /container */}
    </div>
    )
}
export default NewsLetter