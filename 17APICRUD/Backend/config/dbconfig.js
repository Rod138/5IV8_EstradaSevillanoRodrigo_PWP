import mysql from 'mysql2';
import dotenv from 'dotenv';

//Si vamos a tener una BdD en servidor
//import {fileURLToPath} from 'url';

//const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);

//dotenv.config({path: __dirname + '../../.env'});
dotenv.config({ path: '../../.env' });

const config = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    //connectionLimit: 10,
    //acquireTimeout: 30000,
    //idleTimeout: 30000,
});

config.getConnection((err) => {
    if (err) {
        console.log('Error de conexión a la base de datos:', err);
        return;
    } else {
        console.log('Conexión exitosa a la base de datos');
        connection.realease();
    }
});

export default config;
