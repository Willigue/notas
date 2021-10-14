import express from 'express'; 
import morgan from 'morgan'; 
import cors from 'cors'; 
import path from 'path';

const app = express();

//CONEXIÓN A BASE DE DATOS
const mongoose = require('mongoose');
//const uri = 'mongodb://localhost:27017/prueba';
const uri = 'mongodb+srv://root:toor@cluster0.3zjk1.mongodb.net/Nota?retryWrites=true&w=majority';
const options = {useNewUrlParser: true, useUnifiedTopology: true};

// Or using promises
mongoose.connect(uri, options).then(
    () => { /** ready to use. The `mongoose.connect()` promise resolves to mongoose instance. */ 
        console.log('Conexión exitosa')
},
    err => { /** handle initial connection error */ 
        error}
  );

//MIDDLEWARE
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(_dirname, 'public')));

//----------------Ruta-----------------
// app.get('/', function (req, res) { res.send('Hola mundo'); }); //comprobación de funcionamiento
app.use('/api', require('./routes/nota'));


// Middleware para Vue.js router modo history 
const history = require('connect-history-api-fallback'); 
app.use(history()); 
app.use(express.static(path.join(__dirname, 'public')));

//-------------------Configuración PUERTO----------------------
// app.listen(3000, function () {    
//     console.log('El servidor escucha por el puerto 3000');
// });

app.set('puerto', process.env.PORT || 3000);
app.listen(app.get('puerto'), function () {
    console.log('App de ejemplo escucha por el puerto '+ app.get('puerto'));
});
