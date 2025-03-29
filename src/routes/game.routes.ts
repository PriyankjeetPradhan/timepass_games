import { Router } from "express";
import { createGame, deleteGame, getAllGames, getGameById, updateGame } from "../controller/game.controller";


const gameRouter = Router();

gameRouter.post("/", createGame);
gameRouter.get("/:id", getGameById);
gameRouter.get("/", getAllGames);
gameRouter.put("/:id", updateGame);
gameRouter.delete("/:id", deleteGame);

export default gameRouter;