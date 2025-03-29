import { Request, Response } from "express";
import prisma from "../config/db";
import { gameIdSchema, gameListResponseSchema, gameResponseSchema, gameSchema } from "../types/game.types";

export const createGame = async (req: Request, res: Response) => {
    try {
        const body = gameSchema.parse(req.body);

        const game = await prisma.game.create({
            data: {
                name: body.name,
                url: body.url,
                author: body.author,
                publishedDate: body.publishedDate
            }
        });
        res.status(201).json(game);
    } catch (error) {
        res.status(400).json({ error: error });
        
    }
};

export const getGameById = async (req: Request, res: Response) => {
    try {
        const params = gameIdSchema.parse(req.params);

        const game = await prisma.game.findUnique({
            where: {
                id: params.id
            }
        });

        if (!game) {
            res.json({ error: "Game not found" });
        } else {
            res.json(game);
        }
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

export const getAllGames = async (req: Request, res: Response) => {
    try {
        const search = req.query.search as string | undefined;

        const games = await prisma.game.findMany({
            where: search
            ? {
                  OR: [
                  { name: { contains: search, mode: "insensitive" } },
                  { author: { contains: search, mode: "insensitive" } },
                  ],
              }
            : undefined,
        });

        res.json(games);
    } catch (error) {
        res.status(500).json({ error: "Error fetching game" });
    }
};

export const updateGame = async (req: Request, res: Response) => {
    try {
        // zod types need to change
        const param = gameIdSchema.parse(req.params);
        const body = gameSchema.parse(req.body);

        const updatedGame = await prisma.game.update({
            where: { id: param.id },
            data: {
                name: body.name,
                url: body.url,
                author: body.author,
                publishedDate: new Date(body.publishedDate)
            }
        });

        res.json(updatedGame);
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

export const deleteGame = async (req: Request, res: Response) => {
    try {
        const params = gameIdSchema.parse(req.params);
        await prisma.game.delete({ where: { id: params.id } });

        res.json({ message: "Game deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error });
    }
}