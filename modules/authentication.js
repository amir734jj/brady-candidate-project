var _ = require("underscore");
var hash = require("sha1");

exports.login = function(req, db, userModel, callback) {
	userModel.findOne({
		where: {
			email: req.body.email,
			password: hash(req.body.password)
		}
	}).done(function(user) {
		callback(user);
	});
};

exports.register = function(req, db, userModel, callback) {
	userModel.findOne({
		where: {
			email: req.body.email
		}
	}).done(function(user) {
		if (_.isNull(user)) {
			userModel.create({
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				email: req.body.email,
				password: hash(req.body.password),
				hashcode: hash(req.body.firstName + req.body.lastName + req.body.email),
				since: new Date(),
				bio: "",
				major: "",
				image: "",
				filename: "",
				linkedin: "",
				twitter: "",
				facebook: "",
				tags: ""
			}).done(function(user) {
				callback(user.toJSON());
			});
		} else {
			user.already = true;
			callback(user);
		}
	});
};


exports.update = function(req, db, userModel, callback) {
	userModel.update({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		password: (req.session.user.password == req.body.password) ? req.body.password : hash(req.body.password),
		bio: req.body.bio,
		major: req.body.major,
		image: (req.file || req.session.user.image) ? true : false,
		filename: (req.file) ? req.file.filename : ((req.session.user.filename) ? req.session.user.filename : ""),
		linkedin: req.body.linkedin,
		twitter: req.body.twitter,
		facebook: req.body.facebook
	}, {
		where: {
			hashcode: req.session.user.hashcode
		}
	}).done(function(rows) {
		userModel.findOne({
			where: {
				email: req.session.user.email
			}
		}).done(function(user) {
			callback(user);
		});
	});
}

exports.deletePhoto = function(req, db, userModel, callback) {
	userModel.update({
		image: ""
	}, {
		where: {
			hashcode: req.session.user.hashcode
		}
	}).done(function(rows) {
		userModel.findOne({
			where: {
				email: req.session.user.email
			}
		}).done(function(user) {
			req.session.regenerate(function(err) {
				req.session.user = user;
				callback(user);
			});
		});
	});
}

exports.getUserByHashcode = function(req, db, userModel, callback) {
	userModel.findOne({
		where: {
			hashcode: req.params.hashcode
		}
	}).done(function(user) {
		if (!_.isUndefined(user) && !_.isNull(user)) {
			user.name = user.firstName.ucfirst() + " " + user.lastName.ucfirst();
			callback(user.toJSON());
		}
	});
}


exports.getUsers = function(req, db, userModel, callback) {
	userModel.findAll().done(function(users) {
		callback(_.map(users, function(user) {
			return user.toJSON();
		}));
	});
}
