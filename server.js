const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: `${__dirname}/config.env` });

const app = require("./app");
mongoose
	.connect(process.env.DATABASE, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("Successfully Connected to the Database");
	})
	.catch((err) => {
		console.log(`Error while connecting to Databse: ${err}`);
	});

const port = 3000 || process.env.PORT;
const server = app.listen(port, () => {
	console.log(`Server listening to port: ${port}`);
});
