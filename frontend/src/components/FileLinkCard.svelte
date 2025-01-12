<script lang="ts">
    import DirIcon from "./icons/DirIcon.svelte";
    import VideoIcon from "./icons/VideoIcon.svelte";

    interface Props {
        name: string;
        to: string;
        isDir: boolean;
        isActive?: boolean;
    }

    let { name, to, isDir, isActive }: Props = $props();
</script>

<a
    href={`${to}`}
    id={isActive ? "active" : undefined}
    class={`flex gap-4 items-center rounded-lg p-4 border border-gray-600 aspect-[21/9] group hover:scale-105 transition ${
        isActive ? "bg-neutral-800" : ""
    }`}
>
    {#if isDir}
        <DirIcon className="w-8 h-8" />
    {:else}
        <VideoIcon className="w-8 h-8" />
    {/if}
    <div class="relative">
        <h3
            class="text-sm hidden group-hover:block group-hover:absolute group-hover:bg-[rgb(18,18,18)] group-hover:z-10 transition-all animate-fade-in animate-duration-fast"
        >
            {name}
        </h3>
        <h3 class="text-sm">{name}</h3>
    </div>
</a>
