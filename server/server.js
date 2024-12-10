const io = require("socket.io")(3000, {
	cors: {
		origin: ["http://localhost:8080"],
	}
})



const rooms = {};
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
	      const host = clientIds[0]; // First client to join
	      const friend = clientIds[1]; // Second client to join

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
			console.log('God abeg', room)
            console.log(`Game started in room: ${room}`);
            io.to(room).emit("game-started", "The game has started!");
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