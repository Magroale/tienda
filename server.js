// Importar módulos
const express = require('express');
const path = require('path');
const User = require('./models/user'); // Asegúrate de que esta ruta sea correcta
const app = express();

// Configuración de Middleware
app.use(express.json()); // Para procesar JSON
app.use(express.static(path.join(__dirname, 'public'))); // Servir archivos estáticos

// Ruta de ejemplo para obtener usuarios desde la base de datos
app.get('/users', async (req, res) => {
    try {
        const users = await User.find(); // Consulta a la base de datos
        res.json(users); // Enviar la lista de usuarios como respuesta JSON
    } catch (error) {
        res.status(500).send('Error al obtener los usuarios');
    }
});

// Ruta para la página de inicio
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'views', 'index.html'));
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
