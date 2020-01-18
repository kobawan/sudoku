const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	game: {
		config: {
      gameType: Number,
      difficulty: Number,
      ratio: Number,
      matrix: [Number],
      mask: [Number],
    },
		state: String,
	},
});

module.exports = mongoose.model("User", UserSchema);
