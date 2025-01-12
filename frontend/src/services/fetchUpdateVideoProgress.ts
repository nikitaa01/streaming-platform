export const fetchUpdateVideoProgress = async (
    path: string,
    duration: number
) => {
    await fetch("/api/video-progress", {
        method: "POST",
        body: JSON.stringify({
            path: decodeURIComponent(path),
            duration,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });
};
