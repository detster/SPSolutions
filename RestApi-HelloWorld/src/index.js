const express = require('express');
const app = express();
const morgan = require('morgan');
//Settings
app.set('port', process.env.PORT || 8090);
app.set('json spaces', 1);
//Middlewares
app.use(morgan('dev'));
//  Estos comando nos permite recibir e interpretar
//  la informacion en formato json
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Routes
app.get('/', (req, res) => res.send('hello world'));
//  Aqui definimos los archivos que contendran las rutas a utilizar para la obtencion 
//  y recepcion de informacion
app.use(require('./routes/index-routes'));
//  Se define la ruta /api/sps/helloworld/v1 para todas las rutas que se pudieran encontrar
//  dentro del archivo
app.use('/api/sps/helloworld/v1', require('./routes/comic'));

//Starting server
app.listen(8090, () => {
  console.log('Server on port ', app.get("port"));
});