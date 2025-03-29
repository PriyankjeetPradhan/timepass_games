import { Router } from "express";
import {
  createGame,
  deleteGame,
  getAllGames,
  getGameById,
  updateGame,
} from "../controller/game.controller";

const gameRouter = Router();
/**
 * @swagger
 * /games:
 *   post:
 *     summary: Create a new game
 *     description: Add a new game to the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 4
 *               url:
 *                 type: string
 *                 format: url
 *               author:
 *                 type: string
 *                 minLength: 4
 *               publishedDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Game created successfully.
 */
gameRouter.post("/", createGame);

/**
 * @swagger
 * /games/{id}:
 *   get:
 *     summary: Get a game by ID
 *     description: Retrieve a game by its unique ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The UUID of the game to retrieve
 *     responses:
 *       200:
 *         description: A single game.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                 name:
 *                   type: string
 *                   minLength: 4
 *                 url:
 *                   type: string
 *                   format: url
 *                 author:
 *                   type: string
 *                   minLength: 4
 *                 publishedDate:
 *                   type: string
 *                   format: date
 */
gameRouter.get("/:id", getGameById);

/**
 * @swagger
 * /games:
 *   get:
 *     summary: Get all games
 *     description: Retrieve a list of all games, optionally filtered by search query
 *     parameters:
 *       - in: query
 *         name: search
 *         required: false
 *         schema:
 *           type: string
 *         description: A search term to filter games by name or author
 *     responses:
 *       200:
 *         description: A list of games.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     format: uuid
 *                   name:
 *                     type: string
 *                     minLength: 4
 *                   url:
 *                     type: string
 *                     format: url
 *                   author:
 *                     type: string
 *                     minLength: 4
 *                   publishedDate:
 *                     type: string
 *                     format: date
 */
gameRouter.get("/", getAllGames);

/**
 * @swagger
 * /games/{id}:
 *   put:
 *     summary: Update a game by ID
 *     description: Update the details of an existing game
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The UUID of the game to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 4
 *               url:
 *                 type: string
 *                 format: url
 *               author:
 *                 type: string
 *                 minLength: 4
 *               publishedDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Game updated successfully.
 */
gameRouter.put("/:id", updateGame);

/**
 * @swagger
 * /games/{id}:
 *   delete:
 *     summary: Delete a game by ID
 *     description: Remove a game from the database by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the game to delete
 *     responses:
 *       200:
 *         description: Game deleted successfully.
 */
gameRouter.delete("/:id", deleteGame);

export default gameRouter;
