<template>
	<div class="bg-gray-100 h-fit w-fullshadow-sm relative">
        <div class="w-full max-w-[1200px] py-8 mx-auto">
            <div class="px-8 xl:px-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
                <div class="col-span-1 leading-loose">
                    <h1 class="mb-2 text-xl font-bold">Boodschappen</h1>
                    <p class="cursor-pointer hover:text-amber-500 translation-all duration-150">Producten</p>
                    <p class="cursor-pointer hover:text-amber-500 translation-all duration-150">Aanbiedingen</p>
                    <p class="cursor-pointer hover:text-amber-500 translation-all duration-150">Merken</p>
                    <p class="cursor-pointer hover:text-amber-500 translation-all duration-150">Vegan producten</p>
                </div>
                <div class="col-span-1 leading-loose">
                    <h1 class="mb-2 text-xl font-bold">Snel naar</h1>
                    <p class="cursor-pointer hover:text-amber-500 translation-all duration-150">Folder</p>
                    <p class="cursor-pointer hover:text-amber-500 translation-all duration-150">Magazine</p>
                    <p class="cursor-pointer hover:text-amber-500 translation-all duration-150">Boodschappen bestellen</p>
                    <p class="cursor-pointer hover:text-amber-500 translation-all duration-150">Gebak bestellen</p>
                </div>
                <div class="col-span-1 leading-loose">
                    <h1 class="mb-2 text-xl font-bold">Services</h1>
                    <p class="cursor-pointer hover:text-amber-500 translation-all duration-150">Klantenservice</p>
                    <p class="cursor-pointer hover:text-amber-500 translation-all duration-150">Bezorgservice</p>
                    <p class="cursor-pointer hover:text-amber-500 translation-all duration-150">HAPP App</p>
                    <p class="cursor-pointer hover:text-amber-500 translation-all duration-150">Wijnadvies</p>
                </div>
                <div class="col-span-1 leading-loose">
                    <h1 class="mb-2 text-xl font-bold">HAPP</h1>
                    <p class="cursor-pointer hover:text-amber-500 translation-all duration-150">Over HAPP</p>
                    <p class="cursor-pointer hover:text-amber-500 translation-all duration-150">Onze 7 zekerheden</p>
                    <p class="cursor-pointer hover:text-amber-500 translation-all duration-150">Werken bij HAPP</p>
                    <p class="cursor-pointer hover:text-amber-500 translation-all duration-150">Winkels</p>
                </div>
            </div>
            <div class="w-fit mt-24 flex flex-wrap gap-12 text-gray-400 mx-auto px-8">
                <span class=" hover:text-amber-500 translation-all duration-150 cursor-pointer">Algemene voorwaarden</span>
                <span class=" hover:text-amber-500 translation-all duration-150 cursor-pointer">Zakelijke algemene voorwaarden</span>
                <span class=" hover:text-amber-500 translation-all duration-150 cursor-pointer">Pricacystatement & Cookies</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
		name: "FooterSection"
	}
</script>