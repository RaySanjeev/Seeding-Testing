const dotenv = require("dotenv");
const mongoose = require("mongoose");

const connection = require("../mySQL_connection");

const City = require("../models/cityModel");

dotenv.config({ path: `${__dirname}/../config.env` });

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

exports.countDocuments = async () => {
	let state = false;
	try {
		const cityData = await connection.promise().query("select * from city limit 10");
		connection.destroy();
		const MongoCityData = await City.find().limit(10);

		if (cityData[0].length === MongoCityData.length) state = true;
	} catch (err) {
		console.log(err);
	}
	console.log(state);
	return state;
};

exports.matchDocuments = async () => {
	let cityData, MongoCityData;
	try {
		cityData = await connection
			.promise()
			.query("select Name,CountryCode,District,Population from city order by Population limit 10");

		MongoCityData = await City.find({}, { _id: 0, __v: 0 }).sort({ Population: 1 }).limit(10);

		// console.log(cityData[0], MongoCityData);
		// for (let i = 0; i < 9; i++) {
		// 	console.log(cityData[0][i]);
		// }
		// console.log(JSON.stringify(cityData[0]) === JSON.stringify(MongoCityData));
		// cityData[0].forEach((obj, index) => {
		// 	// console.log(obj, MongoCityData[0]);
		// 	state = Object.keys(obj).every((el) => obj[el] === MongoCityData[index][el]);
		// });
	} catch (err) {
		console.log(err);
	}

	return { cityData, MongoCityData };
};

exports.checkDuplicacy = async () => {
	let state;
	let indexOfElements = [];

	const MongoCityData = await City.find({}, { _id: 0, __v: 0 });

	MongoCityData.forEach((el, index) => {
		if (el.Name === "Adamstown" || el.Name === "Fakaofo") {
			console.log(el);
			indexOfElements.push(index);
		}
	});

	state = indexOfElements.length > 0 ? false : true;
	const elementsArray = indexOfElements.map((el) => {
		return MongoCityData[el];
	});

	console.log(`Elements already having fields: ${elementsArray}`);
	return { state, indexOfElements };
};

// countDocuments();
// matchDocuments();
// checkDuplicacy();
