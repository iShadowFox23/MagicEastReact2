import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import BackOF from "./BackOF";

//  Mock del componente BackOffice
vi.mock("../components/BackOffice", () => ({
  default: () => <div>BackOffice Component</div>,
}));

describe("BackOF Page", () => {
  it("se renderiza sin errores y muestra el componente BackOffice", () => {
    render(<BackOF />);

    // Verifica que el mock de BackOffice se muestre
    expect(screen.getByText(/BackOffice Component/i)).toBeInTheDocument();
  });
});
