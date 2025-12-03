const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();

//Configurar las rutas
const cursosRouter = require('./routers/cursosRouters.js');

const app = express();

const db = require('./database/db.js');

//Configurar las vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Configurar el middleware
app.use(express.json());
app.use(cors());

//Vamos a generar una vista estática
app.use(express.static(path.join(__dirname, 'views')));

// Redirigir /vista a la vista de cursos
app.get('/vista', (req, res) => {
    res.redirect('/vista/cursos-ejs');
});

//Ruta de bienvenida
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'bienvenida.html'));
});

//Vamos a renderizar la ruta de consulta
app.get('/vista/cursos-ejs', (req, res) => {
    const sql = ('SELECT * FROM cursos', (err, results) => {
        if (err) {
            console.error('Error al obtener los cursos:', err && err.message ? err.message : err);
            return res.status(500).render('cursos', { cursos: [] });
        }
        return res.render('cursos', { cursos: results });
    });
});

//Usar las rutas
app.use('/cursos', cursosRouter);

// Iniciar servidor
const PORT = 6160;
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
