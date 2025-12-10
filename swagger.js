const swaggerAutogen = require('swagger-autogen')();

const scheme = process.env.SWAGGER_SCHEME || 'http';
const host = process.env.SWAGGER_HOST || 'localhost:3000';

const doc = {
  info: {
    title: 'Project 2 API',
    description: 'API for Project 2',
    version: '1.0.0'
  },
  host: host,
  basePath: '/',
  schemes: [scheme],
  consumes: ['application/json'],
  produces: ['application/json'],
  securityDefinitions: {
    github: {
      type: 'oauth2',
      authorizationUrl: `${scheme}://${host}/auth/github`,
      flow: 'implicit',
      scopes: {
        'user:email': 'Read user email address'
      }
    }
  },
  tags: [
    { name: 'Contacts', description: 'Contacts management' },
    { name: 'Shows', description: 'Shows catalog' }
  ],
  definitions: {
    Contact: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      favoriteColor: 'Blue',
      birthday: '1990-01-01'
    },
    Show: {
      title: 'The Matrix',
      director: 'Wachowski',
      year: 1999,
      genre: 'Sci-Fi',
      rating: 'PG-13',
      seasons: 3,
      episodes: 24,
      platform: 'Netflix'
    }
  }
};

const outputFile = './swagger.json';
const endpointsFiles = [
  './routes/index.js',
  './routes/contacts.js',
  './routes/shows.js',
  './routes/auth.js',
  './routes/profile.js'
];

swaggerAutogen(outputFile, endpointsFiles, doc);
