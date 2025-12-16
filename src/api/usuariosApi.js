import api from "./api";


export const registrarUsuario = (data) => {
  return api.post("/usuarios", data);
};


export const listarUsuarios = () => {
  return api.get("/usuarios");
};


export const obtenerUsuarioPorEmail = (email) => {
  return api.get(`/usuarios/${email}`);
};


export const eliminarUsuario = (id) => {
  return api.delete(`/usuarios/${id}`);
};


export const actualizarRolUsuario = (id, rol) => {
  return api.put(`/usuarios/${id}/rol`, { rol });
};

