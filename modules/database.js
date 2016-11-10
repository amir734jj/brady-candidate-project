exports.initialize = function(db, Sequelize) {
	var User = db.define("user", {
		firstName: {
			type: Sequelize.STRING
		},
		lastName: {
			type: Sequelize.STRING
		},
		email: {
			type: Sequelize.STRING,
			unique: true
		},
		password: {
			type: Sequelize.STRING
		},
		hashcode: {
			type: Sequelize.STRING,
			unique: true
		},
		since: {
			type: Sequelize.DATE
		},
		bio: {
			type: Sequelize.STRING
		},
		major: {
			type: Sequelize.STRING
		},
		image: {
			type: Sequelize.STRING
		},
		filename: {
			type: Sequelize.STRING
		},
		linkedin: {
			type: Sequelize.STRING
		},
		twitter: {
			type: Sequelize.STRING
		},
		facebook: {
			type: Sequelize.STRING
		},
		tags: {
			type: Sequelize.STRING
		}
	}, {
		freezeTableName: true
	});

	var Information = db.define("information", {
		hashcode: {
			type: Sequelize.STRING
		},
		type: {
			type: Sequelize.STRING
		},
		title: {
			type: Sequelize.STRING
		},
		start: {
			type: Sequelize.STRING
		},
		end: {
			type: Sequelize.STRING
		},
		details: {
			type: Sequelize.TEXT
		}
	}, {
		freezeTableName: true
	});


	var Rate = db.define("rate", {
		hashcode: {
			type: Sequelize.STRING
		},
		value: {
			type: Sequelize.DECIMAL,
			defaultValue: 0,
		},
		target: {
			type: Sequelize.STRING
		}
	}, {
		freezeTableName: true
	});


	db.sync({
		force: false
	});

	return {
		userModel: User,
		informationModel: Information,
		rateModel: Rate
	};
};
