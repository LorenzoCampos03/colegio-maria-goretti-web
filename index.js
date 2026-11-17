const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');
const moment = require('moment-timezone');

const app = express();
const PORT = 3000;
const ip = 'localhost';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const conexion = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    database: process.env.DB_NAME || "defaultdb",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || ""
});

conexion.connect((err) => {
    if (err) {
        console.error('Error de conexiÃ³n a la base de datos local:', err);
        return;
    }
    console.log('Conectado a la base de datos local.');
});

app.post('/submit-form', (req, res) => {
    console.log(req.body); // Imprime los datos recibidos
    const { 
        userName,
        userLastName,
        studentGrade,
        guardianName,
        userEmail,
        phoneNumber,
        docType,
        address,
        docNumber,
        feedbackType,
        studentName,
        message
    } = req.body;

    const query = 'INSERT INTO tabla_usuarios (userName, userLastName, studentGrade, guardianName, userEmail, phoneNumber, docType, address, docNumber, feedbackType, studentName, message) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    
    conexion.query(query, [
        userName,
        userLastName,
        studentGrade,
        guardianName,
        userEmail,
        phoneNumber,
        docType,
        address,
        docNumber,
        feedbackType,
        studentName,
        message
    ], (err, result) => {
        if (err) {
            console.error('Error al insertar datos: ' + err.stack);
            res.status(500).send('OcurriÃ³ un error al procesar tu consulta.');
            return;
        }

        res.redirect('/');
    });
});


// Ruta para obtener los eventos del calendario
app.get('/events', (req, res) => {
    const today = moment().tz('America/Lima').format('YYYY-MM-DD');
    const query = 'SELECT Name_event, date FROM school_calendar WHERE date = ?';
    
    conexion.query(query, [today], (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Error al conectar con la base de datos local' });
            return;
        }
        if (results.length > 0) {
            const event = results[0];
            event.date = moment(event.date).format('DD-MM-YYYY');
            res.json(event);
        } else {
            res.json({ message: 'No hay eventos para hoy' });
        }
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'), (err) => {
        if (err) {
            console.error('Error al enviar index.html:', err);
            res.status(500).send('Error interno del servidor.');
        } else {
            console.log('Se ha enviado index.html correctamente.');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://${ip}:${PORT}`);
});

