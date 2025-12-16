import React from "react";
import { render, screen } from "@testing-library/react";
import HeroCarrusel from "./CarruselFenha";


vi.mock("react-slick", () => {
  return {
    default: ({ children }) => <div data-testid="mock-slider">{children}</div>,
  };
});

describe("HeroCarrusel Component", () => {
  it("se renderiza sin errores", () => {
    render(<HeroCarrusel />);
    expect(screen.getByTestId("mock-slider")).toBeInTheDocument();
  });

  it("muestra todas las imágenes configuradas en el carrusel", () => {
    render(<HeroCarrusel />);


    const images = [
      "/images/avatar.jpeg",
      "/images/MTG_Meta-ShareImage.jpg",
      "/images/Tarkir100.jpg",
    ];

    images.forEach((img) => {
      const slide = screen.getByTestId("mock-slider");
      expect(slide.innerHTML).toContain(img);
    });
  });
});
