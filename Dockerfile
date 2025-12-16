# Imagen base con Node.js 20 (requerido por Vite 7)
FROM node:20

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar archivos del proyecto
COPY . .

# Instalar dependencias
RUN npm install

# Construir la app (crea la carpeta dist/)
RUN npm run build

# Exponer el puerto usado por Express
EXPOSE 3000

# Comando para iniciar el servidor
CMD ["npm", "start"]
