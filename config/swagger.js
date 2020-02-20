const config = require("../src/config").env;

module.exports = {
  swagger: "2.0",
  info: {
    version: "1.0.0",
    title: "Resto Apis",
    description: "Details of Resto apis",
    license: {
      name: "MIT",
      url: "https://opensource.org/licenses/MIT"
    }
  },
  host:  config.swagger_host,
  securityDefinitions: {
    JWT: {
      type: 'apiKey',
      description: 'JWT authorization of an API',
      in: 'header',
      name: 'Authorization'
    }
  },
  schemes: [
    'http',
    'https' 
 ],
  consumes: [
        'application/json'
      ],
      produces: [
        'application/json'
      ],       
 
};

