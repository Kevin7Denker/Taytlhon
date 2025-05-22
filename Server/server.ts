import net from "net";

const clients: net.Socket[] = [];

function broadcast(message: string, sender: net.Socket) {
  clients.forEach((client) => {
    if (client !== sender) {
      client.write(message);
    }
  });
}

function handleClient(socket: net.Socket) {
  const remoteAddress = `${socket.remoteAddress}:${socket.remotePort}`;
  console.log(`[NOVA CONEXÃO] ${remoteAddress}`);
  clients.push(socket);

  socket.on("data", (data) => {
    const message = `[${remoteAddress}] ${data.toString()}`;
    console.log(message);
    broadcast(message, socket);
  });

  socket.on("close", () => {
    console.log(`[DESCONECTADO] ${remoteAddress}`);
    clients.splice(clients.indexOf(socket), 1);
  });

  socket.on("error", (err) => {
    console.error(`[ERRO] ${remoteAddress}:`, err.message);
  });
}

const server = net.createServer(handleClient);

server.listen(2612, "192.168.3.83", () => {
  console.log("[ESPERANDO CONEXÕES] Servidor ouvindo em 192.168.3.83:2612");
});
