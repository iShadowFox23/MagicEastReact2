import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Home from "./Home";

//  Mock de los componentes hijos
vi.mock("../components/NavBar.jsx", () => ({
  default: () => <nav>NavBar Component</nav>,
}));

vi.mock("../components/Categorias.jsx", () => ({
  default: () => <section>Categorias Component</section>,
}));

vi.mock("../components/Carrousel/AgregadosRecientemente.jsx", () => ({
  default: () => <div>AgregadosRecientemente Component</div>,
}));

vi.mock("../components/Carrousel/TresCarruseles.jsx", () => ({
  default: () => <div>TresCarruseles Component</div>,
}));

vi.mock("../components/Carrousel/CarruselFenha.jsx", () => ({
  default: () => <div>HeroCarrusel Component</div>,
}));

describe("Home Page", () => {
  it("se renderiza correctamente y muestra todos los componentes principales", () => {
    render(<Home />);

    expect(screen.getByText(/NavBar Component/i)).toBeInTheDocument();
    expect(screen.getByText(/Categorias Component/i)).toBeInTheDocument();
    expect(
      screen.getByText(/AgregadosRecientemente Component/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/HeroCarrusel Component/i)).toBeInTheDocument();
    expect(screen.getByText(/TresCarruseles Component/i)).toBeInTheDocument();
  });
});
