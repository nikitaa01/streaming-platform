<script lang="ts">
    import { page } from "$app/state";

    let pathSplitted: string[] = $state([]);

    $effect(() => {
        const pathname = page.url.pathname || "/";
        pathSplitted = pathname === "/" ? [""] : pathname.split("/");
    });
</script>

<nav class="py-4 flex gap-2 items-center text-nowrap text-sm overflow-auto">
    {#each pathSplitted as path, index}
        {#if index === pathSplitted.length - 1}
            <span class="px-2 py-1.5">
                {decodeURIComponent(path) || "Home"}
            </span>
        {:else}
            <a
                href={pathSplitted.slice(0, index + 1).join("/") || "/"}
                class="text-gray-400 px-2 py-1.5 rounded-lg hover:bg-gray-600 hover:text-white transition"
            >
                {#if index === 0}
                    Home
                {:else}
                    {decodeURIComponent(path)}
                {/if}
            </a>
            <span class="text-gray-400">/</span>
        {/if}
    {/each}
</nav>
