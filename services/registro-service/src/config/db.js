// src/config/db.js
const mongoose = require('mongoose');
require('dotenv').config(); // Carga las variables del archivo .env

const connectDB = async () => {
  try {
    // Lee la dirección de la BD desde nuestras variables de entorno
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB conectado exitosamente.');
  } catch (error) {
    console.error('Error al conectar con MongoDB:', error.message);
    // Si la conexión a la base de datos falla, detenemos la aplicación.
    process.exit(1);
  }
};

module.exports = connectDB;