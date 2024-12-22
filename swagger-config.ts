import swaggerJSDoc, { Options } from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Next.js API Documentation",
    version: "1.0.0",
    description: "API documentation for the Next.js app"
  },
  servers: [
    {
      url: "http://localhost:3000/api/v1" // Update this to match your API base URL
    }
  ]
};

const options: Options = {
  swaggerDefinition,
  apis: ["./app/api/**/*.ts"] // Update this path to match your Next.js API route folder
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
