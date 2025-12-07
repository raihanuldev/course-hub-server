const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Course Hub API",
      version: "1.0.0",
      description: "API documentation for Course Hub Server",
    },
    servers: [
      {
        url: "http://localhost:5000",  // local
        description: "Local Server"
      },
      {
        url: "https://course-hub-server-xi.vercel.app", // production
        description: "Production Server (Vercel)"
      }
    ],
  },

  // all route files
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;
