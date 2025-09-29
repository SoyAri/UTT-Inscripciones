// services/login-service/src/index.js
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connectDB = require('./config/db');
const Usuario = require('./models/Usuario');
// Ya no se necesita axios

connectDB();
const app = express();
const PORT = 3001;
app.use(cors());
app.use(express.json());

// El endpoint /api/profile SE ELIMINA POR COMPLETO

// Endpoint de Login (se asegura de incluir TODOS los datos necesarios en el token)
app.post('/auth/login', async (req, res) => {
  try {
    const usuario = await Usuario.findOne({ email: req.body.email });
    if (!usuario) {
      return res.status(400).json({ msg: 'Credenciales inválidas.' });
    }
    const isMatch = await bcrypt.compare(req.body.password, usuario.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Credenciales inválidas.' });
    }
    
    // El payload del token es nuestra única fuente de verdad para el frontend
    const payload = {
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        inscripcionPagada: usuario.inscripcionPagada // Esta línea es crucial
      }
    };
    
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '8h' },
      (error, token) => {
        if (error) throw error;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
});

app.listen(PORT, () => {
  console.log(`🚀 El servicio de Login está corriendo en http://localhost:${PORT}`);
});