const { WebSocketServer, WebSocket } = require('ws');
const http = require('http');

let messageCach = []

// Servidor HTTP básico
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end("Servidor HTTP funcionando 🚀");
});

// Servidor WebSocket
const wss = new WebSocketServer(
  { port: 8081 },
  () => console.log("WS connected port 8081")
);

wss.on('connection', (socket) => {
  console.log('Novo cliente conectado!');

  // Quando recebe mensagem
  socket.on('message', (message) => {
    //var msg = JSON.parse(message);
    // messageCach.push(`${message}`)
    // console.log(`Mensagem recebida: ${message}`);

    // Envia para todos os clientes
    wss.clients.forEach((client) => {
   
      if (client.readyState === WebSocket.OPEN) 
        {

             // var msgData = JSON.stringify(messageCach);
              client.send(`${message}`);     
       }
    });
  });

  // Quando desconecta
  socket.on('close', () => {
    console.log('Cliente desconectado');
  });
});

