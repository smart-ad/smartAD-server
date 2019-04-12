//server
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const db = require('../config/dbPool.js');
const async = require('async');

server.listen(3000, () => {
  console.log("start the server usin the port 3000");
});//port열기

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  //var d= new Date();
  //var localTime=d.toLocaleTimeString();
  //document.getElementById('')
  let _result, result;
  let selectQuery = `SELECT name, url 
                     FROM ad 
                     WHERE ad.idx = tag.idx 
                     AND tag.age = ? 
                     AND (tag.gender = ? OR tag.gender = Null) 
                     AND (tag.emotion = ? OR tag.emotion = Null)
                     ORDER BY RAND() LIMIT 1  
                     `
  //client로 보내는 이벤트인 hello
  socket.on("client1", async (data) => {
    let age = data[0];
    let gender = data[1];
    let emotion = data[2];
    _result = await db.Query(selectQuery, [age, gender, emotion]);
  });
  socket.on('Error', function (err) {
    console.log(err);
  });
  socket.on('Disconnect', function (err) {
    console.log(err);
  });
  socket.on('disconnect', () => {
    console.log("Socket is disconnected!")
    socket.open();
  });
  socket.emit("ad", {ad : _result});
});
