function generateRandomString(length = 16) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        result += chars[randomIndex];
    }
    return result;
}

// Check if there's an inviteCode in the url and attempt to join room
const joinRoom =(socket, inviteCode)=>{
    if(inviteCode){
        const roomCode = inviteCode
        const type = 'join'
        socket.emit("join-room", {roomCode, type});

        socket.on("room-full", (message) => {
          alert(message);
        });

        socket.on("room-joined", (message) => {
          console.log(message);
        });
    }
}

function removeQueryParameter(param) {
  const url = new URL(window.location.href);
  url.searchParams.delete(param);
  window.history.replaceState({}, document.title, url.pathname + url.search);
}


export {generateRandomString, joinRoom, removeQueryParameter}