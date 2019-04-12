const mysql = require('promise-mysql');
const dbConfig = {
	host : 'smartad.cpctk9fta3ah.ap-northeast-2.rds.amazonaws.com',
	port : '3306',
	user : 'seoyeon',
	password : 'godthing1111',
	database : 'smartAD',
	connectionLimit : 10
};

const dbpool = mysql.createPool(dbConfig);

module.exports = dbpool;