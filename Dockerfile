# La imagen base:
FROM node

# Carpeta donde se guarda el proyecto
WORKDIR /app

# Copiar los archivos de configuración de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente de la aplicación
COPY . .

# Exponer el puerto en el que se ejecuta la aplicación
EXPOSE 8080

# Comando para iniciar la aplicación
CMD ["npm", "start"]


//docker run -p 9090:8080 