
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";      
import "slick-carousel/slick/slick-theme.css"; 
import "./CarruselFenha.css"


const HeroCarrusel = () => {
  const images = [
    "/images/avatar.jpeg",
    "/images/MTG_Meta-ShareImage.jpg",
    "/images/Tarkir100.jpg",
  ];

  const settings = {
    dots: true,         
    infinite: true,    
    speed: 800,           
    slidesToShow: 1,    
    slidesToScroll: 1,     
    autoplay: true,        
    autoplaySpeed: 4000,  
    arrows: true,         
    pauseOnHover: true,    
    adaptiveHeight: true,   
  };

  return (
    <section className="hero">
      <div className="hero__slider-wrapper">
        <Slider {...settings} className="hero__slider">
          {images.map((img, index) => (
            <div key={index} className="hero__slide">
              <div
                className="hero__items"
                style={{
                  backgroundImage: `url(${img})`,
                }}
              ></div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default HeroCarrusel;
