<script lang="ts">
    import Navbar from "$lib/components/Navbar.svelte";
</script>

<main>
    <Navbar dashboard={false} />

    <slot />
</main>
