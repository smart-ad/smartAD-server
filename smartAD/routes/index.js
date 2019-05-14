//server
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const db = require('../config/dbPool.js');
const async = require('async');
const moment = require('moment')
const axios = require('axios');
const cheerio = require('cheerio');
const request = require('request');
const client=require('cheerio-httpcli');

/* 
 * port 열기
 */
server.listen(3000, () => {
  console.log('start the server usin the port 3000');
}); 

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

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

  socket.on('client1', async(data) => {
    let url ='https://weather.naver.com/rgn/townWetr.nhn?naverRgnCd=09320105';
    let gender = data[1];
    let emotion = data[2];
    let age, weather, season, time;
    
    /* 
     * weather data (dust, hot, cold)
     */
    await client.fetch(url, function(err, $, res) {
        
      if(err) {
        console.log(err);
        return;
      }

      $('.fl').each(function(post){
        weather_crawling=(($(this).children()[1])['children'][0])['data'];
        _dust=(((((((($(this).children()[2])['children'])[8])['children'])[1])['children'])[1])['children'][0])['data'];
        _weather=parseInt(weather_crawling.replace(/(\s*)/g,''));
        
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
      });
    });

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

    if(time_season == 'November' || 'December' || 'January' ) {
      season = 'winter';
    }
    else if(time_season == 'February' || 'March' || 'April' ) {
      season = 'spring';
    }
    else if(time_season == 'May' || 'June' || 'July' ) {
      season = 'summer';
    }
    else if(time_season == 'August' || 'September' || 'October' ) {
      season = 'autumn';
    }

    /* 
     * age data (112, 1318, 1939, 4069)
     */
    if (parseInt(data[0]) > 0 && parseInt(data[0]) < 13) {
      age = '112'
    }
    else if (parseInt(data[0]) > 12 && parseInt(data[0]) < 19) {
      age = '1318'
    }
    else if (parseInt(data[0]) > 18 && parseInt(data[0]) < 40) {
      age = '1939'
    }
    else if (parseInt(data[0]) > 39) {
      age = '4069'
    }

    /* 
     * DB connecttion
     */ 
    _result = await db.query(selectQuery, [age, gender, emotion, time, season, weather]);
    console.log(_result);
    
    if(_result != undefined) {
      socket.broadcast.emit('ad', _result);
    }
  });
  socket.on('Error', function (err) {
    console.log(err);
  });
  socket.on('disconnect', () => {
    console.log('Socket is disconnected!')
  });
});