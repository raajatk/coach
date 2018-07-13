//add Roles in the system
var roles = ['ROLE_USER', 'ROLE_ADMIN','ROLE_SUPERADMIN','ROLE_PLAYER','ROLE_COACH']

// Add different accessLevels
var accessLevels = {
    'anonymous': ['ROLE_USER','ROLE_ADMIN','ROLE_SUPERADMIN'],
    'user': ['ROLE_USER','ROLE_ADMIN','ROLE_SUPERADMIN'],
    'admin': ['ROLE_ADMIN','ROLE_SUPERADMIN'],
    'superadmin':['ROLE_SUPERADMIN'],
    'coach':['ROLE_USER','ROLE_ADMIN','ROLE_SUPERADMIN'],
    'player':['ROLE_USER','ROLE_ADMIN','ROLE_SUPERADMIN']
}


var configVariables = function () {
    switch (process.env.NODE_ENV) {
    case 'development':
        var config = {
            port:3000,
            host: 'http://localhost:3000/',
            verificationUrl:'http://localhost:3000/verify/',
            awsAccessKeyId:'',
            awsSecretAccessKey:'',
            bucketname:'',
            emailFrom:'admin@coach.com',
            emailPassword:'admin@coach',
            verificationEmailSubject:'This is COACH App'

        }
        config.roles = roles
        config.accessLevels = accessLevels
        return config;


    case 'staging':
        var config = {
            port:80,
            host: 'http://localhost:3000/',
            verificationUrl:'http://localhost:3000/verify/',
            awsAccessKeyId:'',
            awsSecretAccessKey:'',
            bucketname:'',
            emailFrom:'admin@nodeseed.com',
            emailPassword:'admin@nodeseed',
            verificationEmailSubject:'This is NodeSeed'

        }
        config.roles = roles
        config.accessLevels = accessLevels
        return config;

    case 'production':
       var config = {
            port:80,
            host: 'http://localhost:3000/',
            verificationUrl:'http://localhost:3000/verify/',
            awsAccessKeyId:'',
            awsSecretAccessKey:'',
            bucketname:'',
            emailFrom:'admin@nodeseed.com',
            emailPassword:'admin@nodeseed',
            verificationEmailSubject:'This is NodeSeed'

        }

        config.roles = roles
        config.accessLevels = accessLevels
        return config;

    case 'test':
        var config = {
            port:80,
            host: 'http://localhost:3000/',
            verificationUrl:'http://localhost:3000/verify/',
            awsAccessKeyId:'',
            awsSecretAccessKey:'',
            bucketname:'',
            emailFrom:'admin@nodeseed.com',
            emailPassword:'admin@nodeseed',
            verificationEmailSubject:'This is NodeSeed'

        }

        config.roles = roles
        config.accessLevels = accessLevels
        return config;


    }
}


module.exports.configVariables = configVariables;
