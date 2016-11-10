var path = require("path");
var express = require("express");
var bodyParser = require("body-parser")
var _ = require("underscore");
var Sequelize = require("sequelize");
var session = require("express-session");
var connect = require("connect");
var SequelizeStore = require("connect-session-sequelize")(session.Store);
var favicon = require('serve-favicon');

var app = express();

var multer = require("multer")
var fs = require("fs");

var storage = multer.diskStorage({
	destination: "uploads/",
	filename: function(req, file, callback) {
		if (req.session.user) {
			callback(null, req.session.user.hashcode + "." + getFileExt(file.originalname));
		} else {
			callback(null, false);
		}
	}
});

var upload = multer({
	"storage": storage
});

app.set("view engine", "jade");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use("/static", express.static(path.join(__dirname, "static")))
app.use(favicon(path.join(__dirname, '/public/images/favicon.ico')));

// beautify generated HTML
app.locals.pretty = true;

// connect to database
var sequelize = new Sequelize(null, null, null, {
	dialect: "sqlite",
	pool: {
		max: 1,
		min: 0,
		idle: 10000
	},
	storage: "database/db.sqlite",
	logging: false
});

sequelize.sync({
	force: false
});

//	use sequelize as a session store
app.use(session({
	secret: "This is a secret!",
	store: new SequelizeStore({
		db: sequelize
	}),
	proxy: true,
	resave: false,
	saveUninitialized: true,
	cookie: {
		maxAge: 60 * 60 * 1000
	}
}));


var authentication = require("./modules/authentication.js");
var database = require("./modules/database.js");
var information = require("./modules/information.js");
var metadata = require("./modules/metadata.js");

var databaseModels = null;

app.get("/", function(req, res) {
	if (req.session.user) {
		res.render("main", {
			"user": req.session.user
		});
	} else {
		res.redirect("login");
	}
});

app.get("/register", function(req, res) {
	if (req.session.user) {
		res.redirect("/");
	} else {
		res.render("register");
	}
});

app.get("/login", function(req, res) {
	if (req.session.user) {
		res.redirect("/");
	} else {
		res.render("login");
	}
});

app.post("/login", function(req, res) {
	authentication.login(req, sequelize, databaseModels.userModel, function(user) {
		if (_.isNull(user)) {
			res.render("login", {
				"unauthorized": true,
				"message": "Invalid username/password! Please try again."
			});
		} else {
			req.session.user = user;
			res.redirect("/");
		}
	})
});


app.post("/register", function(req, res) {
	authentication.register(req, sequelize, databaseModels.userModel, function(user) {
		if (user && user.already) {
			res.render("register", {
				"unauthorized": true,
				"message": "Email already taken! Please try again."
			});
		} else {
			req.session.user = user;
			res.redirect("/");
		}
	})
});

app.get("/logout", function(req, res) {
	req.session.destroy(function(err) {
		if (err) {
			console.log(err);
		} else {
			res.redirect("/");
		}
	});
});

app.get("/account", function(req, res) {
	if (req.session.user) {
		res.render("account", {
			"user": req.session.user
		});
	} else {
		res.redirect("/login");
	}
});

app.get("/image/:filename", function(req, res) {
	if (req.session.user) {
		res.sendFile("/uploads/" + req.params.filename, {
			root: __dirname
		});
	} else {
		res.redirect("/login");
	}

});

app.get("/image/:filename/delete", function(req, res) {
	if (req.session.user) {
		authentication.deletePhoto(req, sequelize, databaseModels.userModel, function(user) {
			try {
				fs.accessSync(path, fs.F_OK);
				fs.unlinkSync("./uploads/" + req.params.filename);
			} catch (e) {}

			res.redirect("/logout");

		})
	} else {
		res.redirect("/login");
	}
});

app.post("/account", upload.single("image"), function(req, res) {
	if (req.session.user) {
		authentication.update(req, sequelize, databaseModels.userModel,
			function(user) {
				res.redirect("/logout");
			});
	} else {
		res.redirect("/");
	}
});

app.get("/profile/list", function(req, res) {
	if (req.session.user) {
		authentication.getUsers(req, sequelize, databaseModels.userModel, function(users) {
			users = _.map(users, function(user) {
				return _.pick(user, "firstName", "lastName", "email", "hashcode");
			});

			metadata.getRate(req, sequelize, databaseModels.rateModel, function(rates) {
				users = _.map(users, function(user) {
					user.rates = _.where(rates, {
						target: user.hashcode
					});

					user.like = 0
					user.dislike = 0

					_.map(user.rates, function(rate) {
						if (rate.value == 1) {
							user.like++;
						} else if (rate.value == -1) {
							user.dislike++;
						}
					});
					user.rank = user.like + user.dislike;
					user = _.omit(user, "rates");

					return user;
				});
				res.json(users);
			});
		});
	} else {
		res.redirect("/");
	}
});


app.get("/rate", function(req, res) {
	if (req.session.user) {
		res.render("rate", {
			"user": req.session.user
		});
	} else {
		res.redirect("/");
	}
});

app.post("/profile/rate", function(req, res) {
	if (req.session.user) {
		metadata.setRate(req, sequelize, databaseModels.rateModel, function(rates) {
			res.sendStatus(200);
		});
	} else {
		res.redirect("/");
	}
});

app.get("/profile/:hashcode", function(req, res) {
	authentication.getUserByHashcode(req, sequelize, databaseModels.userModel, function(userItem) {
		information.getInformationsByHashcode(req, sequelize, databaseModels.informationModel, function(informations) {
			res.render("profile", {
				"user": req.session.user,
				"profile": userItem,
				"informations": informations
			});
		})
	});
});

app.get("/about", function(req, res) {
	if (req.session.user) {
		res.render("about", {
			user: req.session.user
		})
	} else {
		res.render("about")
	}
});

app.get("/builder", function(req, res) {
	if (req.session.user) {
		res.render("builder", {
			user: req.session.user
		});
	} else {
		res.redirect("/");
	}
})

app.get("/builder/informations", function(req, res) {
	if (req.session.user) {
		information.get(req, sequelize, databaseModels.informationModel, function(informations) {
			res.json(informations);
		});
	} else {
		res.redirect("/");
	}
});

app.put("/builder/informations/:id", function(req, res) {
	if (req.session.user) {
		information.update(req, sequelize, databaseModels.informationModel, function(information) {
			res.sendStatus(200);
		});
	} else {
		res.redirect("/");
	}
});

app.post("/builder/informations", function(req, res) {
	if (req.session.user) {
		information.add(req, sequelize, databaseModels.informationModel, function(information) {
			res.sendStatus(200);
		});
	} else {
		res.redirect("/");
	}
});

app.delete("/builder/informations/:id", function(req, res) {
	if (req.session.user) {
		information.delete(req, sequelize, databaseModels.informationModel, function(informations) {
			res.sendStatus(200);
		});
	} else {
		res.redirect("/");
	}
});

app.post("/builer/informations/tags", function(req, res) {
	if (req.session.user) {
		metadata.updateTags(req, sequelize, databaseModels.userModel, function(tag) {
			res.sendStatus(200);
		});
	} else {
		res.redirect("/");
	}
});





app.listen(80, function() {
	databaseModels = database.initialize(sequelize, Sequelize);
	console.log("Example app listening on port %s!", 80);
});


// prototypes
String.prototype.ucfirst = function() {
	return this.charAt(0).toUpperCase() + this.substr(1);
}

var getFileExt = function(fileName) {
	var fileExt = fileName.split(".");
	if (fileExt.length === 1 || (fileExt[0] === "" && fileExt.length === 2)) {
		return "";
	}
	return fileExt.pop();
}
