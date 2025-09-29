// src/index.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // Nuestra lógica de conexión
const Usuario = require('./models/Usuario'); // Nuestro modelo de usuario

// 1. Conectar a la base de datos
connectDB();

const app = express();
const PORT = 3002; // Usaremos el puerto 3002 para este servicio

// 2. Middlewares
app.use(cors()); // Habilita la comunicación con el frontend
app.use(express.json()); // Permite al servidor entender datos en formato JSON

// 3. Endpoint de Registro
app.post('/auth/register', async (req, res) => {
  const { nombre, email, password } = req.body;

  try {
    // Verificar si el usuario ya existe
    let usuario = await Usuario.findOne({ email });
    if (usuario) {
      return res.status(400).json({ msg: 'El correo electrónico ya está registrado.' });
    }

    // Crear el nuevo usuario (la contraseña se hashea automáticamente por el hook)
    usuario = new Usuario({ nombre, email, password });

    // Guardar en la base de datos
    await usuario.save();

    res.status(201).json({ msg: '¡Usuario registrado exitosamente!' });

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
});

// 4. Iniciar el servidor
app.listen(PORT, () => {
  console.log(`El servicio de Registro está corriendo en http://localhost:${PORT}`);
});