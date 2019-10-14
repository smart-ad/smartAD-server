//server
const app = require('express')();
const server = require('http').createServer(app);
const http = require('http');
const io = require('socket.io').listen(server);
const db = require('../config/dbPool.js');
const async = require('async');
const moment = require('moment')
const axios = require('axios');
const cheerio = require('cheerio');
const request = require('request');
const client = require('cheerio-httpcli');
const path = require('path');

/* 
 * port 열기
 */
server.listen(3002, () => {
  console.log('start the server using the port 3002');
})

app.get('/', (req, res, next) => {
  try { 
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.sendFile('main.html', { root: path.join(__dirname, '../views') });
  }
  catch (error) {
    return next("500");
  }
});

/* 
 * socket server open
 */
io.on('connection', (socket) => {

  let _result, result;
  let selectQuery = `
                    SELECT name, url
                    FROM ad, tag 
                    WHERE ad.ad_idx = tag.ad_idx 
                    AND tag.age = ? 
                    AND (tag.gender = ? OR tag.gender is null)
                    AND (tag.emotion = ? OR tag.emotion is null)
                    AND (tag.time = ? OR tag.time is null)
                    AND (tag.season =? OR tag.season is null)
                    AND (tag.weather =? OR tag.weather is null)
                    ORDER BY RAND() LIMIT 1
                    `

  /* 
 * get socket-event (python client1)
 */
  socket.on('client1', async(data) => {
    let gender = data[1];
    let emotion = data[2];
    let _weather = data[3];
    let weather_text = data[4];
    let _dust = data[5];
    let _gender, _age, age, weather, season, time;

    /* 
     * weather data (dust, hot, cold)
     */        
    if(_dust == '나쁨') {
      weather = 'dust';
    }
    else if(27 <= _weather) {
      weather = 'hot';
    }
    else if(_weather <= 5) {
      weather = 'cold';
    }
    else {
      weather = null;
    }

    /* 
     * time data (lunch, dinner)
     */
    let _time=moment().format();
    _time = parseInt(_time[11])*10 + parseInt(_time[12]);

    if(11 <=_time && _time <= 14) {
      time = 'lunch';
    }
    else if(17 <= _time && _time <= 20) {
      time = 'dinner';
    } 
    else {
      time = null;
    }
    
    /* 
     * season data (winter, spring, summer, autumn)
     */
    let time_season = moment().format('MMMM');

    if(time_season == 'November' || time_season == 'December' || time_season == 'January' ) {
      season = 'winter';
    }
    else if(time_season == 'February' || time_season == 'March' ||time_season == 'April' ) {
      season = 'spring';
    }
    else if(time_season == 'May' || time_season == 'June' || time_season == 'July' ) {
      season = 'summer';
    }
    else if(time_season == 'August' || time_season == 'September' || time_season == 'October' ) {
      season = 'autumn';
    }

    /* 
     * emotion data (neutral => null)
     */
    if (emotion == 'neutral') {
      emotion = null;
    }

    /* 
     * age data (112, 1318, 1939, 4069)
     */
    if (parseInt(data[0]) > 0 && parseInt(data[0]) < 13) {
      age = '112';
    }
    else if (parseInt(data[0]) > 12 && parseInt(data[0]) < 19) {
      age = '1318';
    }
    else if (parseInt(data[0]) > 18 && parseInt(data[0]) < 40) {
      age = '1939';
    }
    else if (parseInt(data[0]) > 39) {
      age = '4069';
    }

    /* 
     * age data to show html (0~10세, 10대, 20대, 30대, 40대, 50대, 60대, 70대)
     */
    if (parseInt(data[0]) > 0 && parseInt(data[0]) < 10) {
      _age = '0~10세';
    }
    if (parseInt(data[0]) > 9 && parseInt(data[0]) < 20) {
      _age = '10대';
    }
    else if (parseInt(data[0]) > 19 && parseInt(data[0]) < 30) {
      _age = '20대';
    }
    else if (parseInt(data[0]) > 29 && parseInt(data[0]) < 40) {
      _age = '30대';
    }
    else if (parseInt(data[0]) > 39 && parseInt(data[0]) < 50) {
      _age = '40대';
    }
    else if (parseInt(data[0]) > 49 && parseInt(data[0]) < 60) {
      _age = '50대';
    }
    else if (parseInt(data[0]) > 59 && parseInt(data[0]) < 70) {
      _age = '60대';
    }
    else if (parseInt(data[0]) > 69) {
      _age = '70대';
    }

    /* 
     * gender data to show html (여성, 남성)
     */
    if (gender == 'f') {
      _gender = '여성';
    }
    else if (gender == 'm') {
      _gender = '남성';
    }

    /* 
     * DB connecttion
     */
    _result = await db.query(selectQuery, [age, gender, emotion, time, season, weather]);

    /* 
     * data object to show html
     */
    if(_result != undefined) {
      const ad_age_gender = [];
      ad_age_gender.push(_result[0]['url']);
      ad_age_gender.push(_age);
      ad_age_gender.push(_gender);
      ad_age_gender.push(_dust);
      ad_age_gender.push(_weather);
      ad_age_gender.push(weather_text);
      socket.broadcast.emit('ad', ad_age_gender);
    }    
  });

 /* 
  * get socket-event (html restart)
  */
  socket.on('restart', () => {
    try{
      finish = true;
      io.sockets.emit('finish');
      console.log("finish");
    }
    catch(err){
      console.log(err);
      console.log("emit start Err");
    }
  });

  socket.on('Error', function (err) {
    console.log('Socket error');
  });

  socket.on('disconnect', function (err) {
    console.log('Socket is disconnected!');
  });

  socket.on('forceDisconnect', function() {
    socket.disconnect();
  })
});

module.exports = app;