
let hostAFriendBtn = document.getElementById('hostAFriendBtn')
let inviteLinkQuote = document.getElementById('inviteLinkQuote')
let startGameBtn = document.getElementById('startGameBtn')

const MuliplayerGameMode =(socket)=>{
	const inviteCode = localStorage.getItem('room')

	// Trigger a function when the second user joins the room
	socket.on("prompt-start-game", (data) => {
	  console.log(data.message); // "You are the host. Start the game when ready!"
	  console.log("Players in the room:", data.players);

	  inviteLinkQuote.innerHTML = "You are the host. Start the game when ready!"
	  hostAFriendBtn.style.display = "none"
	  startGameBtn.disabled = false
	});
	socket.on("wait-for-start", (data) => {
	  console.log(data.message); // "Waiting for the host to start the game..."
	  
	  inviteLinkQuote.style.display = 'block'
	  inviteLinkQuote.innerHTML = "Waiting for the host to start the game..."
	  hostAFriendBtn.style.display = "none"
	});


	startGameBtn.addEventListener("click", () => {
		const inviteCode = localStorage.getItem('room')
	    const room = inviteCode;

	    socket.emit("start-game", room);
	});
	socket.on("game-started", (message) => {
    alert(message); // Notify the user
    // Additional logic to transition to the game screen
    // document.getElementById("game-info").style.display = "none";
    // document.getElementById("game-option").style.display = "none";
    // document.getElementById("game-game").classList.remove("display-none");
});
}

export default MuliplayerGameMode