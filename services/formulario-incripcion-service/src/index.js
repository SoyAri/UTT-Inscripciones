const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const connectDB = require('./config/db');
const Inscripcion = require('./models/Inscripcion');
// 1. Importamos el modelo LOCAL de Usuario que creaste en este servicio.
const Usuario = require('./models/Usuario');

connectDB();
const app = express();
const PORT = 3003;
app.use(cors());
app.use(express.json());

const authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ msg: 'No hay token, permiso denegado' });
  }
  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded.usuario;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token no es válido' });
  }
};

// Endpoint para crear una nueva inscripción (YA NO DEPENDE DE /api/profile)
app.post('/api/inscripciones', authMiddleware, async (req, res) => {
  try {
    // 2. Verificación de seguridad directa en la base de datos usando el modelo local
    const usuario = await Usuario.findById(req.usuario.id);
    if (!usuario || !usuario.inscripcionPagada) {
      // Si el usuario no existe o su campo 'inscripcionPagada' es false, rechazamos.
      return res.status(403).json({ msg: 'Hubo un error al procesar tu solicitud' });
    }

    // El resto de la lógica para guardar el formulario (sin cambios)
    const inscripcionExistente = await Inscripcion.findOne({ usuarioId: req.usuario.id });
    if (inscripcionExistente) {
      return res.status(400).json({ msg: 'Ya existe una solicitud de inscripción para este usuario.' });
    }
    const nuevaInscripcion = new Inscripcion({
      ...req.body,
      usuarioId: req.usuario.id
    });
    await nuevaInscripcion.save();
    res.status(201).json({ msg: 'Solicitud de inscripción enviada exitosamente.' });
  } catch (error) {
    console.error("Error en POST /api/inscripciones:", error.message);
    res.status(500).send('Error en el servidor');
  }
});

// Endpoint de Estado (sin cambios, necesario para la vista en el frontend)
app.get('/api/inscripciones/status', authMiddleware, async (req, res) => {
  try {
    const inscripcion = await Inscripcion.findOne({ usuarioId: req.usuario.id });
    res.json({ inscripcionEnviada: !!inscripcion });
  } catch (error) {
    res.status(500).send('Error en el servidor');
  }
});

app.listen(PORT, () => {
  console.log(`🚀 El servicio de Inscripción está corriendo en http://localhost:${PORT}`);
});
