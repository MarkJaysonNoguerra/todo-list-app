var mongoose = require("mongoose");
var todoList = require("./models/todos")


data = [
	{ todoList	: "Clean Host"},
	{ todoList  : "Wash cats"},
	{ todoList  : "Feed the cats"}

]


function seedDb(){
	todoList.remove({}, function(err){
		if(err){
			console.log(err);
		} 
			console.log("removed todolist")
	data.forEach(function(seed){
		todoList.create(seed, function(err, todoList){
			if(err){
				console.log(err)
			} else {
				console.log("added todoList")
			}
		})
	})
})

}

module.exports = seedDb;