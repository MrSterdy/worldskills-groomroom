<script lang="ts">
    import type { PageData } from "./$types";
    import { superForm } from "sveltekit-superforms/client";
    import { allowedImageTypes } from "$lib/consts";

    export let data: PageData;

    const { form, enhance, message, constraints, submitting } = superForm(
        data.form
    );
</script>

<svelte:head>
    <title>Создание заказа</title>
</svelte:head>

<form
    method="POST"
    use:enhance
    class="flex flex-col items-center gap-4 max-w-lg mx-auto p-4"
>
    <h1 class="text-center">Новая заявка</h1>

    <div class="bg-base-200 card p-4 w-full card-body card-compact">
        <div>
            <span class="label label-text">Кличка питомца</span>
            <input
                type="text"
                placeholder="Кличка"
                name="petName"
                class="input input-secondary input-bordered w-full"
                bind:value={$form.petName}
                {...$constraints.petName}
            />
        </div>
        <div>
            <span class="label label-text">Фото питомца</span>
            <input
                type="file"
                class="file-input file-input-bordered file-input-secondary w-full"
                name="petImage"
                required
                accept={allowedImageTypes.map(type => "." + type.split("/")[1]).join(", ")}
            />
        </div>
    </div>

    {#if $message}
        <span class="text-center text-red-500">{$message}</span>
    {/if}

    <button type="submit" class="btn btn-primary" disabled={$submitting}>
        {#if $submitting}
            <span class="loading loading-spinner" />
        {/if}
        Создать заявку
    </button>
</form>
