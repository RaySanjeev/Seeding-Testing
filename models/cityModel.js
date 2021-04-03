const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
	Name: {
		type: String,
		trim: true,
		required: [true, "Please provide the name of the city"],
	},
	CountryCode: {
		type: String,
		trim: true,
		required: [true, "Please provide the country code"],
	},
	District: {
		type: String,
		trim: true,
	},
	Population: {
		type: Number,
		required: [true, "Please provide the population of the city"],
	},
});

const City = mongoose.model("City", citySchema);

module.exports = City;
