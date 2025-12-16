import React, { useEffect, useRef, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Chart, registerables } from "chart.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./BOcss.css";
import { Link } from "react-router-dom";
import {
  listarProductos,
  actualizarProducto,
  crearProductoConImagen,
  eliminarProducto,
} from "../api/productosApi";
import { Modal, Button, Form } from "react-bootstrap";

const CATEGORIAS = ["Accesorios TCG", "Mazo Preconstruido", "Booster Packs"];

function StockBackOffice() {
  const stockChartRef = useRef(null);
  const [productos, setProductos] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [productoEdit, setProductoEdit] = useState(null);
  const [guardando, setGuardando] = useState(false);
  const [errorEdicion, setErrorEdicion] = useState(null);

  const [categoriaFiltro, setCategoriaFiltro] = useState("todos");
  const [busqueda, setBusqueda] = useState("");

  const [showCrearModal, setShowCrearModal] = useState(false);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    marca: "",
    categorias: "",
    precio: "",
    stock: "",
    descripcion: "",
  });
  const [imagenNueva, setImagenNueva] = useState(null);
  const [guardandoNuevo, setGuardandoNuevo] = useState(false);
  const [errorNuevo, setErrorNuevo] = useState(null);

  const categoriasUnicas = [...new Set(productos.map((p) => p.categorias))];

  const handleAbrirModal = (producto) => {
    setProductoEdit({ ...producto });
    setErrorEdicion(null);
    setShowModal(true);
  };

  const handleCerrarModal = () => {
    setShowModal(false);
    setProductoEdit(null);
    setGuardando(false);
    setErrorEdicion(null);
  };

  const handleChangeEdit = (e) => {
    const { name, value } = e.target;
    setProductoEdit((prev) => ({
      ...prev,
      [name]: name === "precio" || name === "stock" ? Number(value) : value,
    }));
  };

  const handleGuardarCambios = async () => {
    if (!productoEdit) return;
    setGuardando(true);
    setErrorEdicion(null);
    try {
      await actualizarProducto(productoEdit.id, productoEdit);
      setProductos((prev) =>
        prev.map((p) => (p.id === productoEdit.id ? productoEdit : p))
      );
      setGuardando(false);
      setShowModal(false);
    } catch (err) {
      console.error(err);
      setErrorEdicion("No se pudo guardar los cambios.");
      setGuardando(false);
    }
  };

  const handleAbrirCrearModal = () => {
    setNuevoProducto({
      nombre: "",
      marca: "",
      categorias: "",
      precio: "",
      stock: "",
      descripcion: "",
    });
    setImagenNueva(null);
    setErrorNuevo(null);
    setShowCrearModal(true);
  };

  const handleCerrarCrearModal = () => {
    setShowCrearModal(false);
    setGuardandoNuevo(false);
    setErrorNuevo(null);
  };

  const handleChangeNuevo = (e) => {
    const { name, value } = e.target;
    setNuevoProducto((prev) => ({
      ...prev,
      [name]: name === "precio" || name === "stock" ? Number(value) : value,
    }));
  };

  const handleImagenNuevaChange = (e) => {
    const file = e.target.files?.[0] || null;
    setImagenNueva(file);
  };

  const handleCrearNuevoProducto = async () => {
    setGuardandoNuevo(true);
    setErrorNuevo(null);
    try {
      const formData = new FormData();
      formData.append("nombre", nuevoProducto.nombre);
      formData.append("marca", nuevoProducto.marca);
      formData.append("categorias", nuevoProducto.categorias);
      formData.append("precio", nuevoProducto.precio || 0);
      formData.append("stock", nuevoProducto.stock || 0);
      formData.append("descripcion", nuevoProducto.descripcion || "");
      if (imagenNueva) formData.append("imagen", imagenNueva);
      const resp = await crearProductoConImagen(formData);
      const creado = resp.data;
      setProductos((prev) => [...prev, creado]);
      setGuardandoNuevo(false);
      setShowCrearModal(false);
    } catch (err) {
      console.error("Error al crear producto:", err);
      setErrorNuevo("No se pudo crear el producto. Intenta nuevamente.");
      setGuardandoNuevo(false);
    }
  };

  const [errorGeneral, setErrorGeneral] = useState(null);

  const handleEliminarProducto = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este producto?")) return;
    setErrorGeneral(null);
    try {
      await eliminarProducto(id);
      setProductos((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Error al eliminar producto:", err);
      setErrorGeneral("No se pudo eliminar el producto.");
    }
  };

  const getEstado = (stock) => {
    if (stock === 0) return "Agotado";
    if (stock <= 5) return "Bajo Stock";
    return "Disponible";
  };

  useEffect(() => {
    try {
      Chart.register(...registerables);
    } catch { }
  }, []);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const resp = await listarProductos();
        setProductos(resp.data || []);
      } catch (err) {
        console.error("Error al listar productos:", err);
      }
    };
    fetchProductos();
  }, []);

  useEffect(() => {
    if (productos.length === 0) return;
    const ctx = stockChartRef.current?.getContext?.("2d");
    if (!ctx) return;

    const categorias = [...new Set(productos.map((p) => p.categorias))];
    const stockPorCategoria = categorias.map((cat) =>
      productos
        .filter((p) => p.categorias === cat)
        .reduce((acc, p) => acc + (p.stock || 0), 0)
    );

    const stockChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: categorias,
        datasets: [
          {
            label: "Unidades en Stock",
            data: stockPorCategoria,
            backgroundColor: "rgba(59,130,246,0.6)",
            borderColor: "rgba(59,130,246,1)",
            borderWidth: 2,
          },
        ],
      },
      options: {
        plugins: { legend: { labels: { color: "#fff" } } },
        scales: {
          x: {
            ticks: { color: "#ccc" },
            grid: { color: "rgba(255,255,255,0.1)" },
          },
          y: {
            ticks: { color: "#ccc" },
            grid: { color: "rgba(255,255,255,0.1)" },
          },
        },
      },
    });

    return () => stockChart.destroy();
  }, [productos]);

  const totalProductos = productos.length;
  const disponibles = productos.filter((p) => getEstado(p.stock) === "Disponible").length;
  const bajoStock = productos.filter((p) => getEstado(p.stock) === "Bajo Stock").length;
  const agotados = productos.filter((p) => getEstado(p.stock) === "Agotado").length;

  return (
    <div className="dashboard-container">
      <div className="sidebar bg-secondary pe-4 pb-3">
        <nav className="navbar navbar-dark">
          <Link to="/" className="navbar-brand mx-4 mb-3 text-primary text-decoration-none">
            <h3 className="text-primary m-0">
              <i className="fa fa-box me-2"></i>MagicEast
            </h3>
          </Link>

          <div className="d-flex align-items-center ms-4 mb-4">
            <div className="position-relative">
              <img className="profile-pic rounded-circle" src="/images/nico.png" alt="perfil" />
              <div className="online-status"></div>
            </div>
            <div className="ms-3">
              <h6 className="mb-0">Administrador</h6>
              <span>Magic East</span>
            </div>
          </div>

          <div className="navbar-nav w-100">
            <Link to="/BackOF" className="nav-item nav-link d-flex align-items-center">
              <div className="sidebar-icon-wrapper">
                <i className="fa fa-book"></i>
              </div>
              <span className="ms-2">Resumen</span>
            </Link>

            <Link to="/Stock" className="nav-item nav-link d-flex align-items-center active">
              <div className="sidebar-icon-wrapper">
                <i className="fa fa-cubes"></i>
              </div>
              <span className="ms-2">Stock</span>
            </Link>

            <Link to="/BOusuarios" className="nav-item nav-link d-flex align-items-center">
              <div className="sidebar-icon-wrapper">
                <i className="fa fa-users"></i>
              </div>
              <span className="ms-2">Usuarios</span>
            </Link>

            <Link to="/BOOrdenes" className="nav-item nav-link d-flex align-items-center">
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
              placeholder="Buscar producto..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value.toLowerCase())}
            />
          </form>

          <div className="navbar-nav align-items-center ms-auto d-flex flex-row">
            <Dropdown className="nav-item me-3">
              <Dropdown.Toggle variant="secondary" className="nav-link d-flex align-items-center text-light border-0">
                <i className="fa fa-bell me-lg-2"></i>
                <span className="d-none d-lg-inline-flex">Alertas</span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="bg-secondary text-light border-0">
                {bajoStock > 0 && (
                  <Dropdown.Item className="text-light">
                    <h6 className="fw-normal mb-0">{bajoStock} producto(s) con bajo stock</h6>
                    <small>Hace 10 min</small>
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </nav>

        <div className="container-fluid pt-4 px-4">
          <div className="row g-4">
            <div className="col-sm-6 col-xl-3">
              <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                <i className="fa fa-cubes fa-3x text-primary"></i>
                <div className="ms-3">
                  <p className="mb-2">Productos Totales</p>
                  <h6 className="mb-0">{totalProductos}</h6>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-xl-3">
              <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                <i className="fa fa-check-circle fa-3x text-success"></i>
                <div className="ms-3">
                  <p className="mb-2">Disponibles</p>
                  <h6 className="mb-0">{disponibles}</h6>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-xl-3">
              <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                <i className="fa fa-exclamation-triangle fa-3x text-warning"></i>
                <div className="ms-3">
                  <p className="mb-2">Bajo Stock</p>
                  <h6 className="mb-0">{bajoStock}</h6>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-xl-3">
              <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                <i className="fa fa-times-circle fa-3x text-danger"></i>
                <div className="ms-3">
                  <p className="mb-2">Agotados</p>
                  <h6 className="mb-0">{agotados}</h6>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid pt-4 px-4">
          <div className="bg-secondary text-center rounded p-4">
            <h6>Distribución de Stock por Categoría</h6>
            <canvas ref={stockChartRef}></canvas>
          </div>
        </div>

        <div className="container-fluid pt-4 px-4">
          <div className="pagos-section text-center rounded p-4">
            <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-4 gap-3">
              <h5 className="text-white mb-0">Inventario de Productos</h5>

              {errorGeneral && <div className="text-danger fw-bold">{errorGeneral}</div>}

              <div className="d-flex flex-wrap gap-2 justify-content-center">
                <button
                  className={`btn btn-sm ${categoriaFiltro === "todos" ? "btn-primary" : "btn-outline-primary"}`}
                  onClick={() => setCategoriaFiltro("todos")}
                >
                  Todos
                </button>

                {categoriasUnicas.map((cat, i) => (
                  <button
                    key={i}
                    className={`btn btn-sm ${categoriaFiltro === cat ? "btn-primary" : "btn-outline-primary"}`}
                    onClick={() => setCategoriaFiltro(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <button className="btn btn-success btn-sm" onClick={handleAbrirCrearModal}>
                + Agregar producto
              </button>
            </div>

            <div className="table-responsive">
              <table className="table align-middle table-hover table-bordered mb-0 pagos-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Producto</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Estado</th>
                    <th>Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                  {productos
                    .filter((p) => p.nombre.toLowerCase().includes(busqueda))
                    .filter((p) => (categoriaFiltro === "todos" ? true : p.categorias === categoriaFiltro))
                    .map((p, i) => {
                      const estado = getEstado(p.stock);
                      return (
                        <tr key={i}>
                          <td>{p.id}</td>
                          <td>
                            <button className="producto-nombre-btn" onClick={() => handleAbrirModal(p)}>
                              {p.nombre}
                            </button>
                          </td>
                          <td>{p.categorias}</td>
                          <td>{p.precio != null ? `$${p.precio.toLocaleString("es-CL")}` : "Sin precio"}</td>
                          <td>{p.stock}</td>
                          <td>
                            <span
                              className={`badge ${estado === "Disponible"
                                ? "bg-success"
                                : estado === "Bajo Stock"
                                  ? "bg-warning text-dark"
                                  : "bg-danger"
                                }`}
                            >
                              {estado}
                            </span>
                          </td>
                          <td>
                            <button className="btn btn-danger btn-sm" onClick={() => handleEliminarProducto(p.id)}>
                              <i className="fa fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="container-fluid pt-4 px-4">
          <div className="bg-secondary rounded-top p-4 text-center">
            © MagicEast | Designed by <a href="https://htmlcodex.com">HTML Codex</a> | Distributed by{" "}
            <a href="https://themewagon.com">ThemeWagon</a>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={handleCerrarModal} centered dialogClassName="modal-custom">
        <Modal.Header closeButton>
          <Modal.Title>Editar producto</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {productoEdit && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" name="nombre" value={productoEdit.nombre || ""} onChange={handleChangeEdit} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Marca</Form.Label>
                <Form.Control type="text" name="marca" value={productoEdit.marca || ""} onChange={handleChangeEdit} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Categoría</Form.Label>
                <Form.Select name="categorias" value={productoEdit.categorias || ""} onChange={handleChangeEdit}>
                  <option value="">Selecciona una categoría</option>
                  {CATEGORIAS.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Precio</Form.Label>
                <Form.Control type="number" name="precio" value={productoEdit.precio ?? ""} onChange={handleChangeEdit} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Stock</Form.Label>
                <Form.Control type="number" name="stock" value={productoEdit.stock ?? ""} onChange={handleChangeEdit} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="descripcion"
                  value={productoEdit.descripcion || ""}
                  onChange={handleChangeEdit}
                />
              </Form.Group>

              {errorEdicion && <div className="text-danger small">{errorEdicion}</div>}
            </Form>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCerrarModal} disabled={guardando}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleGuardarCambios} disabled={guardando}>
            {guardando ? "Guardando..." : "Guardar cambios"}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showCrearModal} onHide={handleCerrarCrearModal} centered dialogClassName="modal-custom">
        <Modal.Header closeButton>
          <Modal.Title>Agregar producto</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" name="nombre" value={nuevoProducto.nombre} onChange={handleChangeNuevo} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Marca</Form.Label>
              <Form.Control type="text" name="marca" value={nuevoProducto.marca} onChange={handleChangeNuevo} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Categoría</Form.Label>
              <Form.Select name="categorias" value={nuevoProducto.categorias} onChange={handleChangeNuevo}>
                <option value="">Selecciona una categoría</option>
                {CATEGORIAS.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Precio</Form.Label>
              <Form.Control type="number" name="precio" value={nuevoProducto.precio} onChange={handleChangeNuevo} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control type="number" name="stock" value={nuevoProducto.stock} onChange={handleChangeNuevo} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control as="textarea" rows={3} name="descripcion" value={nuevoProducto.descripcion} onChange={handleChangeNuevo} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Imagen</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={handleImagenNuevaChange} />
            </Form.Group>

            {errorNuevo && <div className="text-danger small">{errorNuevo}</div>}
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCerrarCrearModal} disabled={guardandoNuevo}>
            Cancelar
          </Button>
          <Button variant="success" onClick={handleCrearNuevoProducto} disabled={guardandoNuevo}>
            {guardandoNuevo ? "Guardando..." : "Crear producto"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default StockBackOffice;
