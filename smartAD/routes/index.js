//server
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
// const db = require('../config/dbPool.js');
const async = require('async');

server.listen(3000, () => {
  console.log("start the server usin the port 3000");
});//port열기

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  
  // 날짜
  // var d= new Date();
  // var localTime=d.toLocaleTimeString();
  // document.getElementById('')
  
  let _result, result;
  let selectQuery = `SELECT name, url 
                     FROM ad, tag 
                     WHERE ad.ad_idx = tag.ad_idx 
                     AND tag.age = ? 
                     AND (tag.gender = ? OR tag.gender is Null) 
                     AND (tag.emotion = ? OR tag.emotion is Null)
                     ORDER BY RAND() LIMIT 1  
                    `
  //client로 보내는 이벤트인 hello
  socket.on("client1", async(data) => {
    let gender = data[1];
    let emotion = data[2];
    let age;
    if (parseInt(data[0]) > 0 && parseInt(data[0]) < 13) {
      age = "112"
    }
    else if (parseInt(data[0]) > 12 && parseInt(data[0]) < 19) {
      age = "1318"
    }
    else if (parseInt(data[0]) > 18 && parseInt(data[0]) < 40) {
      age = "1939"
    }
    else if (parseInt(data[0]) > 39) {
      age = "4069"
    }
    _result = await db.query(selectQuery, [age, gender, emotion]);
    console.log(_result)
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) { console.log(data); });
  });
  socket.on('Error', function (err) {
    console.log(err);
  });
  socket.on('Disconnect', function (err) {
    console.log(err);
  });
  socket.on('disconnect', () => {
    console.log("Socket is disconnected!")
  });
});