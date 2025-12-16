// server.js
import express from "express";
import { join } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

// Servir archivos del build de Vite
app.use(express.static(join(__dirname, "dist")));

// Manejar rutas de React Router (Express 5 usa regex, no "*")
app.get(/.*/, (_req, res) => {
  res.sendFile(join(__dirname, "dist", "index.html"));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
});
