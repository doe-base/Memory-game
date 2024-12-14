import '../css/style.css';
import { io } from "socket.io-client"
import MuliplayerGameMode from "./multiplayerScript.js"
import { generateRandomString, joinRoom, removeQueryParameter } from "./utility.js"


const serverUrl = "http://localhost:3000"
const clientUrl = "http://localhost:8080"
const socket = io(serverUrl)
localStorage.removeItem("room");

const urlParams = new URLSearchParams(window.location.search);
const inviteCode = urlParams.get("inviteCode");

let startGameBtn = document.getElementById('startGameBtn')
let hostAFriendBtn = document.getElementById('hostAFriendBtn')
let inviteLinkSpan = document.getElementById('inviteLinkSpan')
let inviteLinkQuote = document.getElementById('inviteLinkQuote')
startGameBtn.disabled = true



// Attempt To Join a room
joinRoom(socket, inviteCode)
socket.on("join-room-error", ()=>{
    alert('failed to connect')

    removeQueryParameter('inviteCode')
})
socket.on("connection-broken", ()=>{
    alert('connection is broken, start again')

    removeQueryParameter('inviteCode')
})


// Copy invite link
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

// Generate invite link
hostAFriendBtn.addEventListener("click", (e)=>{
    removeQueryParameter('inviteCode')


    const roomCode = generateRandomString()
    localStorage.setItem('room', roomCode)
    const type = 'create'

    socket.emit("join-room", {roomCode, type})

    inviteLinkSpan.innerText = `${clientUrl}/multiplayer.html?inviteCode=${roomCode}`
    inviteLinkQuote.style.display = 'block'
})

// Handle Multiplayer Game Mode
MuliplayerGameMode(socket)

