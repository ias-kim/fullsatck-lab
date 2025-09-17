// docs/swagger.js
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const options = {
definition: {
    openapi: "3.0.0",
    info: {
        title: "관리자 페이지 API",
        version: "1.0.0",
        description: "ADMIN API",
        },
    },
    apis: ["./docs/admin/*.js", "./docs/timetable/*.js", "./docs/common/*.js", "./docs/subjects/*.js", "./docs/classroom/*.js"],
};

const specs = swaggerJsdoc(options);

export { swaggerUi, specs };  // ← named export
