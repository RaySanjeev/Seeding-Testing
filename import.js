const fs = require("fs");
const mysql = require("mysql2");

const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	database: "world",
	password: "admin@sanjeev" || process.env.DATABASE_PASSWORD,
});

const importCityData = () => {
	const queryStr1 = "select * from city";

	connection.query(queryStr1, (err, results, fields) => {
		if (err) console.log(`Failed to fetch data: ${err}`);

		const writeData = JSON.stringify(results);

		fs.writeFile(`${__dirname}/dev-data/city.json`, writeData, (err) => {
			if (err) console.log(`Failed to write data: ${err}`);
			console.log("City Data written successfully");
		});
	});
};

const importLanguageData = () => {
	const queryStr2 = "select * from countrylanguage";

	connection.query(queryStr2, (err, results, feilds) => {
		if (err) console.log(`Failed to fetch data: ${err}`);

		const writeData = JSON.stringify(results);

		fs.writeFile(`${__dirname}/dev-data/language.json`, writeData, (err) => {
			if (err) console.log(`Failed to write data: ${err}`);
			console.log("Language Data written successfully");
		});
	});
};

importCityData();
importLanguageData();
