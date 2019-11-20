const db = require('../module/pool');
const upload = require('../config/multer');
var express = require('express');
var router = express.Router();

router.post('/', upload.single('ad_url'), async(req, res) => {
    var name = req.body.ad_name;
    var url = req.file.location;

    if(req.body.age == '0~10세'){
        var age = '112';
    }else if(req.body.age == '10대'){
        var age = '1318';
    }else if(req.body.age == '20대'){
        var age = '1939';
    }else if(req.body.age == '30대'){
        var age = '1939';
    }else if(req.body.age == '40대'){
        var age = '4069';
    }else if(req.body.age == '50대'){
        var age = '4069';
    }else if(req.body.age == '60대'){
        var age = '4069';
    }

    if(req.body.gender == '여성'){
        var gender = 'f';
    }else if(req.body.gender == '남성'){
        var gender = 'm';
    }

    if(req.body.emotion == 'neutral' || req.body.emotion =='positive' || req.body.emotion =='negative'){
        var emotion = req.body.emotion;
    }

    if(req.body.time == 'lunch' || req.body.time == 'dinner'){
        var time = req.body.time;
    }

    if(req.body.season == 'spring' || req.body.season == 'summer' || req.body.season == 'autumn' || req.body.season == 'winter'){
        var season = req.body.season;
    }

    if(req.body.weather == 'dust' || req.body.weather == 'hot' || req.body.weather == 'cold'){
        var weather = req.body.weather;
    }

    const insertADQuery = 'INSERT INTO ad (name, url) VALUES (?, ?)';
    const selectADQuery = 'SELECT `ad_idx` FROM ad WHERE `name` = ?';
    const insertTAGQuery = 'INSERT INTO tag (`age`, `gender`, `emotion`, `time`, `season`, `weather`, `ad_idx`) VALUES (?, ?, ?, ?, ?, ? ,?)';
    // const selectADTable =  'SELECT * FROM ad INTO OUTFILE "C:/Users/DS/Documents/github/smartAD/server/smartAD/views/manager_2.csv" FIELDS TERMINATED BY "," '

    const insertTransaction = await db.Transaction(async(connection) => {
        const insertADResult = await connection.query(insertADQuery, [name, url]);
        const selectADResult = await connection.query(selectADQuery, [name]);
        const insertTAGResult = await connection.query(insertTAGQuery, [age, gender, emotion, time, season, weather, selectADResult[0]['ad_idx']]);
        // const selectADTableResult = await connection.query(selectADTable);
    });

    //db에 올리면 db에 있는 ad 테이블의 값들을 다시 웹에 띄워주는 작업해주기!
    if(insertTransaction == 0){
        console("fail");
    }

});

module.exports = router;