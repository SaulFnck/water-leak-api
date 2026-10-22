#Construcción (Build)
FROM node:22-alpine AS builder
WORKDIR /app

#dependencias
COPY package*.json ./

# Instalar todas las dependencias
RUN npm ci

# Copiar el código fuente y compilar a JavaScript (carpeta dist/)
COPY . .
RUN npm run build

#Producción
FROM node:22-alpine AS production
WORKDIR /app
COPY package*.json ./

# Instalar únicamente dependencias de producción
RUN npm ci --omit=dev && npm cache clean --force

# Copiar solo el código compilado desde la etapa builder
COPY --from=builder /app/dist ./dist
EXPOSE 3000

# Ejecutar la API 
CMD ["node", "dist/main"]