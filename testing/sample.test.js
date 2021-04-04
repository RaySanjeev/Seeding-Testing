const axios = require("axios");

const sampleFunctions = require("../testFunctions");

// TEST - 1
test("Adds two given numbers", () => {
	expect(sampleFunctions.add(2, 5)).toBe(7);
});

// TEST 2
const monthsList = ["january", "february", "march", "april", "may"];

test("Checks if an array contains", () => {
	expect(monthsList).toContain("january");
});

// TEST 3
test("Asynchronous testing", () => {
	return expect(axios.get("https://dog.ceo/api/breeds/image/random")).resolves.not.toBeNull();
});

// TEST 4
test("Async await test", async () => {
	const res = await axios.get("https://dog.ceo/api/breeds/image/random");
	console.log(res.data.message);
	expect(res).not.toBeNull();
});
