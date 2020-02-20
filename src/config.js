
'use strict';

var dev = {
    'env': {
        name: 'development',
        //serviceUrl: 'http://localhost:3000/',
        // adminUrl: 'http://themeemapp.com/',
        server: {
            host: '192.168.1.25',  
            port: '3000'
        },
        'database':" mongodb://localhost:27017/res-app-db",
        secret: 'meansecure',
        swagger_host: 'localhost:3000'
    }
};

module.exports = dev;