<script lang="ts">
    import { page } from "$app/state";
    import type { File } from "@/schemas/DirSchema";
    import { fetchCurrentFile } from "@/services/fetchCurrentFile";
    import { onDestroy, onMount } from "svelte";
    import FileCardsList from "./FileCardsList.svelte";

    let pathname = $state("/");
    let currentFileName = $state("");
    let files: File[] = $state([]);
    $effect(() => {
        pathname = page.url.pathname || "/";
        const parts = pathname.split("/");
        currentFileName = parts.pop() || "";
        const parentPathname = parts.join("/") || "/";

        const parentFile = fetchCurrentFile(parentPathname);
        parentFile.then((parentFile) => {
            const filesCopy = structuredClone(parentFile?.files || []);

            files = filesCopy.filter((file) => !file.isDir);
        });
    });

    let divElement: HTMLDivElement | null = null;

    const scrollToActiveFile = () => {
        if (!divElement) return;
        const activeFileElement = divElement.querySelector(`#active`);
        const previousSibling = activeFileElement?.previousElementSibling;

        if (!activeFileElement) return;

        const left =
            (previousSibling as HTMLElement | undefined)?.offsetLeft || 0;
        divElement.scrollTo({
            left,
            behavior: "smooth",
        });
    };
    let observer: MutationObserver | null = $state(null);
    onMount(() => {
        observer = new MutationObserver(() => {
            scrollToActiveFile();
        });

        if (divElement) {
            observer.observe(divElement, {
                childList: true,
                subtree: true,
                attributes: true,
            });
        }
    });
    onDestroy(() => observer?.disconnect());
</script>

<div
    bind:this={divElement}
    data-current-video={currentFileName}
    class="flex overflow-auto gap-4 p-4 text-nowrap"
>
    <FileCardsList activeFile={currentFileName} {files} />
</div>
