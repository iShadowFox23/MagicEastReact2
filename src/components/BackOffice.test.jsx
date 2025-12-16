import { describe, it, expect, vi, beforeAll, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";


vi.mock("chart.js", () => {
  const mockChart = vi.fn().mockImplementation(() => ({
    destroy: vi.fn(),
  }));
  mockChart.register = vi.fn();
  return { Chart: mockChart, registerables: [] };
});

vi.mock("@fullcalendar/react", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-calendar">Calendario mock</div>,
}));


import BackOffice from "./BackOffice.jsx";

describe("BackOffice Component", () => {
  beforeAll(() => {

    HTMLCanvasElement.prototype.getContext = vi.fn(() => ({}));
  });

  afterEach(() => cleanup());

  it("renderiza correctamente el sidebar con nombre y marca", () => {
    render(
      <MemoryRouter>
        <BackOffice />
      </MemoryRouter>
    );


    const magicTexts = screen.queryAllByText(/Magic\s*East/i);
    expect(magicTexts.length).toBeGreaterThan(0);


    expect(screen.queryByText(/Nicolás Núñez/i)).toBeInTheDocument();
  });

  it("muestra las tarjetas de métricas", () => {
    render(
      <MemoryRouter>
        <BackOffice />
      </MemoryRouter>
    );

    expect(screen.getByText(/Ventas diarias/i)).toBeInTheDocument();
    expect(screen.getByText(/Ventas semanales/i)).toBeInTheDocument();
    expect(screen.getByText(/Total de gastos/i)).toBeInTheDocument();
    expect(screen.getByText(/Total de ingresos/i)).toBeInTheDocument();
  });

  it("contiene la sección de pagos", () => {
    render(
      <MemoryRouter>
        <BackOffice />
      </MemoryRouter>
    );

    expect(screen.getByText(/Plantilla de Pagos/i)).toBeInTheDocument();
    expect(screen.getByText(/Fernando García/i)).toBeInTheDocument();
    expect(screen.getByText(/\$1\.000\.000/i)).toBeInTheDocument();
  });

  it("renderiza el calendario mock correctamente", () => {
    render(
      <MemoryRouter>
        <BackOffice />
      </MemoryRouter>
    );

    expect(screen.getByTestId("mock-calendar")).toBeInTheDocument();
  });

  it("renderiza el footer con MagicEast y créditos", () => {
    render(
      <MemoryRouter>
        <BackOffice />
      </MemoryRouter>
    );


    const magicTexts = screen.queryAllByText(/Magic\s*East/i);
    expect(magicTexts.length).toBeGreaterThanOrEqual(2);


    expect(screen.getByText(/HTML Codex/i)).toBeInTheDocument();
    expect(screen.getByText(/ThemeWagon/i)).toBeInTheDocument();
  });
});
