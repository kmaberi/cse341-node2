const swaggerAutogen = require('swagger-autogen');

const doc = {
    openapi: '3.0.0',
    info: {
        title: 'API Documentation',
        version: '1.0.0',
    },
    components: {
        securitySchemes: {
            githubOAuth: {
                type: 'oauth2',
                flows: {
                    authorizationCode: {
                        authorizationUrl: 'https://github.com/login/oauth/authorize',
                        tokenUrl: 'https://github.com/login/oauth/access_token',
                        scopes: { 'user:email': 'Read user email address' }
                    }
                }
            }
        },
        schemas: {
            Contact: {
                type: 'object',
                properties: {
                    name: { type: 'string' },
                    email: { type: 'string' },
                    phone: { type: 'string' }
                }
            }
        }
    },
    paths: {
        '/contacts': {
            post: {
                tags: ['Contacts'],
                description: 'Create new contact',
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Contact'
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: 'Contact created successfully',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Contact'
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};

module.exports = doc;