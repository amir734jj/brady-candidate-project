var _ = require("underscore");
var hash = require("sha1");

exports.add = function(req, db, informationModel, callback) {
	informationModel.create({
		hashcode: req.session.user.hashcode,
		type: req.body.type,
		title: req.body.title,
		start: req.body.start,
		end: req.body.end,
		details: req.body.details
	}).done(function(information) {
		callback(information.toJSON());
	});
};

exports.get = function(req, db, informationModel, callback) {
	informationModel.findAll({
		where: {
			hashcode: req.session.user.hashcode
		}
	}).done(function(informations) {
		callback(informations);
	});
}

exports.getInformationsByHashcode = function(req, db, informationModel, callback) {
	informationModel.findAll({
		where: {
			hashcode: req.params.hashcode
		}
	}).done(function(informations) {
		var payload = [];
		_.map(informations, function(information) {
			payload.push(information.toJSON());
		});

		informations.sort(function(a, b){
			try {
				return parseInt(a.end) - parseInt(b.end);
			} catch (error) {
				return -1;
			}
		})

		callback(informations);
	});
}

exports.update = function(req, db, informationModel, callback) {
	informationModel.update({
		type: req.body.type,
		title: req.body.title,
		start: req.body.start,
		end: req.body.end,
		details: req.body.details
	}, {
		where: {
			id: req.params.id
		}
	}).done(function(information) {
		callback(information);
	});
}

exports.delete = function(req, db, informationModel, callback) {
	informationModel.destroy({
		where: {
			id: req.params.id
		}
	}).done(function(information) {
		callback(information);
	});
}
