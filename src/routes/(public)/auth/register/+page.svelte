<script lang="ts">
    import type { PageData } from "./$types";
    import { superForm } from "sveltekit-superforms/client";

    export let data: PageData;

    const { form, message, enhance, constraints, submitting } = superForm(
        data.form
    );
</script>

<svelte:head>
    <title>Регистрация</title>
</svelte:head>

<form
    class="flex flex-col items-center gap-4 max-w-lg mx-auto p-4"
    method="POST"
    use:enhance
>
    <h1 class="text-center">Регистрация</h1>

    <div class="bg-base-200 card p-4 w-full card-body card-compact">
        <div>
            <span class="label label-text">Логин</span>
            <input
                type="text"
                placeholder="Логин"
                name="username"
                class="input input-secondary input-bordered w-full"
                bind:value={$form.username}
                {...$constraints.username}
            />
        </div>
        <div>
            <span class="label label-text">Почта</span>
            <input
                type="email"
                placeholder="Почта"
                name="email"
                class="input input-secondary input-bordered w-full"
                bind:value={$form.email}
                {...$constraints.email}
            />
        </div>
        <div>
            <span class="label label-text">Имя</span>
            <input
                type="text"
                placeholder="Имя"
                name="givenName"
                class="input input-secondary input-bordered w-full"
                bind:value={$form.givenName}
                {...$constraints.givenName}
            />
        </div>
        <div>
            <span class="label label-text">Фамилия</span>
            <input
                type="text"
                placeholder="Фамилия"
                name="familyName"
                class="input input-secondary input-bordered w-full"
                bind:value={$form.familyName}
                {...$constraints.familyName}
            />
        </div>
        <div>
            <span class="label label-text">Отчество</span>
            <input
                type="text"
                placeholder="Отчество"
                name="middleName"
                class="input input-secondary input-bordered w-full"
                bind:value={$form.middleName}
                {...$constraints.middleName}
            />
        </div>
        <div>
            <span class="label label-text">Пароль</span>
            <input
                type="password"
                placeholder="Пароль"
                name="password"
                class="input input-secondary input-bordered w-full"
                bind:value={$form.password}
                {...$constraints.password}
            />
        </div>
        <div>
            <span class="label label-text">Повторите пароль</span>
            <input
                type="password"
                placeholder="Пароль"
                name="confirmPassword"
                class="input input-secondary input-bordered w-full"
                bind:value={$form.confirmPassword}
                {...$constraints.confirmPassword}
            />
        </div>
        {#if $message}
            <span class="text-center text-red-500">{$message}</span>
        {/if}
        <button type="submit" class="btn btn-primary" disabled={$submitting}>
            {#if $submitting}
                <span class="loading loading-spinner" />
            {/if}
            Зарегистрироваться
        </button>
        <span class="text-center"
            >Уже зарегистрированы? <a href="/auth/login" class="underline"
                >Войти</a
            ></span
        >
    </div>
</form>
