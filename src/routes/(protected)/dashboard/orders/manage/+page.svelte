<script lang="ts">
    import type { PageData } from "./$types";
    import { orderStatuses } from "$lib/consts";
    import Paginate from "$lib/components/Paginate.svelte";

    export let data: PageData;
</script>

<article class="flex flex-col mx-auto gap-2 max-w-xl p-4">
    <h1 class="text-center">Управление заказами</h1>

    {#if data.orders.items.length}
        <ul class="flex flex-col gap-4">
            {#each data.orders.items as item}
                <li>
                    <a
                        class="card card-body card-compact bg-base-200 p-4 gap-4"
                        href={item.id.toString()}
                        role="button"
                        class:pointer-events-none={item.status === "FINISHED"}
                    >
                        {#if item.status === "FINISHED"}
                            <img
                                src={item.processedPetPhoto}
                                alt="fotka"
                                class="w-full rounded-box"
                            />
                        {/if}

                        <div class="flex gap-4 w-full">
                            <img
                                src={item.petPhoto}
                                alt="fotka"
                                class="h-24 w-auto rounded-box"
                            />

                            <div class="flex flex-col gap-2 grow">
                                <h3 class="word-break">{item.petName}</h3>
                                <div class="flex flex-col gap-2">
                                <span
                                    class="badge"
                                    class:badge-info={item.status === "NEW"}
                                    class:badge-warning={item.status ===
                                        "PROCESSING"}
                                    class:badge-accent={item.status ===
                                        "FINISHED"}
                                >
                                    {orderStatuses[item.status]}
                                </span>
                                    <span
                                    >{new Date(
                                        item.creationDate
                                    ).toLocaleString()}</span
                                    >
                                </div>
                            </div>
                        </div>
                    </a>
                </li>
            {/each}
        </ul>

        <Paginate
            currentPage={data.orders.page}
            totalItems={data.orders.total}
        />
    {:else}
        <h2 class="text-center">Нет заказов</h2>
    {/if}
</article>
