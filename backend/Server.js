// Creating a server
const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {
    cors:{origin:'*'}
})

io.on('connection', (socket) => {
    socket.on('canvas-data', (data) => {
        // Server emit canvas data
        socket.broadcast.emit('canvas-data', data)
    })
})

// Server listen to port 5000
server.listen(5000, ()=> {
    console.log('Listening to port 5000');
})