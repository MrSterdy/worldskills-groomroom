<script lang="ts">
    import logo from "$lib/images/logo.png";

    import dawg from "$lib/images/gallery/dawg.jpg";
    import dawg2 from "$lib/images/gallery/dawg2.jpg";
    import dawg3 from "$lib/images/gallery/dawg3.jpg";
    import kat from "$lib/images/gallery/kat.jpg";
    import kat2 from "$lib/images/gallery/kat2.jpg";
    import kat3 from "$lib/images/gallery/kat3.jpg";
    import paws1 from "$lib/images/gallery/paws1.jpg";
    import paws2 from "$lib/images/gallery/paws2.jpg";
</script>

<svelte:head>
    <title>GroomRoom</title>
</svelte:head>

<article class="space-y-8">
    <div class="grid place-items-center text-center gap-4 mx-auto max-w-[42rem]">
        <img class="w-56 h-52" src={logo} alt="GroomRoom" />

        <h1>Сделаем модельную стрижку вашему питомцу <span class="text-primary">быстро</span> и <span class="text-primary">качественно</span>!</h1>

        <button class="btn btn-primary">Записаться</button>
    </div>

    <section class="space-y-12 px-4 md:px-24">
        <div class="space-y-4 md:flex md:gap-12 md:space-y-0">
            <img src={dawg3} alt="homie" class="w-full rounded-box md:w-auto md:h-72" />
            <div class="space-y-4">
                <h2 class="text-secondary">Безболезненные решения</h2>
                <p>Наша философия заключается в том, что уход должен быть максимально комфортным и не причиниял боли.</p>
                <p>Мы предлагаем увлекательные, быстрые и эффективные сеансы груминга для вашего питомца.</p>
            </div>
        </div>
        <div class="space-y-4 md:flex md:gap-12 md:space-y-0">
            <div class="space-y-4">
                <h2 class="text-secondary">Нежный уход за кожей и шерстью даже для самых непослушных</h2>
                <p>Ваш пушистый друг имеет более чувствительную кожу, чем у обычного человека.</p>
                <p><span class="text-secondary">GroomRoom</span> ставит безопасный уход в главный приоритет для поддержания идеальной и, в конечном итоге, долгой жизни питомца</p>
            </div>
            <img src={kat3} alt="homie" class="w-full rounded-box md:w-auto md:h-72" />
        </div>
    </section>

    <section class="space-y-4">
        <h2 class="text-center">Наши работы</h2>

        <div class="carousel carousel-center p-4 space-x-4 w-full bg-secondary">
            <div class="carousel-item">
                <img class="h-72 w-auto rounded-box" src={dawg} alt="cut" />
            </div>
            <div class="carousel-item">
                <img class="h-72 w-auto rounded-box" src={kat} alt="cut" />
            </div>
            <div class="carousel-item">
                <img class="h-72 w-auto rounded-box" src={dawg2} alt="cut" />
            </div>
            <div class="carousel-item">
                <img class="h-72 w-auto rounded-box" src={kat2} alt="cut" />
            </div>
            <div class="carousel-item">
                <img class="h-72 w-auto rounded-box" src={paws1} alt="cut" />
            </div>
            <div class="carousel-item">
                <img class="h-72 w-auto rounded-box" src={paws2} alt="cut" />
            </div>
        </div>
    </section>
</article>
