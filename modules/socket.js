// ** Makes socket and binding declared at www available globally

let io;



const connection=(server)=>{
io = require('socket.io')(server);

//socket test
io.on('connection', (socket) => {
	console.log('a user connected');
	socket.on('disconnect', () => {
	  console.log('user disconnected');
	});


});

}

// Publishes socket with a given data payload
const demo = (data) => {
	console.log('test socket')
	io.emit('dbOpMade', data);

}


module.exports = { connection, demo }