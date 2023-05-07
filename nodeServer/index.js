const { socket } = require('socket.io');
//NODE JS SERVER WHICH WILL HANDEL socket.IO CONNECTION
const io  = require('socket.io')(8000) //port

const users = {} ;
io.on('connection' , socket => {
    //NEW USER JOIN socket
    socket.on('new-user-joined' , name => {
        console.log("New user" , name)
        users[socket.id] = name ;
        socket.broadcast.emit('user-joined' , name) ; //this will emit a message to all user except the user who joied the chat
    })

    //NEW MESSAGE SEND socket
    socket.on('send' , message => {
        socket.broadcast.emit('receive' , {message: message , name: users[socket.id] })
    })

    //DISCONNECT
    socket.on('disconnect' , message => {
        socket.broadcast.emit('left' , users[socket.id])
        delete users[socket.id] ;
    })

})