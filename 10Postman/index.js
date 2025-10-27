const express = require('express');
const mirrow = require('./endpoints/mirrow.js');

//Vamos a hacer una instancia del servidor
const app = express();
const port = 3000;

app.use(express.json()); //Middleware para parsear JSON
//Definimos cada una de las rutas
app.get('/', mirrow);
app.post('/', mirrow);
app.put('/', mirrow);
app.patch('/', mirrow);
app.delete('/', mirrow);
app.head('/', mirrow);

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
