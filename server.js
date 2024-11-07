const express = require('express');
const figlet = require('figlet');
const app = express();
const port = 3000;

app.use(express.static('public'));

// Endpoint para obtener todas las fuentes
app.get('/fonts', (req, res) => {
    figlet.fonts((err, fonts) => {
        if (err) {
            console.error('Error obteniendo fuentes:', err);
            res.status(500).send('Error obteniendo fuentes');
            return;
        }
        res.json(fonts); // Envía la lista de fuentes en formato JSON
    });
});

// Endpoint para convertir texto
app.get('/convert', (req, res) => {
    const text = req.query.text || '';
    const font = req.query.font || 'Standard';

    figlet.text(text, { font: font }, (err, result) => {
        if (err) {
            console.error('Error con figlet:', err);
            res.status(500).send('Error generando el texto.');
            return;
        }
        res.send(result);
    });
});

// Endpoint de prueba para el formulario de ping
app.get('/ping', (req, res) => {
    const dominio = req.query.dominio;
    res.send(`Ping a ${dominio}`);
});

app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});
