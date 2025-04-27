# Usar una imagen base de Node.js
FROM node:20-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar el resto del código fuente
COPY . .

# Exponer el puerto 4200
EXPOSE 4200

# Comando para iniciar el servidor de desarrollo
CMD ["npm", "start", "--", "--host", "0.0.0.0", "--port", "4200"] 