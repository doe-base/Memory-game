const io = require("socket.io")(3000, {
	cors: {
		origin: ["http://localhost:8080"],
	}
})

// Handle WebSocket connections
io.on("connection", (socket) => {
	console.log("New WebSocket connection:", socket.id);

	// Handle the 'join-room' event
	socket.on("join-room", (room) => {
		console.log(`${socket.id} joined room: ${room}`);
		socket.join(room); // Join the room
	});

	  // Listen for join request with inviteCode (room name)
	  socket.on('joinRoom', (inviteCode) => {
	    // Check if the room already has 2 people
	    const roomCount = rooms[inviteCode] || 0;

	    if (roomCount >= 2) {
	      // If the room is full, notify the user
	      socket.emit('roomFull', `Room ${inviteCode} is already full.`);
	    } else {
	      // If the room is not full, add the user to the room
	      socket.join(inviteCode);
	      rooms[inviteCode] = roomCount + 1; // Increment the number of users in the room
	      console.log(`User joined room ${inviteCode}`);

	      // Notify the user that they joined successfully
	      socket.emit('joinedRoom', `Successfully joined room ${inviteCode}`);
	    }
	  });

	  // // Listen for disconnect events to remove users from the room
	  // socket.on('disconnect', () => {
	  //   console.log('A user disconnected');
	  //   // Loop through the rooms to decrement user count
	  //   for (let room in rooms) {
	  //     if (io.sockets.adapter.rooms.get(room)?.has(socket.id)) {
	  //       rooms[room] -= 1; // Decrease the count of users in the room
	  //     }
	  //   }
	  // });
});