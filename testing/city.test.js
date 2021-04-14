const cityFunctions = require("../testFunctions/cityFunctions");

// TEST 1
test("All the documents are transfered", async () => {
	expect(cityFunctions.countDocuments).toBeTruthy();
});

// TEST 2
test("Matching the Documents", async () => {
	expect(cityFunctions.matchDocuments.cityData).toEqual(cityFunctions.matchDocuments.MongoCityData);
});

// TEST 3
test("Testing for duplicacy", async () => {
	expect(cityFunctions.checkDuplicacy.state).not.toBeTruthy();
});
