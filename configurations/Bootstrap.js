/*
 * @author Abhimanyu
 * This program includes all the function which are required to  initialize before the application start
 */

 //call all the function which are required to perform the require initialization before server will start

var  initApp = function(){
    Logger.info("config" +configurationHolder.config.accessLevels["anonymous"] );
    createSuperAdmin()
 }


function createSuperAdmin(){
    var saltString  = uuid.v1()
    var password = crypto.createHmac('sha1',saltString).update("user@admin").digest('hex')
    domain.User.findOne({firstName:'SuperAdmin'}, function (err, doc) {
        console.log(doc);
        if(!doc){
            var superAdminUser  = new domain.User({
            firstName:'SuperAdmin',
            lastName:'User',
            email:'admin@coach.com',
            salt:saltString,
            password:password,
            role:'ROLE_SUPERADMIN',
            accountLocked:false,
            isAccountActive : true,
            phone:9999999999,
            city:'LONDON'

    });

    superAdminUser.save(function (err,user) {
        if (err){  Logger.error(err)
                }else{
                        bootApplication()
                        Logger.info(user)
                }
      })
        }else{
          bootApplication()
        }
       /* Logger.error(err)
        if(!doc){

        }*/
    });


}

// code to start the server
function bootApplication(){
  	app.listen(configurationHolder.config.port, function(){
			console.log("Express server listening on port %d in %s mode", configurationHolder.config.port, app.settings.env);
		});
}

module.exports.initApp = initApp
