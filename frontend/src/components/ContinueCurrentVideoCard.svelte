<script lang="ts">
    import { page } from "$app/state";
    import { fetchCurrentVideo } from "@/services/fetchCurrentVideo";

    let currentVideoPath: string | null = $state(null);

    $effect(() => {
        const pathname = page.url.pathname || "/";
        fetchCurrentVideo(pathname).then((video) => {
            currentVideoPath = video?.path;
        });
    });
</script>

{#if currentVideoPath !== null}
    <div
        class="border border-blue-200 bg-blue-600 rounded-lg mb-4 px-4 py-2 hover:scale-105 transition"
    >
        <a href={currentVideoPath} class="flex gap-4 items-center">
            <h2 class="text-lg font-bold">Continue watching</h2>
            <span>{currentVideoPath.split("/").pop()}</span>
        </a>
    </div>
{/if}
