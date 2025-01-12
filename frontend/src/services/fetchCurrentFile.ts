import { parse } from "valibot";
import { CurrentFileSchema } from "../schemas/DirSchema";

export const fetchCurrentFile = async (path: string) => {
    const res = await fetch("/api/file/?path=" + path);
    const json = await res.json();
    const validatedCurrentFile = parse(CurrentFileSchema, json);
    return validatedCurrentFile;
};
