function HotDeal(){
    return(
        <div id="hot-deal" className="section">
  {/* container */}
  <div className="container">
    {/* row */}
    <div className="row">
      <div className="col-md-12">
        <div className="hot-deal">
          <ul className="hot-deal-countdown">
            <li>
              <div>
                <h3>14</h3>
                <span>Dias</span>
              </div>
            </li>
            <li>
              <div>
                <h3>10</h3>
                <span>Horas</span>
              </div>
            </li>
            <li>
              <div>
                <h3>34</h3>
                <span>Minutos</span>
              </div>
            </li>
            <li>
              <div>
                <h3>60</h3>
                <span>Segundos</span>
              </div>
            </li>
          </ul>
          <h2 className="banner-texto">Lanzamiento Marvel Spiderman X Magic:The Gathering</h2>
          <a className="primary-btn cta-btn" href="#">Precomprar Ahora!</a>
        </div>
      </div>
    </div>
    {/* /row */}
  </div>
  {/* /container */}
</div>
    )
}
export default HotDeal