const mysql = require("mysql2");

const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	database: "world",
	password: "admin@sanjeev" || process.env.DATABASE_PASSWORD,
});

connection.connect(function (err) {
	if (err) throw err;
	console.log("MySQL Connected!");
});

module.exports = connection;
