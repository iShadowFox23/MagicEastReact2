import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Catalogo from "./Catalogo";

// Mock de useNavigate de react-router-dom
const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

// Mock del JSON de productos (agregando `default`)
vi.mock("../data/Productos.json", () => ({
  default: [
    {
      id: 1,
      nombre: "Mazo Dragones",
      categoria: "Mazos Preconstruidos",
      precio: 29990,
      imagen: "/images/dragones.jpg",
    },
    {
      id: 2,
      nombre: "Sobres Alquimia",
      categoria: "Sobres",
      precio: 3990,
      imagen: "/images/sobres.jpg",
    },
    {
      id: 3,
      nombre: "Mazo Vampiros",
      categoria: "Mazos Preconstruidos",
      precio: 24990,
      imagen: "/images/vampiros.jpg",
    },
  ],
}));

describe("Catalogo Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza el título correctamente", () => {
    render(<Catalogo />);
    expect(screen.getByText(/Catálogo de Productos/i)).toBeInTheDocument();
  });

  it("muestra solo productos de la categoría 'Mazos Preconstruidos'", () => {
    render(<Catalogo />);
    const productos = screen.getAllByRole("heading", { level: 3 });
    expect(productos).toHaveLength(2);
    expect(screen.getByText("Mazo Dragones")).toBeInTheDocument();
    expect(screen.getByText("Mazo Vampiros")).toBeInTheDocument();
    expect(screen.queryByText("Sobres Alquimia")).not.toBeInTheDocument();
  });

  it("navega correctamente al hacer clic en 'Ir al producto'", () => {
    render(<Catalogo />);
    const boton = screen.getAllByText(/Ir al producto/i)[0];
    fireEvent.click(boton);
    expect(mockNavigate).toHaveBeenCalledWith("/productodetalle/1");
  });
});
