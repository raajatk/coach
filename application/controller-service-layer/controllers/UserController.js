var encrypt = require('../../../application-utilities/EncryptionUtility');
module.exports = function () {


	var createUser = function (req, res, callback) {
		this.services.userService.createUser(req.body,callback);
	}

	var getUser = function (req, res, callback) {
		var id = req.params.id;
		this.services.userService.getUser(id,callback);
	}

	var updateUser = function (req, res, callback) {
		var id = req.params.id;
		this.services.userService.updateUser(id,req.body.user,callback);
	}

	var deleteUser = function (req, res, callback) {
		var id = req.params.id
		this.services.userService.deleteUser(id,callback);
	}

	var searchUser = function (req, res, callback) {
		var firstName = req.query.firstName;
		var lastName = req.query.lastName;
		this.services.userService.searchUser(firstName,lastName,callback);
	}

	var testApi = function(req, res, callback){
		this.services.userService.testApi(callback);
	}

	return {
		createUser: createUser,
		getUser: getUser,
		updateUser: updateUser,
		searchUser: searchUser,
		deleteUser: deleteUser,
		testApi:testApi
	}
};
