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

const demo=(data)=>{
    console.log('test socket')
    // temp = {
    //     timestamp: 123234235,
    //     policy1: true,
    //     policy2: true,
    //     policy3: false,
    //     policy4: true,
    // }
    io.emit('dbOpMade', data);

}


module.exports ={connection,demo}