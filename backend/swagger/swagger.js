const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const PORT = process.env.API_PORT || 4000;

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'F1 Dashboard API',
    version: '1.0.0',
    description: 'API documentation for the F1 Dashboard',
  },
  servers: [
    {
      url: 'http://localhost:' + PORT,
      description: 'Local server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter your bearer token in the format **Bearer &lt;token&gt;**',
      },
    },
  },
  security: [{
    bearerAuth: [],
  }],
};

// Options for the swagger docs
const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec,
};
