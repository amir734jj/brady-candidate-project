var _ = require("underscore");
var hash = require("sha1");

exports.updateTags = function(req, db, userModel, callback) {
	var delimiter = ";"
	var array = req.session.user.tags.split(delimiter);

	if (req.body.action === "add") {
		array.push(req.body.tag);
	} else if (req.body.action === "remove") {
		array.pop(req.body.tag);
	}

	var payload = array.join(delimiter);
	req.session.user.tags = payload;

	userModel.update({
		tags: payload
	}, {
		where: {
			hashcode: req.session.user.hashcode
		}
	}).done(function(rows) {
		callback(rows);
	});
}

exports.getMyRateProfile = function(req, db, rateModel, callback) {
	rateModel.findAll({
		where: {
			hashcode: req.session.user.hashcode
		}
	}).done(function(who_I_rated) {
		rateModel.findAll({
			where: {
				target: req.session.user.hashcode
			}
		}).done(function(who_rated_me) {
			callback({
				"who_I_rated": _.map(who_I_rated, function(rate) {
					return rate.toJSON()
				}),
				"who_rated_me": _.map(who_rated_me, function(rate) {
					return rate.toJSON()
				})
			});
		});
	});
}


exports.getRates = function(req, db, rateModel, callback) {
	rateModel.findAll().done(function(rates) {
		callback(_.map(rates, function(rate) {
			return rate.toJSON();
		}));
	});
}

exports.setRate = function(req, db, rateModel, callback) {
	if (req.session.user.hashcode == req.body.target) {
		callback(null);
	} else {
		rateModel.findOne({
			where: {
				hashcode: req.session.user.hashcode,
				target: req.body.target
			}
		}).done(function(user) {
			if (_.isNull(user)) {
				rateModel.create({
					hashcode: req.session.user.hashcode,
					value: req.body.value,
					target: req.body.target
				}).done(function(rate) {
					callback(rate);
				});
			} else {
				rateModel.destroy({
					where: {
						hashcode: req.session.user.hashcode,
						target: req.body.target
					}
				}).done(function(rate) {
					rateModel.create({
						hashcode: req.session.user.hashcode,
						value: req.body.value,
						target: req.body.target
					}).done(function(rate) {
						callback(rate);
					});
				});
			}
		});
	}
}
