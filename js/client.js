const socket = io('http://localhost:8000') ;

const form = document.getElementById('send-container') ;
const messageInput = document.getElementById('messageInp') ;
const messageContainer = document.querySelector(".container") ;

const append = (message , position) => {
    const messageElement = document.createElement('div') ;
    messageElement.innerText = message ;
    messageElement.classList.add('message')
    messageElement.classList.add(position)
    messageContainer.append(messageElement) ;
}

//My message send
form.addEventListener('submit' , (e) => {
    e.preventDefault() ;
    const message = messageInput.value ;
    append(`You: ${message}` , 'right') ;
    socket.emit('send' , message) ;
    messageInput.value = '' ;

})

const name = prompt("Enter Your Name to Join Chat!!") ;
socket.emit('new-user-joined' , name) ;

//user joined
socket.on('user-joined' , name => {
    append(`${name} Joined the chat` , 'right')
})

//user Recived
socket.on('receive' , data => {
    append(`${data.name}: ${data.message}` , 'left')
})