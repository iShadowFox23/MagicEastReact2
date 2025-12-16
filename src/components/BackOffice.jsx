import React, { useEffect, useRef } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Chart, registerables } from "chart.js";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "bootstrap/dist/css/bootstrap.min.css";
import "./BOcss.css";
import { Link } from "react-router-dom";

function BackOffice() {
  const regionalChartRef = useRef(null);
  const annualChartRef = useRef(null);

  useEffect(() => {
    try {
      Chart.register(...registerables);
    } catch { }
  }, []);

  useEffect(() => {
    const regionalCtx = regionalChartRef.current?.getContext?.("2d");
    const regionalChart = regionalCtx
      ? new Chart(regionalCtx, {
        type: "bar",
        data: {
          labels: ["Norte", "Centro", "Sur"],
          datasets: [
            {
              label: "Ventas ($)",
              data: [3500000, 5000000, 2000000],
              backgroundColor: [
                "rgba(59,130,246,0.6)",
                "rgba(59,130,246,0.6)",
                "rgba(59,130,246,0.6)",
              ],
              borderColor: [
                "rgba(59,130,246,1)",
                "rgba(59,130,246,1)",
                "rgba(59,130,246,1)",
              ],
              borderWidth: 2,
            },
          ],
        },
        options: {
          plugins: { legend: { labels: { color: "#fff" } } },
          scales: {
            x: { ticks: { color: "#ccc" }, grid: { color: "rgba(255,255,255,0.1)" } },
            y: { ticks: { color: "#ccc" }, grid: { color: "rgba(255,255,255,0.1)" } },
          },
        },
      })
      : null;

    const annualCtx = annualChartRef.current?.getContext?.("2d");
    const annualChart = annualCtx
      ? new Chart(annualCtx, {
        type: "line",
        data: {
          labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct"],
          datasets: [
            {
              label: "Ingresos ($)",
              data: [2000000, 2500000, 1800000, 3000000, 2800000, 4000000, 3500000, 4200000, 3700000, 4800000],
              borderColor: "rgba(59,130,246,1)",
              backgroundColor: "rgba(59,130,246,0.2)",
              borderWidth: 3,
              tension: 0.3,
              fill: true,
            },
          ],
        },
        options: {
          plugins: { legend: { labels: { color: "#fff" } } },
          scales: {
            x: { ticks: { color: "#ccc" }, grid: { color: "rgba(255,255,255,0.1)" } },
            y: { ticks: { color: "#ccc" }, grid: { color: "rgba(255,255,255,0.1)" } },
          },
        },
      })
      : null;

    return () => {
      regionalChart?.destroy?.();
      annualChart?.destroy?.();
    };
  }, []);

  const events = [
    { title: "Reunión con proveedor", date: "2025-10-19" },
    { title: "Entrega de stock", date: "2025-10-22" },
    { title: "Cierre mensual", date: "2025-10-31" },
  ];

  return (
    <div className="dashboard-container">

      {/* === SIDEBAR ACTUALIZADO === */}
      <div className="sidebar bg-secondary pe-4 pb-3">
        <nav className="navbar navbar-dark">
          <Link
            to="/"
            className="navbar-brand mx-4 mb-3 text-primary text-decoration-none"
          >
            <h3 className="text-primary m-0">
              <i className="fa fa-box me-2"></i>MagicEast
            </h3>
          </Link>

          <div className="d-flex align-items-center ms-4 mb-4">
            <div className="position-relative">
              <img
                className="profile-pic rounded-circle"
                src="/images/nico.png"
                alt="perfil"
              />
              <div className="online-status"></div>
            </div>
            <div className="ms-3">
              <h6 className="mb-0">Administrador</h6>
              <span>Magic East</span>
            </div>
          </div>

          <div className="navbar-nav w-100">

            <Link
              to="/BackOF"
              className="nav-item nav-link d-flex align-items-center active"
            >
              <div className="sidebar-icon-wrapper">
                <i className="fa fa-book"></i>
              </div>
              <span className="ms-2">Resumen</span>
            </Link>

            <Link
              to="/Stock"
              className="nav-item nav-link d-flex align-items-center"
            >
              <div className="sidebar-icon-wrapper">
                <i className="fa fa-cubes"></i>
              </div>
              <span className="ms-2">Stock</span>
            </Link>

            <Link
              to="/BOusuarios"
              className="nav-item nav-link d-flex align-items-center"
            >
              <div className="sidebar-icon-wrapper">
                <i className="fa fa-users"></i>
              </div>
              <span className="ms-2">Usuarios</span>
            </Link>

            <Link
              to="/BOOrdenes"
              className="nav-item nav-link d-flex align-items-center"
            >
              <div className="sidebar-icon-wrapper">
                <i className="fa fa-shopping-cart"></i>
              </div>
              <span className="ms-2">Ordenes</span>
            </Link>

          </div>
        </nav>
      </div>

      {/* === CONTENIDO PRINCIPAL === */}
      <div className="content bg-dark text-light w-100">

        {/* TOP NAVBAR */}
        <nav className="navbar navbar-expand bg-secondary navbar-dark sticky-top px-4 py-0">
          <a href="#" className="sidebar-toggler flex-shrink-0">
            <i className="fa fa-bars"></i>
          </a>

          <form className="d-none d-md-flex ms-4">
            <input
              className="form-control bg-dark border-0 text-light"
              type="search"
              placeholder="Búsqueda"
            />
          </form>

          {/* mensajes + notificaciones */}
          <div className="navbar-nav align-items-center ms-auto d-flex flex-row">
            <Dropdown className="nav-item me-3">
              <Dropdown.Toggle
                variant="secondary"
                className="nav-link d-flex align-items-center text-light border-0"
              >
                <i className="fa fa-envelope me-lg-2"></i>
                <span className="d-none d-lg-inline-flex">Mensajes</span>
              </Dropdown.Toggle>
            </Dropdown>

            <Dropdown className="nav-item me-3">
              <Dropdown.Toggle
                variant="secondary"
                className="nav-link d-flex align-items-center text-light border-0"
              >
                <i className="fa fa-bell me-lg-2"></i>
                <span className="d-none d-lg-inline-flex">Notificaciones</span>
              </Dropdown.Toggle>
            </Dropdown>
          </div>
        </nav>

        {/* === TARJETAS === */}
        <div className="container-fluid pt-4 px-4">
          <div className="row g-4">
            {[
              { icon: "fa-chart-line", label: "Ventas diarias", value: "$235.000" },
              { icon: "fa-chart-bar", label: "Ventas semanales", value: "$2.500.000" },
              { icon: "fa-chart-area", label: "Total de gastos", value: "$20.000.000" },
              { icon: "fa-chart-pie", label: "Total de ingresos", value: "$75.000.000" },
            ].map((card, i) => (
              <div key={i} className="col-sm-6 col-xl-3">
                <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                  <i className={`fa ${card.icon} fa-3x text-primary`}></i>
                  <div className="ms-3">
                    <p className="mb-2">{card.label}</p>
                    <h6 className="mb-0">{card.value}</h6>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* === GRAFICOS === */}
        <div className="container-fluid pt-4 px-4">
          <div className="row g-4">
            <div className="col-sm-12 col-xl-6">
              <div className="bg-secondary text-center rounded p-4">
                <h6>Ventas Regionales</h6>
                <canvas ref={regionalChartRef}></canvas>
              </div>
            </div>

            <div className="col-sm-12 col-xl-6">
              <div className="bg-secondary text-center rounded p-4">
                <h6>Ventas Anuales</h6>
                <canvas ref={annualChartRef}></canvas>
              </div>
            </div>
          </div>
        </div>

        {/* === CALENDARIO === */}
        <div className="container-fluid pt-4 px-4">
          <div className="bg-secondary rounded p-4">
            <h6>Calendario</h6>
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              height="500px"
              events={events}
            />
          </div>
        </div>

        {/* === FOOTER === */}
        <div className="container-fluid pt-4 px-4">
          <div className="bg-secondary rounded-top p-4 text-center">
            © MagicEast | BackOffice
          </div>
        </div>

      </div>
    </div>
  );
}

export default BackOffice;
