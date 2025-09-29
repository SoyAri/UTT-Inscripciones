const mongoose = require('mongoose');

// Este es un "plano" del usuario, idéntico al del login-service.
// Le permite a este microservicio entender cómo leer los datos de la colección 'usuarios'.
const UsuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  inscripcionPagada: { type: Boolean, default: false },
  fechaRegistro: { type: Date, default: Date.now }
});

// OJO: No incluimos el hook de encriptar contraseña aquí.
// Este servicio solo necesita LEER, no crear ni modificar usuarios.

module.exports = mongoose.model('Usuario', UsuarioSchema);
