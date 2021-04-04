module.exports = {
	async up(db, client) {
		// TODO write your migration here.
		// await db.collection("albums").updateOne({ artist: "The Beatles" }, { $set: { blacklisted: true } });
		await db.collection("cities").updateMany({}, { $set: { testing: "migration data testing" } });
	},

	async down(db, client) {
		// TODO write the statements to rollback your migration (if possible)
		// await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
		await db.collection("cities").updateMany({}, { $unset: { testing: "" } });
	},
};
