var mongoose = require("mongoose")


var todoListSchema = new mongoose.Schema({
	todoList : String
});

module.exports = mongoose.model("todoList", todoListSchema)