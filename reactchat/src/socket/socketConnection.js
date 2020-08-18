import io from "socket.io-client";

let socket = io.connect("http://localhost:5000");

socket.emit("clientTopSocketTest", "I work");

// socket.on("rooms", (rooms) => {
//   console.log("client socket received rooms");
//   // setRooms(rooms);
// });

export default socket;
