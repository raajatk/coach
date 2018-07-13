	module.exports = function (app) {
		var controllers = app.controllers,
			views = app.views;

			/*
			The API version is v0
			/api/v0.0.1/app/
			*/

		return {
			"/api/v0.0.1/app/user/create": [{
					method: "POST",
					action: controllers.userController.createUser,
					middleware: [],
					views: {
						json: views.jsonView
					}
				}
			],

			"/user/:id": [{
					method: "GET",
					action: controllers.userController.getUser,
					middleware: ["hello"],
					views: {
						json: views.jsonView
					}
				},
				{
					method: "put",
					action: controllers.userController.updateUser,
					middleware: ["hello"],
					views: {
						json: views.jsonView
					}
				},
				{
					method: "delete",
					action: controllers.userController.deleteUser,
					middleware: ["hello"],
					views: {
						json: views.jsonView
					}
				}
			],

			"/users": [{
					method: "GET",
					action: controllers.userController.searchUser,
					middleware: ["hello"],
					views: {
						json: views.jsonView
					}
				}
			],

			"/api/test": [{
					method: "GET",
					action: controllers.userController.testApi,
					middleware: ["hello"],
					views: {
						json: views.jsonView
					}
				}],


		};
	};
