import net from "net";
import readline from "readline";

const HOST = "192.168.3.83";
const PORT = 2612;

const client = new net.Socket();

client.connect(PORT, HOST, () => {
  console.log(`[CONECTADO] Conectado ao servidor ${HOST}:${PORT}`);
  promptInput();
});

client.on("data", (data) => {
  console.log(`\n${data.toString()}`);
  promptInput();
});

client.on("close", () => {
  console.log("[DESCONECTADO] Conexão encerrada");
  process.exit();
});

client.on("error", (err) => {
  console.error("[ERRO]", err.message);
  process.exit(1);
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function promptInput() {
  rl.question("Digite: ", (msg) => {
    if (msg.trim()) {
      client.write(msg);
    }
    promptInput();
  });
}
