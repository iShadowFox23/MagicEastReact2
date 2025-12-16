import api from "./api";


export const listarProductos = () => {
  return api.get("/productos");
};


export const obtenerProducto = (id) => {
  return api.get(`/productos/${id}`);
};


export const crearProducto = (producto) => {
  return api.post("/productos", producto);
};


export const actualizarProducto = (id, producto) => {
  return api.put(`/productos/${id}`, producto);
};


export const eliminarProducto = (id) => {
  return api.delete(`/productos/${id}`);
};


export const crearProductoConImagen = (formData) => {
  return api.post("/productos/crear-con-imagen", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const obtenerImagenProducto = (nombreImagen) => {
  return api.get(`/productos/imagenes/${nombreImagen}`, {
    responseType: "blob",
  });
};
