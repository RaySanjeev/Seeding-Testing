const fs = require("fs");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const connection = require("./mySQL_connection");
const City = require("./models/cityModel");
const Language = require("./models/languageModel");

dotenv.config({ path: `${__dirname}/config.env` });

mongoose
	.connect(process.env.DATABASE, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("Connected to the database");
	})
	.catch((err) => {
		console.log(`Failed to connect to mongoDB: ${err}`);
	});

const seedData = async () => {
	try {
		const cityData = await connection.promise().query("select * from city order by Population asc limit 10");
		const languageData = await connection
			.promise()
			.query("select * from countrylanguage order by Percentage desc limit 10");

		await City.create(cityData[0]);
		await Language.create(languageData[0]);

		console.log("Data uploaded successfully");
	} catch (err) {
		console.log(err);
	}
	process.exit();
};

const deleteData = async () => {
	try {
		await City.deleteMany({});
		await Language.deleteMany({});

		console.log("Data deleted successfully");
	} catch (err) {
		console.log(err);
	}
	process.exit();
};

if (process.argv[2] === "--seed") {
	seedData();
}

if (process.argv[2] === "--delete") {
	deleteData();
}
