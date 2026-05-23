const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Simular una base de datos en memoria
let recordatorios = [];

// Ruta para obtener todos los recordatorios (necesaria para tu App de React)
app.get('/api/recordatorios', (req, res) => {
  res.json(recordatorios);
});

// Ruta para agregar una actividad
app.post('/api/recordatorios', (req, res) => {
  const { actividad, mesesFrecuencia } = req.body;

  // Calcular la fecha del próximo recordatorio
  const fechaActual = new Date();
  const proximaFecha = new Date(fechaActual.setMonth(fechaActual.getMonth() + parseInt(mesesFrecuencia)));

  const nuevoRecordatorio = {
    id: Date.now(),
    actividad: actividad,
    frecuenciaMeses: mesesFrecuencia,
    proximoMantenimiento: proximaFecha.toLocaleDateString()
  };

  recordatorios.push(nuevoRecordatorio);
  res.status(201).json({ mensaje: 'Recordatorio creado', data: nuevoRecordatorio });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});