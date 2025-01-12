<script lang="ts">
    import { page } from "$app/state";
    import { fetchUpdateVideoProgress } from "@/services/fetchUpdateVideoProgress";
    import { fetchVideoProgress } from "@/services/fetchVideoProgress";
    import CurrentVideoParentDirVideos from "./CurrentVideoParentDirVideos.svelte";

    let videoElement: HTMLVideoElement | null = null;

    let lastUpdated = $state(Date.now());

    let pathname = $state("/");
    $effect(() => {
        pathname = page.url.pathname || "/";
    });

    $effect(() => {
        const videoProgress = fetchVideoProgress(pathname);

        videoProgress.then((progress) => {
            if (progress?.duration && videoElement) {
                videoElement.currentTime = progress.duration;
            }
        });
    });

    const handleTimeUpdate = (
        e: Event & {
            currentTarget: EventTarget & HTMLVideoElement;
        }
    ) => {
        if (Date.now() - lastUpdated < 5000) {
            return;
        }
        if (!pathname) {
            return;
        }
        fetchUpdateVideoProgress(pathname, e.currentTarget.currentTime);
        lastUpdated = Date.now();
    };
</script>

<div>
    <video
        bind:this={videoElement}
        autoplay
        controls
        ontimeupdate={handleTimeUpdate}
        class="active:outline-none focus:outline-none aspect-video w-full"
        src={`/api/file/video-play?path=${pathname}`}
    >
        <track default kind="captions" srclang="es" />
        Your browser does not support the video.
    </video>
    <CurrentVideoParentDirVideos />
</div>
