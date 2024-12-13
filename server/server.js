const io = require("socket.io")(3000, {
	cors: {
		origin: ["http://localhost:8080"],
	}
})

const rooms = {};
const roomStates = {};
const roomConnectionIntervals = new Map();

function createNewGameData() {
	return [
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
}

function backToDefault(room){
	roomStates[room] = {
    host: '',
    friend: '',
    currentTurn: 'home',
    gameData: createNewGameData(),
  };
}
function switchTurns(io, room, host, friend) {
  if (roomStates[room].currentTurn === 'home') {
    roomStates[room].currentTurn = 'friend';

      io.to(host).emit("turn-update", false);
  	  io.to(friend).emit("turn-update", true);
  } else {
    roomStates[room].currentTurn = 'home';

      io.to(host).emit("turn-update", true);
  	  io.to(friend).emit("turn-update", false);
  }
}
// Check if two cards are opened
function checkMultipleTempOpen(gameDataArr) {
  let count = 0; 

  for (const card of gameDataArr) {
    if (card.isTempOpen) {
      count++;
    }
  }
  return count >= 2; 
}
// Close the open cards
function resetTempOpen(gameDataArr) {
  for (const card of gameDataArr) {
    card.isTempOpen = false;
  }
  return gameDataArr
}
// Check if the opened cards match
function checkMatchingTempOpen(gameDataArr) {
  let tempOpenCards = gameDataArr.filter(card => card.isTempOpen);

  if (tempOpenCards.length === 2) {
    return tempOpenCards[0].name === tempOpenCards[1].name;
  }
  return false;
}
// Update the data if they match
function updateTempOpen(gameDataArr, currentTurn) {
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
// Check if all cards are discovered
function areAllCardsDiscovered(gameDataArr) {
  return gameDataArr.every(card => card.isDiscovered === true);
}

function testConnection(testRoom){
	if(rooms[testRoom]){
		if (rooms[testRoom].size < 2) {

			const clientIds = Array.from(rooms[testRoom])
			const clientLeft = clientIds[0]

			io.to(clientLeft).emit("connection-broken");

			delete rooms[testRoom];

	    if (roomConnectionIntervals.has(testRoom)) {
		    clearInterval(roomConnectionIntervals.get(testRoom));
		    roomConnectionIntervals.delete(testRoom);
		 	}

		}
	}
}


// Entry Function
io.on("connection", (socket) => {
	// console.log("New WebSocket connection:", socket.id);

// HANDLE CONNECTION
	  socket.on("join-room", ({roomCode, type}) => {
	  	const room = roomCode
	  	if(type === 'join'){
	  		if (!rooms[room] || rooms[room].size != 1) {
		     io.to(socket.id).emit("join-room-error");
		     return
		    }
	  	}
	    if (!rooms[room]) {
	      rooms[room] = new Set();
	      roomStates[room] = {
	        host: '',
	        friend: '',
	        currentTurn: 'home',
	        gameData: createNewGameData(),
	      };
	    }

	    // Check if the room already has 2 clients
	    if (rooms[room].size >= 2) {
	      io.to(room).emit("room-full", `Room ${room} is full.`);
	      return;
	    }

	    // Add the socket to the room and join it
	    rooms[room].add(socket.id);
	    socket.join(room);
	    io.to(room).emit("room-joined", `Successfully joined room: ${room}`);

	    // Notify all clients in the room if it's now full (second user joined)
	    if (rooms[room].size === 2) {
	      const clientIds = Array.from(rooms[room]);
	      roomStates[room].host =clientIds[0];
	      roomStates[room].friend =clientIds[1];

	      // Notify the host to start the game
			  io.to(roomStates[room].host).emit("prompt-start-game", {
			    message: "You are the host. Start the game when ready!",
			    players: { host: roomStates[room].host, friend: roomStates[room].friend },
			    role: "host",
			  });

			  // Notify the friend to wait
			  io.to(roomStates[room].friend).emit("wait-for-start", {
			    message: "Waiting for the host to start the game...",
			    role: "guest",
			  });

			  const intervalId = setInterval(() => testConnection(room), 3000);
  			roomConnectionIntervals.set(room, intervalId);
	    }


// GAME LOGIC

    	  socket.on("start-game", (room) => {
    	  	  const clientIds = Array.from(rooms[room]);
			      roomStates[room].host =clientIds[0];
			      roomStates[room].friend =clientIds[1];

            	io.to(room).emit("game-started", roomStates[room].gameData);

				      roomStates[room].currentTurn = 'home';

				      io.to(roomStates[room].host =clientIds[0]).emit("turn-update", true);
				  	  io.to(roomStates[room].friend).emit("turn-update", false);
		    });

		    socket.on("card-flip", (data) => {
					    // Get the card that was clicked
					    const cardClicked = roomStates[room].gameData.find(
					        (card) => card.id === data.cardClickedId
					    );



					    if (!cardClicked) {
					        // Card not found
					        io.to(room).emit("error", { message: "Invalid card ID!" });
					        return;
					    }

					    // If the card is already discovered, ignore the flip
					    if (cardClicked.isDiscovered) {
					        io.to(room).emit("error", { message: "Card already discovered!" });
					        return;
					    }

					    // Mark the card as temporarily open
					    cardClicked.isTempOpen = true;

					    // Emit the updated game state to all clients
					    io.to(room).emit("update-game-state", roomStates[room].gameData);


							const isMultipleTempOpen = checkMultipleTempOpen(roomStates[room].gameData)

							if(isMultipleTempOpen){
								const doTheyMatch = checkMatchingTempOpen(roomStates[room].gameData)

								if(doTheyMatch){
									roomStates[room].gameData = updateTempOpen(roomStates[room].gameData, roomStates[room].currentTurn)

									io.to(room).emit("update-game-state", roomStates[room].gameData);

									const gameOver = areAllCardsDiscovered(roomStates[room].gameData)
									if(gameOver){
										io.to(room).emit("game-over", roomStates[room].gameData);
									}

								}else{
									setTimeout(function(){
										roomStates[room].gameData = resetTempOpen(roomStates[room].gameData)

										io.to(room).emit("update-game-state", roomStates[room].gameData);

										const clientIds = Array.from(rooms[room]);
							      roomStates[room].host =clientIds[0];
							      roomStates[room].friend =clientIds[1];


										switchTurns(io, room, roomStates[room].host, roomStates[room].friend)
						        	},600)
								}
							}
				});

    	  socket.on("end-game", (room) => {
    	  	  const clientIds = Array.from(rooms[room]);
			      roomStates[room].host =clientIds[0];
			      roomStates[room].friend =clientIds[1];

            	io.to(room).emit("game-ended");

            	 if (roomIntervals.has(room)) {
							    clearInterval(roomIntervals.get(room));
							    roomIntervals.delete(room);
							 }
		    });

		    socket.on("restart-game", (room) => {
		    			backToDefault(room)
            	io.to(room).emit("game-started", roomStates[room].gameData);
		    });


			    // Handle disconnect to remove the client from the room
			    socket.on("disconnect", () => {
			    	if(rooms[room]){
			    		rooms[room].delete(socket.id);
			    	}
			      if (rooms[room].size === 0) {
			        delete rooms[room]; // Clean up empty rooms
			      }
			      console.log(`${socket.id} disconnected from room: ${room}`);
			    });

	  });	  
});