const axios = require('axios');
const fs = require('fs');

// Lee el archivo JSON
fs.readFile('dataset-extra1.json', 'utf8', async (err, data) => {
  if (err) {
    console.error('Error al leer el archivo:', err);
    return;
  }

  try {
    // Parsea el JSON
    const jsonData = JSON.parse(data);

    // Verifica si el JSON tiene la estructura esperada
    if (!jsonData.pessoas || !Array.isArray(jsonData.pessoas)) {
      throw new Error('El archivo JSON no tiene la estructura esperada.');
    }

    // Hace solicitudes a la API para cargar la información en la base de datos
    for (const pessoa of jsonData.pessoas) {
      try {
        const response = await axios.post('http://localhost:3000/', pessoa);
        console.log('Datos cargados con éxito:', response.data);
      } catch (error) {
        console.error('Error al cargar los datos:',error);
      }
    }
  } catch (error) {
    console.error('Error al parsear el JSON:', error);
  }
});