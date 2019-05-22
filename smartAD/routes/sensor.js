var arduino_list=[];
var temperature;
var fire;
var SerialPort = require('serialport'),
    portName = 'COM4',
    sp = new SerialPort(portName),
    sensorVal = 0;
sp.on('open', function(){
    console.log('Serial Port OPEN');
    sp.on('data', function(data){
        
        for(var i = 0; i < data.length; i++) {
            console.log(data[i]);
            arduino_list.push(data[i]);
        }
        //console.log("Fire/Temparature Sensor Value : ", data[0]);
        // console.log(data[0]);
        //앞의 두자리-온도, 나머지-화재(int형a태)
        //total_data=String(data[0]);
        //temperature=total_data[0]+total_data[1];
        //console.log(temperature);
    });
});
temperature=arduino_list[0];
fire=arduino_list[1];
module.exports.fire=fire;
module.exports.temperature=temperature;
