import { io } from "socket.io-client";

const serverUrl = "http://localhost:3000";
const clientUrl = "http://localhost:8080";
const socket = io(serverUrl);

const urlParams = new URLSearchParams(window.location.search);
const inviteCode = urlParams.get("inviteCode");

// Emit the 'join-room' event
socket.emit("join-room", inviteCode);

// Handle room join responses
socket.on("room-full", (message) => {
  alert(message); // Notify the user
});

socket.on("room-joined", (message) => {
  console.log(message); // Confirm room joining
});

// Trigger a function when the second user joins the room
socket.on("second-user-joined", (message) => {
  console.log(message);
  onSecondUserJoined(); // Call your custom function here
});

// Define the function to run when the second user joins
function onSecondUserJoined() {
  console.log("The second user has joined the room!");
  
}
