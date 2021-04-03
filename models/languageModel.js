const mongoose = require("mongoose");

const languageSchema = new mongoose.Schema({
	CountryCode: {
		type: String,
		trim: true,
		required: [true, "Please provide the country code"],
	},
	Language: {
		type: String,
		trim: true,
		required: [true, "Please mention the language of the country"],
	},
	IsOfficial: {
		type: String,
		trim: true,
		required: [true, "Is it official?"],
	},
	Percentage: {
		type: String,
		trim: true,
		required: [true, "Give the percentage"],
	},
});

const Language = mongoose.model("Language", languageSchema);

module.exports = Language;
