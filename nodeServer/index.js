const { Socket } = require('socket.io');
//NODE JS SERVER WHICH WILL HANDEL SOCKET.IO CONNECTION
const io  = require('socket.io')(8000) //port

const user = {} ;
io.on('connection' , Socket => {
    //NEW USER JOIN SOCKET
    Socket.on('new-user-joined' , name => {
        user[Socket.id] = name ;
        Socket.broadcast.emit('user-joined' , name) ; //this will emit a message to all user except the user who joied the chat
    })

    //NEW MESSAGE SEND SOCKET
    Socket.on('send' , message => {
        Socket.broadcast.emit('receive' , {message: message , name: Socket[Socket.id] })
    })
})