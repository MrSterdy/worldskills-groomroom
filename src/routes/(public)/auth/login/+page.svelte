<script lang="ts">
    import type { PageData } from "./$types";
    import { superForm } from "sveltekit-superforms/client";

    export let data: PageData;

    const { form, enhance, message, constraints, submitting } = superForm(
        data.form
    );
</script>

<form
    class="flex flex-col items-center gap-4 max-w-lg mx-auto p-4"
    method="POST"
    use:enhance
>
    <h1 class="text-center">Вход</h1>

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
        {#if $message}
            <span class="text-center text-red-500">{$message}</span>
        {/if}
        <button type="submit" class="btn btn-primary" disabled={$submitting}>
            {#if $submitting}
                <span class="loading loading-spinner" />
            {/if}
            Войти
        </button>
        <span class="text-center"
            >Нет аккаунта? <a href="/auth/register" class="underline"
                >Зарегистрироваться</a
            ></span
        >
    </div>
</form>
