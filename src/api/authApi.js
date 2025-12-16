import axios from "axios";


export const login = (email, contrasena) => {
  return axios.post("http://3.135.235.62:8080/auth/login", {
    email: email,
    contrasena: contrasena
  });
};
