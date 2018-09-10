const express = require('express'),
      path = require('path'),
      morgan = require('morgan'),
      mysql = require('mysql'),
      myConnection = require('express-myconnection');
      const request=require('request');
      const async=require('async');
const app = express();


const customerRoutes = require('./routes/customer');


app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');




app.use(express.static(path.join(__dirname,'public'))) ;

app.get('/aplicacion',(request,response )=>{
response.sendFile(path.join(__dirname,'index.html'));

});




//conexion da la base de datos en la nube
app.use(morgan('dev'));
app.use(myConnection(mysql, {
  host: 'db4free.net',
  user: 'aroncamacho',
  password: 're1234567',
  port: 3306,
  database: 'repasoexamen'
}, 'single'));
app.use(express.urlencoded({extended: false}));


// routes
app.use('/', customerRoutes);

// static files
//app.use(express.static(path.join(__dirname, 'public')));

// starting the server
app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});
