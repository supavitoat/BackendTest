const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "User API",
            version: "1.0.0",
        },
    },
    apis: ["./routes/*.js"],
};

const swaggerSpecs = swaggerJsdoc(options);
module.exports = { swaggerSpecs, swaggerUI };
