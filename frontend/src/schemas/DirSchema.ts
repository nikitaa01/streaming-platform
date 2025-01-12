import { array, boolean, object, string, type InferInput } from "valibot";

const file = {
    name: string(),
    isDir: boolean(),
    url: string(),
    path: string(),
};

const FileSchema = object(file);

export type File = InferInput<typeof FileSchema>;

export const CurrentFileSchema = object({
    ...file,
    files: array(FileSchema),
});

export type CurrentFile = InferInput<typeof CurrentFileSchema>;
