const routes = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

routes.use('/api-docs', swaggerUi.serve);
routes.get('/api-docs', swaggerUi.setup(swaggerDocument));

routes.get('/', (req, res) => {
    res.send('Project 2');
});

routes.use('/contacts', require('./contacts'));
routes.use('/shows', require('./shows'));

module.exports = routes;