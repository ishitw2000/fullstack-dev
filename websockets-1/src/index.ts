import { WebSocketServer, WebSocket } from "ws";
const wss = new WebSocketServer({ port: 8080 });
interface User {
  socket: WebSocket,
  room: string
}
let allSockets: User[] = [];
wss.on("connection", (socket: WebSocket) => {
  socket.on("message", (message: string) => {
    const parsedMessage = JSON.parse(message)
    if (parsedMessage.type === "join") {
      allSockets.push({
        socket,
        room: parsedMessage.payload.roomId
      })
    }
    if (parsedMessage.type === "chat") {
      const currentUserRoom = allSockets.find((x) => x.socket == socket);
      for (let i = 0; i < allSockets.length; i++) {
        if (allSockets[i].room == currentUserRoom?.room) {
          allSockets[i].socket.send(parsedMessage.payload.message);
        }
      }
    }
  })
  socket.on("disconnect", () => {
    allSockets = allSockets.filter(x => x.socket != socket);
  })
});
