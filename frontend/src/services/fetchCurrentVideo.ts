import { VideoProgressSchema } from "@/schemas/VideoProgress";
import { parse } from "valibot";

export const fetchCurrentVideo = async (parentPath: string) => {
    const res = await fetch(`/api/video-progress/current?path=${parentPath}`);
    const json = await res.json();
    const currentVideo = parse(VideoProgressSchema, json);
    return currentVideo;
};
