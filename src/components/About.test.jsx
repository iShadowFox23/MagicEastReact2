import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import About from "./About";

describe("About Component", () => {
  it("se renderiza correctamente y muestra los textos principales", () => {
    render(<About />);

    
    expect(screen.getByText(/Sobre Nosotros/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Tu tienda especializada en Magic: The Gathering/i)
    ).toBeInTheDocument();

    
    expect(screen.getByText(/Nuestra Historia/i)).toBeInTheDocument();
    expect(screen.getByText(/Misión/i)).toBeInTheDocument();
    expect(screen.getByText(/Valores/i)).toBeInTheDocument();

    
    const img = screen.getByAltText(/Banner principal/i);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/images/tienda.jpg");
  });
});
