<script lang="ts">
    import type { PageData } from "./$types";
    import { enhance } from "$app/forms";
    import { allowedImageTypes } from "$lib/consts";

    export let data: PageData;
</script>

<form
    class="flex flex-col items-center gap-4 max-w-lg mx-auto p-4"
    method="POST"
    use:enhance
>
    <h1 class="text-center word-break">
        Управление заказом "{data.order.petName}"
    </h1>

    <div class="bg-base-200 card p-4 gap-4 w-full card-body card-compact">
        <img src={data.order.petPhoto} alt="fotka" class="rounded-box" />

        <div class="flex flex-col gap-4">
            {#if data.order.status === "NEW"}
                <button type="submit" class="btn btn-primary">
                    Начать обработку
                </button>
            {:else}
                <div>
                    <span class="label label-text">Результат обработки</span>
                    <input
                        type="file"
                        class="file-input file-input-bordered file-input-secondary w-full"
                        name="petImage"
                        required
                        accept={allowedImageTypes
                        .map(type => "." + type.split("/")[1])
                        .join(", ")}
                    />
                </div>
                <button type="submit" class="btn btn-primary">
                    Закончить обработку
                </button>
            {/if}
        </div>
    </div>
</form>
