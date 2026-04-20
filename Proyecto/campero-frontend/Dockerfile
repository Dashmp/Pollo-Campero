FROM node:20-alpine

WORKDIR /app

# Copiamos la receta de paquetes
COPY package*.json ./

# Instalamos todo ignorando los conflictos estrictos de versión
RUN npm install --legacy-peer-deps

# Copiamos tu código
COPY . .

EXPOSE 4200

# Arrancamos Angular
CMD ["npx", "ng", "serve", "--host", "0.0.0.0", "--poll", "2000", "--disable-host-check"]