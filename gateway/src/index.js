// gateway/src/index.js
const express = require('express');
const cors = require('cors');
const proxy = require('express-http-proxy');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Redirige las peticiones de /auth/login al servicio de Login
app.use('/auth/login', proxy('http://localhost:3001', {
  // Esta opción es CLAVE: asegura que se reenvíe la ruta completa.
  proxyReqPathResolver: function (req) {
    return '/auth/login';
  }
}));

// Redirige las peticiones de /auth/register al servicio de Registro
app.use('/auth/register', proxy('http://localhost:3002', {
  proxyReqPathResolver: function (req) {
    return '/auth/register';
  }
}));

// Le decimos al Gateway que también debe manejar la sub-ruta /status
app.use('/api/inscripciones/status', proxy('http://localhost:3003', {
  proxyReqPathResolver: (req) => '/api/inscripciones/status'
}));

// Proxy para el servicio de Inscripción (Puerto 3003)
app.use('/api/inscripciones', proxy('http://localhost:3003', {
  proxyReqPathResolver: (req) => '/api/inscripciones'
}));

app.get('/', (req, res) => {
  res.send('API Gateway funcionando. 🚪');
});

app.listen(PORT, () => {
  console.log(`API Gateway corriendo en http://localhost:${PORT}`);
});