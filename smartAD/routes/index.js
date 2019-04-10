//server
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

server.listen(3000, () => {
  console.log("start the server usin the port 3000");
});//port열기

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  //socket.emit("hello", {hello : "world!"});//client로 보내는 이벤트인 hello
  socket.on("client1", function(data) {//client에서 first라는 이벤트를 받으면
    console.log(data);//data라는 데이터 출력
  });
});


//서버에서 connection확인하고 io.on("connection", (socket)=>{
//connection되어 있으면 socket.on('client1', function(data){
//    console.log(data)-->data인지 label인지....그러면 결국 demo.py의 label이 출력된다!
//  }
//}