const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Project 2 API',
        description: 'API for Project 2'
    },
    host: 'localhost:8080',
    schemes: ['http'],
    securityDefinitions: {
        githubOAuth: {
            type: 'oauth2',
            authorizationUrl: 'https://github.com/login/oauth/authorize',
            flow: 'implicit',
            scopes: {
                user: 'Grants access to user profile'
            }
        }
    }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js', './routes/auth.js', './routes/profile.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);