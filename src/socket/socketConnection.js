import io from "socket.io-client";
import secrets from "../secrets";

let socket = io.connect(secrets.backendURL);

// socket.emit("clientTopSocketTest", "I work");

export default socket;
