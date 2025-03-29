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
                publishedDate: new Date(body.publishedDate)
            }
        });
        const response = gameResponseSchema.parse(game);

        res.status(201).json(response);
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
            const response = gameResponseSchema.parse(game);
            res.json(response);
        }
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

export const getAllGames = async (req: Request, res: Response) => {
    try {
        const games = await prisma.game.findMany();

        const response = gameListResponseSchema.parse(games);
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: "Error fetching game" });
    }
};

export const updateGame = async (req: Request, res: Response) => {
    try {
        // zod types need to change
        const param = gameIdSchema.parse(req.params);
        const body = gameSchema.parse(req.body);

        const updateGame = await prisma.game.update({
            where: { id: param.id },
            data: {
                name: body.name,
                url: body.url,
                author: body.author,
                publishedDate: new Date(body.publishedDate)
            }
        });

        const response = gameResponseSchema.parse(updateGame);
        res.json(response);
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