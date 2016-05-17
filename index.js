/*Module dependencies*/


import express from 'express';
import http from 'http';
import engine from 'socket.io';


const port = 3000;
const app = express();


// Configurar la ruta de archivos staticos
app.use('/', express.static(__dirname + '/public'));

app.get('/', (req,res) => {
	res.sendFile(__dirname + '/index.html');
})

let server = http.createServer(app).listen(port, () => {
	console.log(`El servidor está escuchando en el puerto ${port}`)
})


const io = engine.listen(server);

/*escuhar nuevas conexiones*/
io.on('connection', (socket) => {  /*vamos a recibir un socket como parametro*/
	socket.on('message', (msg) => { /*nos suscribimos al metodo message y en el vamos a recibir un msg que va a venir del lado del cliente*/
		io.emit('message', msg)  /*lo que hacemos es emitir ese mensage a todos los clientes que esten suscritos como un evento de tipo message*/
	})  
})