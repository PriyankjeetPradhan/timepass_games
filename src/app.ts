import express from "express";
import gameRouter from "./routes/game.routes";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/games", gameRouter);

export default app;