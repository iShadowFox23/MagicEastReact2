import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import LoginPag from "./LoginPag";

//  Mock de los componentes hijos
vi.mock("../components/NavBar.jsx", () => ({
  default: () => <nav>NavBar Component</nav>,
}));

vi.mock("../components/login.jsx", () => ({
  default: () => <div>Login Component</div>,
}));

describe("LoginPag", () => {
  it("se renderiza sin errores", () => {
    render(<LoginPag />);
    expect(screen.getByText(/NavBar Component/i)).toBeInTheDocument();
    expect(screen.getByText(/Login Component/i)).toBeInTheDocument();
  });
});
