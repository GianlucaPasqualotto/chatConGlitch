console.log("JavaScript funcionando correctamente")

const socketClient = io();

let user;

Swal.fire({
    title:"Hola usuario",
    text:"Bienvenido, ingresa tu usuario",
    input:"text",
    allowOutsideClick:false
}).then(respuesta=>{
    //console.log(respuesta));
    user = respuesta.value;
});

const campo = document.getElementById("messageField")

campo.addEventListener("keydown",(evt)=>{
    console.log(evt.key)
    if(evt.key === "Enter"){
        socketClient.emit("message",{
            userName:user,
            message:campo.value
        })
    }
})

const messageContainer = document.getElementById("messageContainer")
socketClient.on("historico",(data)=>{
    let elementos = ""
    data.forEach(item=>{
        elementos = elementos + `<p><trong>${item.userName}</strong>: ${item.message}</p>`
    });
    messageContainer.innerHTML = elementos;
})

socketClient.on("newUser",()=>{
    Swal.fire({
        text:"Nuevo usuario conectado",
        toas:true
    })
})