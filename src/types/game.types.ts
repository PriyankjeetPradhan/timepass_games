import { z } from "zod";

export const gameSchema = z.object({
    name: z.string().min(4),
    url: z.string().url(),
    author: z.string().min(4),
    publishedDate: z.string().transform((date) => new Date(date)),
});

export const gameIdSchema = z.object({
    id: z.string().uuid()
});

export const gameResponseSchema = gameSchema.extend({
    id: z.string().uuid()
});
export const gameListResponseSchema = z.array(gameResponseSchema);

export type GameInput = z.infer<typeof gameSchema>;
export type GameResponse = z.infer<typeof gameResponseSchema>;
export type GameListResponse = z.infer<typeof gameListResponseSchema>;