const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Project 2 API',
        description: 'API for Project 2'
    },
    host: 'localhost:8080',
    schemes: ['http'],
    securityDefinitions: {
        google: {
            type: 'oauth2',
            authorizationUrl: 'http://localhost:8080/auth/google',
            flow: 'implicit',
            scopes: {
                profile: 'Grants access to your profile information'
            }
        }
    }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js', './routes/auth.js', './routes/profile.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);