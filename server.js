// Express
const express = require('express');
const server = express();

// DotENV
require('dotenv').config();

server.use(express.json());

// Routes
const Projects = require('./Routes/Projects');
server.use('/api/projects', Projects);
const Resources = require('./Routes/Resources');
server.use('/api/resources', Resources);
const Tasks = require('./Routes/Tasks');
server.use('/api/tasks', Tasks);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log('Server running.'));