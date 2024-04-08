const axios = require('axios');
const fs = require('fs');

// Lee el dataset desde un archivo JSON (ejemplo.json)
fs.readFile('dataset-extra1.json', 'utf8', async (err, data) => {
  if (err) {
    console.error('Error al leer el archivo:', err);
    return;
  }

  // Parsea el JSON
  const jsonData = JSON.parse(data);

  // Hace solicitudes a la API para cargar la información en la base de datos
  for (const item of jsonData) {
    try {
      const response = await axios.post('http://localhost:3000', item);
      console.log('Datos cargados con éxito:', response.data);
    } catch (error) {
      console.error('Error al cargar los datos:', error.response.data);
    }
  }
});