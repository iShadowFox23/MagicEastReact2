import React from "react";
import Carrusel from "./Carrusel";

function TresCarruseles() {
  return (
    <div className="tres-carruseles">
      <Carrusel 
        titulo="Mazos Preconstruidos"
        categoria="Mazo Preconstruido"
      />

      <Carrusel 
        titulo="Accesorios TCG"
        categoria="Accesorios TCG"
      />

      <Carrusel 
        titulo="Booster Packs"
        categoria="Booster Packs"
      />
    </div>
  );
}

export default TresCarruseles;
