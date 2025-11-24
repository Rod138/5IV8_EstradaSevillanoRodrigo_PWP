const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const ejs = require('ejs');
require('dotenv').config({ path: './.env' });

const app = express();
const port = 6160;

// Configuración de MySQL.
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

//Conexión a la base de datos.
db.connect((error) => {
    if (error) {
        console.error('Error de conexión a la base de datos: ' + error);
    } else {
        console.log('Conectado a la base de datos MySQL');
    }
});

//Configuración del middleware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Configuración de las vistas.
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//Configuración de la carpeta pública.
app.use(express.static(__dirname + '/css'));

//Creamos el CRUD de la bitácora de mantenimiento preventivo.

//Ruta para mostrar el formulario y la lista de registros de mantenimiento.
app.get('/', (req, res) => {
    const queryBitacoras = `
        SELECT
            b.id,
            b.id_disp,
            e.nombre AS dispositivo_nombre,
            b.fecha_programada,
            b.fecha_ejecucion,
            b.tarea_realizada,
            b.tecnico_responsable,
            b.horas_equipo,
            b.estado_despues_servicio
        FROM bitacora b
        JOIN equipos e ON b.id_disp = e.id
    `;
    const queryDispositivos = `SELECT id, nombre FROM equipos`;
    db.query(queryDispositivos, (errDis, dispositivos) => {
        if (errDis) {
            console.log("Error obteniendo dispositivos:", errDis);
            return res.status(500).send("Error obteniendo dispositivos");
        }
        db.query(queryBitacoras, (errBit, bitacoras) => {
            if (errBit) {
                console.log("Error obteniendo bitácoras:", errBit);
                return res.status(500).send("Error obteniendo bitácoras");
            }
            res.render('index', {
                dispositivos,
                bitacoras
            });
        });
    });
});

//Ruta para eliminar un registro de bitácora.
app.get('/bitacoras/delete/:id', (req, res) => {
    const bitacoraId = req.params.id;
    const query = `DELETE FROM bitacora WHERE id = ${bitacoraId};`;
    db.query(query, (error, results) => {
        if (error) {
            console.log('Error al eliminar el registro de bitácora: ' + error);
            res.status(500).send('Error al eliminar el registro de bitácora');
        }
        res.redirect('/');
    });
});

//Ruta para ver un registro de bitácora.
app.get('/bitacoras/read/:id', (req, res) => {
    const bitacoraId = req.params.id;
    const query = `SELECT
            b.id,
            b.id_disp,
            e.nombre AS dispositivo_nombre,
            b.fecha_programada,
            b.fecha_ejecucion,
            b.tarea_realizada,
            b.tecnico_responsable,
            b.horas_equipo,
            b.estado_despues_servicio
        FROM bitacora b
        JOIN equipos e ON b.id_disp = e.id
        WHERE b.id = ${bitacoraId};`;
    db.query(query, (error, results) => {
        if (error) {
            console.log('Error al obtener el registro de bitácora: ' + error);
            res.status(500).send('Error al obtener el registro de bitácora');
        }
        res.render('read', { bitacora: results[0] });
    });
});

//Ruta para editar un registro de bitácora.
app.get('/bitacoras/edit/:id', (req, res) => {
    const bitacoraId = req.params.id;
    const queryBitacora = `SELECT * FROM bitacora WHERE id = ${bitacoraId};`;
    const queryDispositivos = `SELECT id, nombre FROM equipos`;
    db.query(queryDispositivos, (errDis, dispositivos) => {
        if (errDis) {
            console.log("Error obteniendo dispositivos:", errDis);
            return res.status(500).send("Error obteniendo dispositivos");
        }
        db.query(queryBitacora, (error, results) => {
            if (error) {
                console.log('Error al obtener el registro de bitácora: ' + error);
                res.status(500).send('Error al obtener el registro de bitácora');
            }
            res.render('edit', { bitacora: results[0], dispositivos });
        });
    });
});

app.post('/bitacoras/update/:id', (req, res) => {
    const bitacoraId = req.params.id;
    const { id_disp, fecha_programada, fecha_ejecucion, tarea_realizada, tecnico_responsable, horas_equipo, estado_despues_servicio } = req.body;
    const fechaActual = new Date();
    const fechaProg = new Date(fecha_programada);
    const fechaEjec = new Date(fecha_ejecucion);
    if (fechaProg < fechaActual) {
        return res.status(400).send('La fecha programada no puede ser anterior a la fecha actual');
    }
    if (fechaEjec > fechaActual) {
        return res.status(400).send('La fecha de ejecución no puede ser posterior a la fecha actual');
    }
    if (isNaN(horas_equipo) || horas_equipo < 0 || horas_equipo >= 9999) {
        return res.status(400).send('Las horas de equipo deben ser un número válido mayor o igual a 0 y menor que 9999');
    }
    const horasParts = horas_equipo.toString().split('.');
    if (horasParts.length === 2 && horasParts[1].length > 2) {
        return res.status(400).send('Las horas de equipo no pueden tener más de dos decimales');
    }

    const query = `UPDATE bitacora SET id_disp=${id_disp}, fecha_programada='${fecha_programada}', fecha_ejecucion='${fecha_ejecucion}', tarea_realizada='${tarea_realizada}', tecnico_responsable='${tecnico_responsable}', horas_equipo=${horas_equipo}, estado_despues_servicio='${estado_despues_servicio}' WHERE id = ${bitacoraId};`;
    db.query(query, (error, results) => {
        if (error) {
            console.log('Error al actualizar el registro de bitácora: ' + error);
            res.status(500).send('Error al actualizar el registro de bitácora');
        }
        res.redirect('/');
    });
});

//Ruta para crear un registro nuevo de bitácora.
app.post('/bitacoras', (req, res) => {
    const { id_disp, fecha_programada, tarea_realizada, tecnico_responsable, } = req.body;
    //Comparamos la fecha programada con la fecha actual.
    const fechaActual = new Date();
    const fechaProg = new Date(fecha_programada);
    if (fechaProg < fechaActual) {
        return res.status(400).send('La fecha programada no puede ser anterior a la fecha actual');
    }

    const query = `INSERT INTO bitacora (id_disp, fecha_programada, tarea_realizada, tecnico_responsable) VALUES (${id_disp}, '${fecha_programada}', '${tarea_realizada}', '${tecnico_responsable}');`;
    db.query(query, (error, results) => {
        if (error) {
            console.log('Error al crear el registro de bitácora: ' + error);
            res.status(500).send('Error al crear el registro de bitácora');
        }
        res.redirect('/');
    });
});

//Iniciar servidor.
app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});
