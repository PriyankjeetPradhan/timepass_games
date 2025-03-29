import express from "express";
import gameRouter from "./routes/game.routes";
import cors from "cors";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();

app.use(cors());
app.use(express.json());
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API Documentation",
      version: "1.0.0",
      description: "A simple Express API using Swagger",
    },
    servers: [
      {
        url: "https://timepass-games-t973.onrender.com",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.get("/health", (_req, res) => {
  res.json({ message: "API is running" });
});
app.use("/games", gameRouter);

export default app;
