import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import "./BOcss.css";
import { Link } from "react-router-dom";
import { listarOrdenes, actualizarEstadoOrden } from "../api/ordenesApi";

function BOOrdenes() {
    const [ordenes, setOrdenes] = useState([]);
    const [filtrado, setFiltrado] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [busqueda, setBusqueda] = useState("");

    const cargarOrdenes = async () => {
        try {
            const response = await listarOrdenes();
            console.log("Ordenes:", response.data);
            // Ordenar por ID descendente (más recientes primero)
            const ordenadas = response.data.sort((a, b) => b.id - a.id);

            setOrdenes(ordenadas);
            setFiltrado(ordenadas);
            setCargando(false);
        } catch (error) {
            console.error("Error cargando ordenes:", error);
            setCargando(false);
        }
    };

    const cambiarEstado = async (id, nuevoEstado) => {
        try {
            await actualizarEstadoOrden(id, nuevoEstado);

            const actualizadas = ordenes.map((o) =>
                o.id === id ? { ...o, estado: nuevoEstado } : o
            );
            setOrdenes(actualizadas);
            filtrarBusqueda(busqueda, actualizadas);
        } catch (err) {
            console.error("Error cambiando estado:", err);
        }
    };

    const filtrarBusqueda = (texto, lista = ordenes) => {
        setBusqueda(texto);

        const resultado = lista.filter(
            (o) =>
                o.id.toString().includes(texto) ||
                o.usuarioNombre.toLowerCase().includes(texto.toLowerCase())
        );

        setFiltrado(resultado);
    };

    useEffect(() => {
        cargarOrdenes();
    }, []);

    const total = ordenes.length;
    const completadas = ordenes.filter((o) => o.estado === "ENTREGADA" || o.estado === "COMPLETA").length;
    const pendientes = ordenes.filter((o) => o.estado === "PENDIENTE").length;
    const canceladas = ordenes.filter((o) => o.estado === "CANCELADA").length;

    return (
        <div className="dashboard-container">
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
                            className="nav-item nav-link d-flex align-items-center"
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
                            className="nav-item nav-link d-flex align-items-center active"
                        >
                            <div className="sidebar-icon-wrapper">
                                <i className="fa fa-shopping-cart"></i>
                            </div>
                            <span className="ms-2">Ordenes</span>
                        </Link>
                    </div>
                </nav>
            </div>

            <div className="content bg-dark text-light w-100">
                <nav className="navbar navbar-expand bg-secondary navbar-dark sticky-top px-4 py-0">
                    <a href="#" className="sidebar-toggler flex-shrink-0">
                        <i className="fa fa-bars"></i>
                    </a>

                    <form className="d-none d-md-flex ms-4">
                        <input
                            className="form-control bg-dark border-0 text-light"
                            type="search"
                            placeholder="Buscar por ID o Usuario..."
                            value={busqueda}
                            onChange={(e) => filtrarBusqueda(e.target.value)}
                        />
                    </form>

                    <div className="navbar-nav align-items-center ms-auto d-flex flex-row">
                        <Dropdown className="nav-item me-3">
                            <Dropdown.Toggle
                                variant="secondary"
                                className="nav-link d-flex align-items-center text-light border-0"
                            >
                                <i className="fa fa-bell me-lg-2"></i>
                                <span className="d-none d-lg-inline-flex">Alertas</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="bg-secondary text-light border-0">
                                <Dropdown.Item className="text-light">
                                    No hay alertas nuevas
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </nav>

                <div className="container-fluid pt-4 px-4">
                    <div className="row g-4">
                        <div className="col-sm-6 col-xl-3">
                            <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                                <i className="fa fa-list-alt fa-3x text-primary"></i>
                                <div className="ms-3">
                                    <p className="mb-2">Total Ordenes</p>
                                    <h6 className="mb-0">{total}</h6>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6 col-xl-3">
                            <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                                <i className="fa fa-check-circle fa-3x text-success"></i>
                                <div className="ms-3">
                                    <p className="mb-2">Completadas</p>
                                    <h6 className="mb-0">{completadas}</h6>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6 col-xl-3">
                            <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                                <i className="fa fa-clock fa-3x text-warning"></i>
                                <div className="ms-3">
                                    <p className="mb-2">Pendientes</p>
                                    <h6 className="mb-0">{pendientes}</h6>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6 col-xl-3">
                            <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                                <i className="fa fa-times-circle fa-3x text-danger"></i>
                                <div className="ms-3">
                                    <p className="mb-2">Canceladas</p>
                                    <h6 className="mb-0">{canceladas}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container-fluid pt-4 px-4">
                    <div className="pagos-section text-center rounded p-4">
                        <h4 className="text-white mb-4">Gestión de Ordenes</h4>

                        {cargando ? (
                            <p>Cargando ordenes...</p>
                        ) : (
                            <div className="table-responsive">
                                <table className="table align-middle table-hover table-bordered mb-0 pagos-table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Usuario</th>
                                            <th>Fecha</th>
                                            <th>Total</th>
                                            <th>Dirección</th>
                                            <th>Items</th>
                                            <th>Estado</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filtrado.map((o) => (
                                            <tr key={o.id}>
                                                <td>{o.id}</td>
                                                <td>{o.usuarioNombre} (ID: {o.usuarioId})</td>
                                                <td>{new Date(o.fechaCreacion).toLocaleDateString()}</td>
                                                <td>${o.total.toLocaleString("es-CL")}</td>
                                                <td>{o.direccionEnvio}</td>
                                                <td>
                                                    <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
                                                        {o.items.map(item => (
                                                            <li key={item.id}>{item.cantidad}x {item.productoNombre}</li>
                                                        ))}
                                                    </ul>
                                                </td>
                                                <td>
                                                    <Dropdown>
                                                        <Dropdown.Toggle
                                                            variant="secondary"
                                                            className="w-100 text-light"
                                                        >
                                                            <span
                                                                className={`badge px-3 py-2 ${o.estado === "PENDIENTE"
                                                                    ? "bg-warning text-dark"
                                                                    : o.estado === "CONFIRMADA"
                                                                        ? "bg-info text-dark"
                                                                        : o.estado === "ENVIADA"
                                                                            ? "bg-primary"
                                                                            : o.estado === "ENTREGADA"
                                                                                ? "bg-success"
                                                                                : "bg-danger"
                                                                    }`}
                                                            >
                                                                {o.estado}
                                                            </span>
                                                        </Dropdown.Toggle>

                                                        <Dropdown.Menu className="bg-secondary" popperConfig={{ strategy: "fixed" }}>
                                                            {["PENDIENTE", "CONFIRMADA", "ENVIADA", "ENTREGADA", "CANCELADA"].map((estado) => (
                                                                <Dropdown.Item
                                                                    key={estado}
                                                                    className="text-light"
                                                                    onClick={() => cambiarEstado(o.id, estado)}
                                                                >
                                                                    {estado}
                                                                </Dropdown.Item>
                                                            ))}
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>

                <div className="container-fluid pt-4 px-4">
                    <div className="bg-secondary rounded-top p-4 text-center">
                        © MagicEast | BackOffice
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BOOrdenes;
