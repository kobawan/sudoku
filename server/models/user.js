const mongoose = require("mongoose");

const UserDBSchema = new mongoose.Schema({
	game: {
		config: String,
		state: String,
	},
});

module.exports = mongoose.model("User", UserDBSchema);
