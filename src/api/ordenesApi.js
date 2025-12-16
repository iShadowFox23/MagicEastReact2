import api from "./api";

export const listarOrdenes = () => {
    return api.get("/ordenes");
};

export const actualizarEstadoOrden = (id, nuevoEstado) => {
    return api.patch(`/ordenes/${id}/estado`, null, {
        params: { nuevoEstado }
    });
};

export const listarOrdenesPorEstado = (estado) => {
    return api.get(`/ordenes/estado/${estado}`);
};
