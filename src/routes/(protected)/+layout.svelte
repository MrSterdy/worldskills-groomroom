<script lang="ts">
    import Navbar from "$lib/components/Navbar.svelte";
    import type { LayoutData } from "./$types";

    export let data: LayoutData;
</script>

<main>
    <Navbar dashboard={true} user={data.user} />

    <slot />
</main>