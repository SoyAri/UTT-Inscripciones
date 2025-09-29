// src/models/Inscripcion.js
const mongoose = require('mongoose');

const InscripcionSchema = new mongoose.Schema({
  // Relación con el usuario que se inscribe
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  // Datos Personales
  nombres: { type: String, required: true },
  apellidos: { type: String, required: true },
  curp: { type: String, required: true, unique: true },
  fechaNacimiento: { type: Date, required: true },
  genero: { type: String, required: true },
  estadoCivil: { type: String },
  
  // Datos de Contacto
  email: { type: String, required: true },
  telefono: { type: String, required: true },
  direccion: { type: String, required: true },

  // Datos Académicos
  carreraInteres: { type: String, required: true },
  turnoPreferido: { type: String, required: true },
  escuelaProcedencia: { type: String, required: true },
  promedioGeneral: { type: Number, required: true },

  // Datos del Tutor (Opcionales)
  tutorNombre: { type: String },
  tutorParentesco: { type: String },
  tutorTelefono: { type: String },
  tutorEmail: { type: String },

  fechaDeInscripcion: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Inscripcion', InscripcionSchema);