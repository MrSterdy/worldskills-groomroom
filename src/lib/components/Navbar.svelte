<script lang="ts">
    import logo2 from "$lib/images/logo2.png";
    import profile from "$lib/images/profile.png";
    import type { User } from "$lib/types";
    import { goto } from "$app/navigation";

    interface $$Props {
        dashboard: boolean;
        user?: User;
    }

    export let dashboard: boolean;
    export let user: User | undefined = undefined;

    async function logOut() {
        await fetch("/auth/logout", { method: "POST" });
        await goto("/");
    }
</script>

{#if dashboard}
    <div class="drawer drawer-end">
        <input id="header" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content flex flex-col">
            <div class="w-full navbar py-0 bg-base-200">
                <div class="flex-1 px-2 mx-2">
                    <a href="/">
                        <img class="h-20" src={logo2} alt="logo" />
                    </a>
                </div>
                <div class="flex-none md:hidden">
                    <label
                        for="header"
                        aria-label="open sidebar"
                        class="btn btn-square btn-ghost"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            class="inline-block w-6 h-6 stroke-current"
                            ><path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            ></path></svg
                        >
                    </label>
                </div>
                <div class="flex-none hidden md:block">
                    <ul class="menu menu-horizontal gap-2">
                        <li><a href="/dashboard/orders">Заказы</a></li>
                        {#if user}
                            {#if user?.isAdmin}
                                <li>
                                    <a href="/dashboard/orders/manage"
                                        >Управление</a
                                    >
                                </li>
                            {/if}
                            <li>
                                <button on:click={logOut}>Выйти</button>
                            </li>
                        {/if}
                    </ul>
                </div>
            </div>
        </div>
        <div class="drawer-side z-10">
            <label
                for="header"
                aria-label="close sidebar"
                class="drawer-overlay"
            ></label>
            <div class="menu p-4 gap-2 max-w-[50%] w-80 min-h-full bg-base-200">
                <div
                    class="self-center word-break grid place-items-center gap-2"
                >
                    <img src={profile} alt="profile" class="h-16" />

                    <h2 class="text-center">
                        {user?.familyName}
                        {user?.givenName}
                        {user?.middleName}
                    </h2>
                </div>
                <ul>
                    <li><a href="/dashboard/orders">Заказы</a></li>
                    {#if user}
                        {#if user?.isAdmin}
                            <li>
                                <a href="/dashboard/orders/manage">Управление</a
                                >
                            </li>
                        {/if}
                        <li>
                            <button on:click={logOut}>Выйти</button>
                        </li>
                    {/if}
                </ul>
            </div>
        </div>
    </div>
{:else}
    <nav class="navbar bg-base-200 justify-between py-0 md:px-12">
        <a href="/">
            <img class="h-20" src={logo2} alt="logo" />
        </a>
        <div>
            <a href="/dashboard/orders">Кабинет</a>
        </div>
    </nav>
{/if}
