const express = require('express');
const http = require('http');
const fs = require('fs');
const _ = require('lodash');
const path = require('path');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const port = process.env.PORT || 5000;
const roots = process.argv.slice(2);

const debounce_emit = _.debounce(function (event, file) {
  io.emit('FILE_CHANGED', {event, file})
}, 500);

roots.forEach(rootDir => {
  fs.watch(rootDir, {encoding: 'utf8', recursive: true}, (event, file) => {
    console.log('There was a ' + event + ' at ' + file);
    debounce_emit(event, file);
  })
})

function readRoot(currentDir) {
  const files = fs.readdirSync(currentDir);
  const result = [];
  files.forEach(file => {
    let isDirectory = fs.statSync(path.join(currentDir, file)).isDirectory();

    if (isDirectory) {
      result.push({
        name : file,
        isDirectory: true,
        path : path.join(currentDir, file),
        root : currentDir,
        files: readRoot(path.join(currentDir, file))
      });
    } else {
      let ext = path.extname(file);
      result.push({
        name : file,
        ext : ext,
        isDirectory: false,
        path : path.join(currentDir, file),
        root : currentDir
      });
    }
  })
  return _.orderBy(result, ['isDirectory', 'name'], ['desc', 'asc']);
}

app.get('/files', (req, res) => {
  if (roots.length === 0) {
    roots.push('.');
  }

  const result = [];
  roots.forEach(rootDir => {
    result.push({
        name : path.basename(rootDir),
        isDirectory: true,
        path : rootDir,
        root : null,
        files: readRoot(rootDir)
    });
  })
  res.send(result);
});

server.listen(port, () => console.log(`Listening on port ${port}`));