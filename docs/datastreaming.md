# Websocket 

To stream the task data being generated a websocket server is attached to the rest api server on the same port using socket.io

On the client you can connect to the localhost port 3000 and see the tasks created in real-time from the api server. 

```html

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>WebSocket Client</title>
</head>
<body>
  <h1>WebSocket Client</h1>
  <div id="messages"></div>

  <script src="https://cdn.socket.io/4.0.0/socket.io.min.js"></script>
  <script>
    const socket = io('http://localhost:3000');

    socket.on('connect', () => {
      console.log('Connected to the WebSocket server');

      // Example of sending a message to the server
      socket.emit('message', 'Hello, server!');
    });

    socket.on('data', (data) => {
      console.log('Data from server:', data);
      const messagesDiv = document.getElementById('messages');
      const p = document.createElement('p');
      p.innerText = JSON.stringify(data);
      messagesDiv.appendChild(p);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from the WebSocket server');
    });
  </script>
</body>
</html>
```