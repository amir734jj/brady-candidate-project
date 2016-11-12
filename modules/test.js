exports.start = function() {
	var self = this;
	self.authentication.register({
		body: {
			email: "hesamian@uwm.edu",
			password: "AMIR1372jj@",
			firstName: "Seyedamirhossein",
			lastName: "Hesamian"
		}
	}, self.sequelize, self.databaseModels.userModel, function(user) {
		console.log("--> register test passed: " + (user.email == "hesamian@uwm.edu"));
	});

	self.authentication.login({
		body: {
			email: "hesamian@uwm.edu",
			password: "AMIR1372jj@"
		}
	}, self.sequelize, self.databaseModels.userModel, function(user) {
		console.log("--> login test passed: " + (user.email == "hesamian@uwm.edu"));
	});

	self.authentication.getUsers({}, self.sequelize, self.databaseModels.userModel, function(list) {
		console.log("--> get users test passed: " + ((list && list.length >= 0) ? true : false));
	});

	self.authentication.login({
		body: {
			email: "hesamian@uwm.edu",
			password: "AMIR1372jj@"
		}
	}, self.sequelize, self.databaseModels.userModel, function(user) {
		self.authentication.getUserByHashcode({
			params: {
				hashcode: user.hashcode
			}
		}, self.sequelize, self.databaseModels.userModel, function(_user) {
			console.log("--> get user by hashcode passed: " + (user.hashcode == _user.hashcode));
		});
	});

	self.information.getAll({}, self.sequelize, self.databaseModels.informationModel, function(list) {
		console.log("--> get informations test passed: " + ((list && list.length >= 0) ? true : false));
	});

	self.metadata.getRates({}, self.sequelize, self.databaseModels.informationModel, function(list) {
		console.log("--> get rates test passed: " + ((list && list.length >= 0) ? true : false));
	});
}
