const http = require('http');
const { connectDB } = require('./models/db');
const { handleRequest } = require('./routes');
PATH = '..'
require('dotenv').config({ path: `${PATH}/.env`})
connectDB();

const PORT = process.env.PORT || 3000;
const server = http.createServer(handleRequest);

server.on('error', err => {
  console.error(err);
  server.close();
});

server.on('close', () => console.log('Server closed.'));

server.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
