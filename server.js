//llamo a mis paquetes
var express = require('express'); //llamoa express
var app = express(); //define  nuestras aplicaciones utilizando express
var bodyParser = require('body-parser');
var sql = require('mssql');
var cors = require('cors');

app.use(cors());
///////////////////////////////////////////////////////RESTAPI:////////////////////////////////////////////////////////////////////
var config = {
  server: '170.117.20.7', // You can use 'localhost\\instance' to connect to named instance
  database: 'VeTerr',
  user: 'sa',
  password: 'A*96NIXZ1996'
}

//configura la  app  utilizando bodyParser()
//
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
///////////////////////////////////////////////////////DECLARACION DEL PUERTO:////////////////////////////////////////////////////////////////////
var port = process.env.PORT || 8080; // set our port
// ruteos por api
// =============================================================================
var router = express.Router(); // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
///////////////////////////////////////////////////////METODO_CONSULTAR:////////////////////////////////////////////////////////////////////
router.post('/q', function(req, res) { // QrC=Consulta Cliente después del slash lo nombro
  //
  var tabla=req.body.t;
  // val
  var val =req.body.v;
  //
  var where=req.body.w;

  var sentence  ="select "+val+" from "+tabla+" where "+ where +" ";

  console.dir(sentence);

  var connection = new sql.Connection(config, function(err) {
    var request = new sql.Request(connection); // or: var request = connection.request();
    request.query(sentence, function(err, recordset) { //CONSULTO A CLIENTE, TENER EN  CUENTA  LA CONCATENACION ESTA LOA CLAVE
      connection.close();
      res.json(recordset);
    });
  });
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////METODO_INSERTAR:////////////////////////////////////////////////////////////////////
router.post('/i', function(req, res) { // IeE=Insertar Cliente después del slash lo nombro
  // req.body
  // req.body = PARAMETROS QEU SE ENVIAN
  console.dir(req.body);

  var tabla = req.body.t;

  var vals = req.body.v;

  var sentence  ="insert into " + tabla + " values  (" + vals + ")";

  console.dir(sentence);

  //despues de tabla: ("+mb+")

  var connection = new sql.Connection(config, function(err) {
    var request = new sql.Request(connection); // or: var request = connection.request();
    request.query(sentence, function(err, recordset) { //CONSULTO A CLIENTE, TENER EN  CUENTA  LA CONCATENACION ESTA LOA CLAVE
      //request.query("insert into rol values ('bahr')", function(err, recordset) {
      connection.close();
      res.send(err);
    });
  });
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////METODO_ACTUALIZAR:////////////////////////////////////////////////////////////////////
router.post('/a', function(req, res) { // a=actualizar Cliente después del slash lo nombro
  // req.body
  // req.body = PARAMETROS QEU SE ENVIAN
  console.dir(req.body);

  var tabla = req.body.tble;

  var valores = req.body.vres; //= " nombre = 'pep', columna2 ='carmesi' , col3='ñolas' "

  var filtro = req.body.fler; //nombnre

  var connection = new sql.Connection(config, function(err) {
    var request = new sql.Request(connection); // or: var request = connection.request();
    request.query("update " + tabla + " set  " + valores + " where  " + filtro + " ", function(err, recordset) { //CONSULTO A CLIENTE, TENER EN  CUENTA  LA CONCATENACION ESTA LOA CLAVE
      //request.query("insert into rol values ('bahr')", function(err, recordset) {
      connection.close();
      res.send(err);
    });
  });
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

//execute sp_enlace

router.post('/me', function(req, res) {
  console.dir('Gatico miau');                        // me=
  //
  var enlace=req.body.e;    // a rest api  le  envio e

  var ejecut  ="execute   "+enlace;

  //console.dir(sentence);

  var connection = new sql.Connection(config, function(err) {
    var request = new sql.Request(connection); // or: var request = connection.request();
    request.query(ejecut, function(err, recordset) { //CONSULTO A CLIENTE, TENER EN  CUENTA  LA CONCATENACION ESTA LOA CLAVE
      console.dir(recordset);
      connection.close();
      res.json(recordset);
    });
  });
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// more routes for our API will happen here
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
/////////////////////////////////////////////////////////////////////////////////
