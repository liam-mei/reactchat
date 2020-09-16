import io from "socket.io-client";

let socket = io.connect("http://localhost:5000");

// socket.emit("clientTopSocketTest", "I work");

export default socket;
