import { type InferInput, number, object, string } from "valibot";

export const VideoProgressSchema = object({
    duration: number(),
    id: number(),
    path: string(),
    updatedAt: string(),
    userId: number(),
});

export type VideoProgress = InferInput<typeof VideoProgressSchema>;
