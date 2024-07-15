const socketIO = require("socket.io");

const initializeSocket = (server)=>{
    const io = socketIO(server, {
        cors:{origin: '*'}
    });

    io.on('connection', (socket)=>{
        console.log('New client connected');
    
        socket.on('disconnected', ()=>{
            console.log('Client disconnected');
        });
    });
    
    return io;
}

module.exports = initializeSocket;

