const express = require('express');

const server = express();
const projectRouter = require('./routers/projectRouter')
const actionRouter = require('./routers/actionRouter')
const logger = require("./middleware/logger")


server.use(logger());
server.use(express.json());
server.use('/api/projects', projectRouter)
server.use('/api/actions', actionRouter)
server.get('/', (req, res) => {
  res.send(`<h2>hello node api challenge</h2>`);
});





module.exports = server;
