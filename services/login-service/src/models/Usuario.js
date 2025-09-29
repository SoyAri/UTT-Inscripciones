// src/models/Usuario.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UsuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  inscripcionPagada: { type: Boolean, default: false },
  fechaRegistro: { type: Date, default: Date.now }
});

// Esto es un "hook" o "middleware" de Mongoose.
// Se ejecuta automáticamente ANTES de que un usuario se guarde.
UsuarioSchema.pre('save', async function(next) {
  // Si la contraseña no ha sido modificada, no hacemos nada.
  if (!this.isModified('password')) {
    return next();
  }
  // Generamos un "salt" y hasheamos la contraseña.
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('Usuario', UsuarioSchema);