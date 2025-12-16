import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Blog from "./Blog";

describe("Blog Component", () => {
  it("se renderiza sin errores y muestra los títulos del blog", () => {
    render(
      <MemoryRouter>
        <Blog />
      </MemoryRouter>
    );

    
    expect(screen.getByText(/Blog MagicEast/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Noticias, eventos, tutoriales y más!/i)
    ).toBeInTheDocument();

    
    expect(
      screen.getByText(/Aprende a jugar Magic: The Gathering/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Commander de miedo/i)).toBeInTheDocument();
    expect(screen.getByText(/Tabla anual precon LandFall/i)).toBeInTheDocument();

    
    const tutorialLink = screen.getByRole("link", {
      name: /Aprende a jugar Magic: The Gathering/i,
    });
    expect(tutorialLink).toHaveAttribute("href", "/tutorial");
  });
});
