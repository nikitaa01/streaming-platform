export const fetchVideoProgress = async (path: string) => {
    const res = await fetch(`/api/video-progress/?path=${path}`);
    const json = await res.json();
    return json;
};
