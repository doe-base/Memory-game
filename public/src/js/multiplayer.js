import '../css/style.css';
import { io } from "socket.io-client"
import MuliplayerGameMode from "./multiplayerScript.js"

const serverUrl = "http://localhost:3000"
const clientUrl = "http://localhost:8080"
const socket = io(serverUrl)
const urlParams = new URLSearchParams(window.location.search);
const inviteCode = urlParams.get("inviteCode");
let startGameBtn = document.getElementById('startGameBtn')
startGameBtn.disabled = true

const joinRoom =(socket, inviteCode)=>{
    // Emit the 'join-room' event
    if(inviteCode){
        socket.emit("join-room", inviteCode);

        // Handle room join responses
        socket.on("room-full", (message) => {
          alert(message); // Notify the user
        });

        socket.on("room-joined", (message) => {
          console.log(message); // Confirm room joining
        });
    }
}
joinRoom(socket, inviteCode)



function generateRandomString(length = 16) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        result += chars[randomIndex];
    }
    return result;
}


let hostAFriendBtn = document.getElementById('hostAFriendBtn')
let inviteLinkSpan = document.getElementById('inviteLinkSpan')
let inviteLinkQuote = document.getElementById('inviteLinkQuote')

inviteLinkSpan.addEventListener("click", (e) => {
    const textToCopy = e.target.innerText;

    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            alert("Link copied to clipboard!");
        })
        .catch(err => {
            console.error("Failed to copy text: ", err);
            alert("Failed to copy the link. Please try again.");
        });
});
hostAFriendBtn.addEventListener("click", (e)=>{
    const createRoom = generateRandomString()
    localStorage.setItem('room', createRoom)

    socket.emit("join-room", createRoom)

    inviteLinkSpan.innerText = `${clientUrl}/multiplayer.html?inviteCode=${createRoom}`
    inviteLinkQuote.style.display = 'block'
})

MuliplayerGameMode(socket)

