<script lang="ts">
    import type { PageData } from "./$types";
    import { orderStatuses } from "$lib/consts";
    import Paginate from "$lib/components/Paginate.svelte";

    export let data: PageData;
</script>

<article class="flex flex-col mx-auto gap-2 max-w-xl p-4">
    <h1 class="text-center">Ваши заказы</h1>

    {#if data.orders.items.length}
        <ul class="flex flex-col gap-4">
            {#each data.orders.items as item}
                <li class="card card-body card-compact bg-base-200 flex-row p-4 gap-4 w-full">
                    <img src={item.petPhoto} alt="fotka" class="h-24 w-auto rounded-box" />

                    <div>
                        <h3 class="word-break">{item.petName}</h3>
                        <span
                            class="badge"
                            class:badge-info={item.status === "NEW"}
                            class:badge-warning={item.status ===
                                    "PROCESSING"}
                            class:badge-accent={item.status === "FINISHED"}
                        >
                            {orderStatuses[item.status]}
                        </span>
                    </div>
                </li>
            {/each}
        </ul>

        <Paginate currentPage={data.orders.page} totalItems={data.orders.total} />
    {:else}
        <h2>У вас нет заказов</h2>
    {/if}

    <a role="button" href="create" class="btn btn-primary">Создать заказ</a>
</article>
