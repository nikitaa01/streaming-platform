<script lang="ts">
    import type { File } from "../schemas/DirSchema";
    import FileLinkCard from "./FileLinkCard.svelte";

    interface Props {
        files: File[];
        activeFile?: string;
    }

    let { files, activeFile }: Props = $props();
</script>

{#each files as file}
    <FileLinkCard
        isActive={file.name === activeFile}
        name={file.name}
        to={file.path}
        isDir={file.isDir}
    />
{/each}
