<script lang="ts">
    import { page } from "$app/state";
    import "@/app.css";
    import CurrentDir from "@/components/CurrentDir.svelte";
    import CurrentVideo from "@/components/CurrentVideo.svelte";
    import PathBreadCrumbs from "@/components/PathBreadCrumbs.svelte";
    import type { CurrentFile } from "@/schemas/DirSchema";
    import { fetchCurrentFile } from "@/services/fetchCurrentFile";
    import { fetchMe } from "@/services/fetchMe";
    import { onMount } from "svelte";

    onMount(() => {
        fetchMe();
    });

    let currentFile: CurrentFile | null = $state(null);
    let error: string | null = $state(null);

    $effect(() => {
        const pathname = page.url.pathname || "/";
        error = null;
        fetchCurrentFile(pathname)
            .then((file) => {
                currentFile = file;
            })
            .catch((err) => {
                error = err.message;
            });
    });
</script>

<main class="p-4 max-w-screen-md mx-auto">
    <PathBreadCrumbs />
    {#if !currentFile}{:else if currentFile.isDir}
        <CurrentDir files={currentFile.files} />
    {:else}
        <CurrentVideo />
    {/if}
    {#if error}
        <div>{error}</div>
    {/if}
</main>
