<script lang="ts">
    import type { PageData } from "./$types";
    import { orderStatuses } from "$lib/consts";
    import Paginate from "$lib/components/Paginate.svelte";
    import { enhance } from "$app/forms";

    export let data: PageData;
</script>

<article class="flex flex-col mx-auto gap-2 max-w-xl p-4">
    <h1 class="text-center">Ваши заказы</h1>

    {#if data.orders.items.length}
        <ul class="flex flex-col gap-4">
            {#each data.orders.items as item}
                <li
                    class="card card-body card-compact bg-base-200 p-4 gap-4 w-full"
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
                                class:badge-accent={item.status === "FINISHED"}
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

                    {#if item.status === "NEW"}
                        <form method="POST" use:enhance>
                            <input type="hidden" name="id" value={item.id} />

                            <button type="submit" class="btn btn-ghost w-10 h-10 p-2 fill-red-500">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-full h-full"><path d="M21,4H17.9A5.009,5.009,0,0,0,13,0H11A5.009,5.009,0,0,0,6.1,4H3A1,1,0,0,0,3,6H4V19a5.006,5.006,0,0,0,5,5h6a5.006,5.006,0,0,0,5-5V6h1a1,1,0,0,0,0-2ZM11,2h2a3.006,3.006,0,0,1,2.829,2H8.171A3.006,3.006,0,0,1,11,2Zm7,17a3,3,0,0,1-3,3H9a3,3,0,0,1-3-3V6H18Z"/><path d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18Z"/><path d="M14,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z"/></svg>
                            </button>
                        </form>
                    {/if}
                </li>
            {/each}
        </ul>

        <Paginate
            currentPage={data.orders.page}
            totalItems={data.orders.total}
        />
    {:else}
        <h2 class="text-center">У вас нет заказов</h2>
    {/if}

    <a role="button" href="create" class="btn btn-primary">Создать заказ</a>
</article>
