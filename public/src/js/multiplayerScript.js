let gameData = []
let yourTurn = false

let gameStarted = false
let itemEl;
const gridContainerEl = document.getElementById('game-grid-container')
const gameOption = document.getElementById('game-option')
const gameGameEl = document.getElementById('game-game')

function changePage(){
    if(gameStarted){
        gameOption.classList.add('display-none')
        gameGameEl.classList.remove('display-none')
    }
}

function startGame(){
    // Dynamiclly reder the photo-card el
    const gameLayOut = gameData.map((item) => {
    return `
        <div class="item hide" id="${item.name}" onclick="setCardFlips(event)" lang="${item.id}">
            <img src="${require(`../assets/images/Cartoon/${item.src}`)}" style="width: 100%;"  id="${item.id}"/>
        </div>
    `
    }).join('')
    gridContainerEl.innerHTML = gameLayOut
    itemEl = document.querySelectorAll('.item')
    itemEl.forEach(item => {
        item.addEventListener('click', (e)=>{
            
        })
    })
}

function updateUI(){
	const gameLayOut = gameData.map((item) => {
    return `
        <div  class="item ${item.isDiscovered == false && item.isTempOpen == false ? 'hide' : ''}" id="${item.name}" ${item.isDiscovered == false && yourTurn ? `onclick="setCardFlips(event)"` : null}  lang="${item.id}">
            <img src="${require(`../assets/images/Cartoon/${item.src}`)}" style="width: 100%;"  id="${item.id}"/>
        </div>
    `
    }).join('')
    gridContainerEl.innerHTML = gameLayOut
}


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
	socket.on("game-started", (multiplayerGameData) => {
		gameData = multiplayerGameData

	    // Additional logic to transition to the game screen
    	inviteLinkQuote.style.display = 'none'
    	gameStarted = true
        changePage()
        startGame()
	});

	window.setCardFlips = (e) => { 
		var cardClickedId = e.target.lang
		const data = {cardClickedId}
		socket.emit("card-flip", data);
	}
	socket.on("update-game-state", (multiplayerGameData) => {
		gameData = multiplayerGameData
		updateUI()
	})
	socket.on("turn-update", (data) => {
	  yourTurn = data;
	  updateUI()
	});
	socket.on("close-card", (multiplayerGameData) => {
		gameData = multiplayerGameData
		updateUI()
	})
}

export default MuliplayerGameMode