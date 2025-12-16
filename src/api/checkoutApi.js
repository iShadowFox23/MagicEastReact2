import api from "./api";


export const procesarCompra = (compra) => {
  return api.post("/checkout", compra);
};

export const crearOrden = (orden) => {
  return api.post("/ordenes", orden);
};
