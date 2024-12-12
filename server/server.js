const io = require("socket.io")(3000, {
	cors: {
		origin: ["http://localhost:8080"],
	}
})

const rooms = {};
let host = ''; // First client to join
let friend = ''; // Second client to join
let currentTurn = 'home';

function switchTurns(io, host, friend) {
  if (currentTurn === 'home') {
    currentTurn = 'friend';

      io.to(host).emit("turn-update", false);
  	  io.to(friend).emit("turn-update", true);
  } else {
    currentTurn = 'home';

      io.to(host).emit("turn-update", true);
  	  io.to(friend).emit("turn-update", false);
  }
}


let multiplayerGameData = [
    { id: '1', name: 'carte-1', src: 'carte-1.gif', isTempOpen: false, isDiscovered: false, discoveredByPlayer: '' },
    { id: '2', name: 'carte-2', src: 'carte-2.gif', isTempOpen: false, isDiscovered: false, discoveredByPlayer: '' },
    { id: '3', name: 'carte-3', src: 'carte-3.gif', isTempOpen: false, isDiscovered: false, discoveredByPlayer: '' },
    { id: '4', name: 'carte-4', src: 'carte-4.gif', isTempOpen: false, isDiscovered: false, discoveredByPlayer: '' },
    { id: '5', name: 'carte-5', src: 'carte-5.gif', isTempOpen: false, isDiscovered: false, discoveredByPlayer: '' },
    { id: '6', name: 'carte-6', src: 'carte-6.gif', isTempOpen: false, isDiscovered: false, discoveredByPlayer: '' },
    { id: '7', name: 'carte-7', src: 'carte-7.gif', isTempOpen: false, isDiscovered: false, discoveredByPlayer: '' },
    { id: '8', name: 'carte-8', src: 'carte-8.gif', isTempOpen: false, isDiscovered: false, discoveredByPlayer: '' },
    { id: '9', name: 'carte-9', src: 'carte-9.gif', isTempOpen: false, isDiscovered: false, discoveredByPlayer: '' },
    { id: '10', name: 'carte-10', src: 'carte-10.gif', isTempOpen: false, isDiscovered: false, discoveredByPlayer: '' },
    { id: '11', name: 'carte-11', src: 'carte-11.gif', isTempOpen: false, isDiscovered: false, discoveredByPlayer: '' },
    { id: '12', name: 'carte-12', src: 'carte-12.gif', isTempOpen: false, isDiscovered: false, discoveredByPlayer: '' },
    { id: '13', name: 'carte-13', src: 'carte-13.gif', isTempOpen: false, isDiscovered: false, discoveredByPlayer: '' },
    { id: '14', name: 'carte-14', src: 'carte-14.gif', isTempOpen: false, isDiscovered: false, discoveredByPlayer: '' },
    { id: '15', name: 'carte-15', src: 'carte-15.gif', isTempOpen: false, isDiscovered: false, discoveredByPlayer: '' },
    { id: '16', name: 'carte-16', src: 'carte-16.gif', isTempOpen: false, isDiscovered: false, discoveredByPlayer: '' },
    { id: '17', name: 'carte-17', src: 'carte-17.gif', isTempOpen: false, isDiscovered: false, discoveredByPlayer: '' },
    { id: '18', name: 'carte-18', src: 'carte-18.gif', isTempOpen: false, isDiscovered: false, discoveredByPlayer: '' },
    { id: '19', name: 'carte-19', src: 'carte-19.gif', isTempOpen: false, isDiscovered: false, discoveredByPlayer: '' },
    { id: '20', name: 'carte-20', src: 'carte-20.gif', isTempOpen: false, isDiscovered: false, discoveredByPlayer: '' },
    { id: '21', name: 'carte-1', src: 'carte-1.gif', isTempOpen: false, isDiscovered: false, discoveredByPlayer: '' },
    { id: '22', name: 'carte-2', src: 'carte-2.gif', isTempOpen: false, isDiscovered: false, discoveredByPlayer: '' },
    { id: '23', name: 'carte-3', src: 'carte-3.gif', isTempOpen: false, isDiscovered: false, discoveredByPlayer: '' },
    { id: '24', name: 'carte-4', src: 'carte-4.gif', isTempOpen: false, isDiscovered: false, discoveredByPlayer: '' },
    { id: '25', name: 'carte-5', src: 'carte-5.gif', isTempOpen: false, isDiscovered: false, discoveredByPlayer: '' },
    { id: '26', name: 'carte-6', src: 'carte-6.gif', isTempOpen: false, isDiscovered: false, discoveredByPlayer: '' },
    { id: '27', name: 'carte-7', src: 'carte-7.gif', isTempOpen: false, isDiscovered: false, discoveredByPlayer: '' },
    { id: '28', name: 'carte-8', src: 'carte-8.gif', isTempOpen: false, isDiscovered: false, discoveredByPlayer: '' },
    { id: '29', name: 'carte-9', src: 'carte-9.gif', isTempOpen: false, isDiscovered: false, discoveredByPlayer: '' },
    { id: '30', name: 'carte-10', src: 'carte-10.gif', isTempOpen: false, isDiscovered: false, discoveredByPlayer: '' },
    { id: '31', name: 'carte-11', src: 'carte-11.gif', isTempOpen: false, isDiscovered: false, discoveredByPlayer: '' },
    { id: '32', name: 'carte-12', src: 'carte-12.gif', isTempOpen: false, isDiscovered: false, discoveredByPlayer: '' },
    { id: '33', name: 'carte-13', src: 'carte-13.gif', isTempOpen: false, isDiscovered: false, discoveredByPlayer: '' },
    { id: '34', name: 'carte-14', src: 'carte-14.gif', isTempOpen: false, isDiscovered: false, discoveredByPlayer: '' },
    { id: '35', name: 'carte-15', src: 'carte-15.gif', isTempOpen: false, isDiscovered: false, discoveredByPlayer: '' },
    { id: '36', name: 'carte-16', src: 'carte-16.gif', isTempOpen: false, isDiscovered: false, discoveredByPlayer: '' },
    { id: '37', name: 'carte-17', src: 'carte-17.gif', isTempOpen: false, isDiscovered: false, discoveredByPlayer: '' },
    { id: '38', name: 'carte-18', src: 'carte-18.gif', isTempOpen: false, isDiscovered: false, discoveredByPlayer: '' },
    { id: '39', name: 'carte-19', src: 'carte-19.gif', isTempOpen: false, isDiscovered: false, discoveredByPlayer: '' },
    { id: '40', name: 'carte-20', src: 'carte-20.gif', isTempOpen: false, isDiscovered: false, discoveredByPlayer: ''  }
].sort((a, b) => 0.5 - Math.random())

function checkMultipleTempOpen(gameDataArr) {
  let count = 0; 

  for (const card of gameDataArr) {
    if (card.isTempOpen) {
      count++;
    }
  }
  return count >= 2; 
}
function resetTempOpen(gameDataArr) {
  for (const card of gameDataArr) {
    card.isTempOpen = false;
  }
  return gameDataArr
}
function checkMatchingTempOpen(gameDataArr) {
  let tempOpenCards = gameDataArr.filter(card => card.isTempOpen);

  if (tempOpenCards.length === 2) {
    return tempOpenCards[0].name === tempOpenCards[1].name;
  }
  return false;
}
function updateTempOpen(gameDataArr, currentTurn) {
	console.log(currentTurn)
  let tempOpenCards = gameDataArr.filter(card => card.isTempOpen);

  if (tempOpenCards.length === 2 && tempOpenCards[0].name === tempOpenCards[1].name) {
    gameDataArr = gameDataArr.map(card => {
      if (card.isTempOpen) {
        return { 
          ...card, 
          isTempOpen: false, 
          isDiscovered: true, 
          discoveredByPlayer: currentTurn 
        };
      } else {
        return card; 
      }
    });
    return gameDataArr; 
  }

  return gameDataArr; // Return the original gameData if no match
}
function areAllCardsDiscovered(gameDataArr) {
  return gameDataArr.every(card => card.isDiscovered === true);
}






io.on("connection", (socket) => {
	console.log("New WebSocket connection:", socket.id);

	// Handle the 'join-room' event
	  socket.on("join-room", (room) => {
	    if (!rooms[room]) {
	      rooms[room] = new Set(); // Initialize the room if it doesn't exist
	    }

	    // Check if the room already has 2 clients
	    if (rooms[room].size >= 2) {
	      socket.emit("room-full", `Room ${room} is full.`);
	      console.log(`Room ${room} is full. Connection denied for ${socket.id}`);
	      return;
	    }

	    // Add the socket to the room and join it
	    rooms[room].add(socket.id);
	    socket.join(room);
	    console.log(`${socket.id} joined room: ${room}`);
	    socket.emit("room-joined", `Successfully joined room: ${room}`);

	    // Notify all clients in the room if it's now full (second user joined)
	    if (rooms[room].size === 2) {
	      const clientIds = Array.from(rooms[room]); // Get IDs of all clients in the room
	      host = clientIds[0];
	      friend = clientIds[1];
	          // Notify the host to start the game
			  io.to(host).emit("prompt-start-game", {
			    message: "You are the host. Start the game when ready!",
			    players: { host, friend },
			  });

			  // Notify the friend to wait
			  io.to(friend).emit("wait-for-start", {
			    message: "Waiting for the host to start the game...",
			  });
	    }








    	  socket.on("start-game", (room) => {
    	  	  const clientIds = Array.from(rooms[room]); // Get IDs of all clients in the room
		      	host = clientIds[0];
				friend = clientIds[1];


            	io.to(room).emit("game-started", multiplayerGameData);

				      currentTurn = 'home';

				      io.to(host).emit("turn-update", true);
				  	  io.to(friend).emit("turn-update", false);
		      });

		      socket.on("card-flip", (data) => {
			
			    // Get the card that was clicked
			    const cardClicked = multiplayerGameData.find(
			        (card) => card.id === data.cardClickedId
			    );

			    if (!cardClicked) {
			        // Card not found
			        socket.emit("error", { message: "Invalid card ID!" });
			        return;
			    }

			    // If the card is already discovered, ignore the flip
			    if (cardClicked.isDiscovered) {
			        socket.emit("error", { message: "Card already discovered!" });
			        return;
			    }

			    // Mark the card as temporarily open
			    cardClicked.isTempOpen = true;

			    // Emit the updated game state to all clients
			    io.emit("update-game-state", multiplayerGameData);

				const isMultipleTempOpen = checkMultipleTempOpen(multiplayerGameData)

				if(isMultipleTempOpen){
					const doTheyMatch = checkMatchingTempOpen(multiplayerGameData)

					if(doTheyMatch){
						multiplayerGameData = updateTempOpen(multiplayerGameData, currentTurn)

						io.emit("update-game-state", multiplayerGameData);

						const gameOver = areAllCardsDiscovered(multiplayerGameData)
						if(gameOver){
							io.emit("game-over", multiplayerGameData);
						}

					}else{
						setTimeout(function(){
							multiplayerGameData = resetTempOpen(multiplayerGameData)

							io.emit("update-game-state", multiplayerGameData);

							const clientIds = Array.from(rooms[room]); // Get IDs of all clients in the room
							host = clientIds[0];
							friend = clientIds[1];

							switchTurns(io, host, friend)
			        	},600)
					}
				}

			  });




			    // Handle disconnect to remove the client from the room
			    socket.on("disconnect", () => {
			      rooms[room].delete(socket.id);
			      if (rooms[room].size === 0) {
			        delete rooms[room]; // Clean up empty rooms
			      }
			      console.log(`${socket.id} disconnected from room: ${room}`);
			    });

	  });	  
});