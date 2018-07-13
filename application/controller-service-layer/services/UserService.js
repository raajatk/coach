var BaseService = require('./BaseService');
var encrypt = require('../../../application-utilities/EncryptionUtility');

UserService = function (app) {
	this.app = app;
};

UserService.prototype = new BaseService();

UserService.prototype.createUser = function (body, callback) {

	var salt = uuid.v1();
	var user = new domain.User(body.user);
	user.salt = salt;
	user.password = encrypt(salt, body.user.password);
	domain.User.find({ $or:[{phone:body.user.phone},{email:body.user.email}]},function(err,users){
		if(!err && users.length==0){
			user.validate(function (err) {
				if (err != null || err == "undefined") {
					Logger.info(err.errors.stack);
					err.status = 400;
					callback(err, user);
				} else {
						user.save(function (err, userObj) {
							console.log("the res is ",err,userObj)
							callback(err, userObj);
						});
				}
			})
		}else {
			var duplicateKey = [];
			if(users[0].email==body.user.email){
				duplicateKey.push('email');
			}
			if(users[0].phone==body.user.phone){
				duplicateKey.push('phone');
			}
			callback(err,{duplicateKey:duplicateKey})
		}
	})

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
