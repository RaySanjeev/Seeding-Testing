const fs = require("fs");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const City = require("./models/cityModel");
const Language = require("./models/languageModel");

dotenv.config({ path: `${__dirname}/config.env` });

const cityData = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/city.json`, "utf-8"));
const languageData = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/language.json`, "utf-8"));

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
		await City.create(cityData);
		await Language.create(languageData);

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
