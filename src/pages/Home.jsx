import React from 'react';
import NavBar from '../components/NavBar.jsx';
import Categorias from '../components/Categorias.jsx';
import CallToAction from '../components/CallToAction.jsx';
import AgregadosRecientemente from '../components/Carrousel/AgregadosRecientemente.jsx';
import TresCarruseles from '../components/Carrousel/TresCarruseles.jsx';
import HeroCarrusel from '../components/Carrousel/CarruselFenha.jsx';

function Home() {
  return (
    <>

      <NavBar />
      <CallToAction />
      <Categorias />
      <AgregadosRecientemente />
      <HeroCarrusel />
      <TresCarruseles />
    </>
  );
}

export default Home;
