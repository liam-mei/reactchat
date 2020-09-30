import io from "socket.io-client";
import secrets from "../secrets";

export default function (token) {
  const socket = io.connect(secrets.backendURL, {
    query: { token },
  });
  socket.emit("getRooms");
  // history.push("/rooms");
  return socket;
}
