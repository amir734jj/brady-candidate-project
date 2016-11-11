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
		callback(_.map(informations, function(information) {
			return information.toJSON();
		}));
	});
}

exports.getInformationsByHashcode = function(req, db, informationModel, callback) {
	informationModel.findAll({
		where: {
			hashcode: req.params.hashcode
		}
	}).done(function(informations) {
		informations = _.map(informations, function(information) {
			return information.toJSON();
		});

		informations.sort(function(a, b) {
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
		details: quote(req.body.details)
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


var escapable = /[\\\"\x00-\x1f\x7f-\uffff]/g,
	meta = { // table of character substitutions
		'\b': '\\b',
		'\t': '\\t',
		'\n': '\\n',
		'\f': '\\f',
		'\r': '\\r',
		'"': '\\"',
		'\\': '\\\\'
	};

function quote(string) {
	escapable.lastIndex = 0;
	return escapable.test(string) ?
		'"' + string.replace(escapable, function(a) {
			var c = meta[a];
			return typeof c === 'string' ? c :
				'\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
		}) + '"' :
		'"' + string + '"';
}
