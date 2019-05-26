var express = require("express");
var app     = express();
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var mongoose = require("mongoose");
var	passport    = require('passport');
var	LocalStrategy = require('passport-local');
var	methodOverride = require("method-override");
var User	= require('./models/user')
var todoList = require('./models/todos');
var seedDb   = require("./seeds")





mongoose.connect("mongodb+srv://jumpsy:kurokos28@cluster0-wmocy.mongodb.net/test?retryWrites=true");

app.use(bodyParser.urlencoded({extended :true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
// seedDb();
 
//PASSPORT CONFIGURATION 
app.use(require("express-session")({
	secret : "My secret is a secret shhhhh.!!!",
	resave : false,
	saveUninitialized : false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());





//Landing Page
app.get("/", function(req, res){
	res.render("main")
})
// app.get("/login", function(req, res){
// 	res.render("login")
// })
// app.post("/login", passport.authenticate("local", 
// 	{
// 		successRedirect : "/todolist",
// 		failureRedirect : "/login"
// }), function(req, res){

// });

// app.get("/register", function(req, res){
// 	res.render('register')
// })

// //Authentication routes
// app.post("/register", function(req, res){
// 	var newUser = new User({username : req.body.username});
// 	User.register(newUser, req.body.password, function(err, user){
// 		if(err){
// 			req.flash("error", err.message)
// 			return res.render("register")
// 		}
// 		passport.authenticate("local")(req, res, function(){
// 			res.redirect("/todolist")
// 		})
// 	})
// })




//todo list route
app.get("/todolist", function(req, res){
		todoList.find({}, function(err, alltodoList){
		if(err){
			console.log(err)
		} else {
			res.render("todolist", {todoList : alltodoList});
		}
	})
	
});


// app.post("/todolist", isLoggedIn, function(req, res){
// 	//lookup campground using ID
// 	User.findById(req.user._id, function(err, campground){
// 		if(err){
// 			console.log(err);
// 			res.redirect("/campgrounds")
// 		} else {
// 			todoList.create(req.body.todolist, function(err, comment){
// 				//add usename and id to comment
// 				comment.author.id = req.user._id;
// 				comment.author.username = req.user.username;
// 				//save comment
// 				comment.save();
// 				if(err){
// 					console.log(err)
// 				} else {
// 					User.todolists.push(comment)
// 					todoList.save()
// 					res.redirect("/todolist")
// 				}
// 			})
// 		}
// 	})
// });

app.post("/todolist", function(req, res){
	var todolist = req.body.todolist;
	var newTodolist = {
		todoList : todolist
	}
	todoList.create(newTodolist, function(err, newTodolist){
		if(err){
			console.log(err)
		} else {
			console.log(newTodolist)
			res.redirect("/todolist")
		}
	})
})


//Delete todo list
app.delete("/todolist/:id", function(req,res){
	todoList.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/todolist");
		} else {
			console.log("Destroy todo List")
			res.redirect("/todolist")
		}
	})
})





 var todosOwnership = function(req, res, next){
		if(req.isAuthenticated()){
			todoList.findById(req.params.comment_id, function(err, foundTodos){
		if(err){
			res.redirect("back")
		} else{
			//does user own the campground?
			if(foundTodos.author.id.equals(req.user._id)){
				next()
			}else {
				res.redirect("back")
			}
		}
	});
		} else {
			
			res.redirect("back")
		}
}

var isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login")
}


app.listen(process.env.PORT, process.env.IP , function(){
	console.log("Todolist app is running")
})