import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import CatalogoPage from "./CatalogoPage";


vi.mock("../components/NavBar", () => ({
  default: () => <nav>NavBar Component</nav>,
}));

vi.mock("../components/Catalogo", () => ({
  default: () => <section>Catalogo Component</section>,
}));

vi.mock("../components/Carrousel/CarruselFenha", () => ({
  default: () => <div>HeroCarrusel Component</div>,
}));

describe("CatalogoPage", () => {
  it("se renderiza correctamente y muestra los componentes principales", () => {
    render(<CatalogoPage />);

    expect(screen.getByText(/NavBar Component/i)).toBeInTheDocument();
    expect(screen.getByText(/HeroCarrusel Component/i)).toBeInTheDocument();
    expect(screen.getByText(/Catalogo Component/i)).toBeInTheDocument();
  });
});
