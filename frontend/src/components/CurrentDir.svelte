<script lang="ts">
    import type { File } from "../schemas/DirSchema";
    import ContinueCurrentVideoCard from "./ContinueCurrentVideoCard.svelte";
    import FileCardsList from "./FileCardsList.svelte";

    export interface Props {
        files: File[];
    }

    let { files }: Props = $props();
</script>

<div>
    <ContinueCurrentVideoCard />
    <div
        class="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(220px,calc(33%-9px)))] gap-4"
    >
        <FileCardsList {files} />
    </div>
</div>
