var BaseService = require('./BaseService');

UserService = function (app) {
	this.app = app;
};

UserService.prototype = new BaseService();

UserService.prototype.createUser = function (user, callback) {
	user.save(function (err, userObj) {
		callback(err, userObj);
	});

}

UserService.prototype.getUser = function (id, callback) {
	domain.User.findOne({
		_id: id,
		deleted: false
	}, function (err, user) {
		callback(err, user);
	});
}

UserService.prototype.updateUser = function (id, userObj, callback) {
	domain.User.findOneAndUpdate({
		_id: id,
		deleted: false
	}, userObj, null, function (err, user) {
		if (err) {
			callback(err, userObj);
		} else {
			domain.User.findOne({
				_id: id,
				deleted: false
			}, function (err, user) {
				callback(err, user);
			});
		}
	});
}

UserService.prototype.searchUser = function (firstName,lastName,callback) {
    var firstName = (firstName == null || firstName == "")?'.*':firstName;
	var lastName = (lastName == null || lastName == "")?'.*':lastName;
	domain.User.find({firstName:new RegExp(firstName),lastName:new RegExp(lastName)},function(err,objects){
		callback(err, objects);
	})
}

UserService.prototype.deleteUser = function (id, callback) {
	domain.User.findOne({
		_id: id
	}, function (err, user) {
		if (err) {
			callback(err, user)
		};
		user.softdelete(function (err, deletedUser) {
			callback(err, deletedUser);
		});
	});
}

UserService.prototype.testApi = function (callback) {
	console.log("TEST API RAN SUCCESSFULLY");
	// callback(false,{res:"TEST API RAN SUCCESSFULLY"})
	var array = [1,2,3,4,5,6,7,8,9,10];
	var counter = 0;
	async.forEach(array,function(item, pass){
		console.log("COUNTER ",counter);
		counter = counter+1;
		pass();
	},function(res){
			console.log("The array completed and COUNTER is ",counter);
			callback(false,{res:"TEST API RAN SUCCESSFULLY"})
	})
}
module.exports = function (app) {
	return new UserService(app);
};
