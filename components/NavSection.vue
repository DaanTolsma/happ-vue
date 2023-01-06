<template>
	<div class="bg-white h-fit w-fullshadow-sm mb-8">
        <div class="w-full max-w-[1200px] py-8 mx-auto relative">
            <font-awesome-icon v-if="!menuOpen" icon="fa-solid fa-bars" class="absolute top-0 right-0 text-gray-700 m-8 cursor-pointer md:invisible" size="xl" @click="toggleMenu"/>
            <font-awesome-icon v-else icon="fa-solid fa-times" class="absolute top-0 right-0 text-gray-700 m-8 cursor-pointer md:invisible" size="xl" @click="toggleMenu"/>
            <div class="px-8 xl:px-0 grid grid-cols-4 gap-4">
                <NuxtLink to="/" class="col-span-4 md:col-span-1 select-none"><p class="text-amber-500 font-black text-4xl tracking-wide"><font-awesome-icon icon="fa-solid fa-cookie-bite" class="mr-3"/>HAPP</p></NuxtLink>
                <div class="relative col-span-3 md:col-span-2">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                        <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="text-gray-500"/>
                    </div>
                    <input type="search" class="pl-10 block appearance-none w-full bg-gray-100 border border-transparent text-gray-700 py-3 px-4 pr-8 rounded-full focus:outline-none focus:bg-gray-100 focus:border-gray-200 truncate" placeholder="Zoek je product" disabled>
                </div>
                <div class="w-full col-span-1">
                    <button class="w-fit block appearance-none bg-amber-500 hover:bg-amber-600 translation-all duration-300 border border-transparent text-white py-3 px-4 md:px-6 rounded-full float-right"><font-awesome-icon icon="fa-solid fa-user" transform="shrink-4" class="text-white mr-0 md:mr-2"/><span class="hidden md:inline-block">Inloggen</span></button>
                </div>
            </div>
            <div class="w-full mt-8 flex flex-wrap gap-12 text-gray-700 px-8 xl:px-0" :class="{'hidden md:flex' : !menuOpen}">
                <NuxtLink to="/"><span class=" hover:text-amber-500 translation-all duration-150 cursor-pointer">Boodschappen</span></NuxtLink>
                <span class=" hover:text-amber-500 translation-all duration-150 cursor-pointer">Aanbiedingen</span>
                <span class=" hover:text-amber-500 translation-all duration-150 cursor-pointer">Folder</span>
                <span class=" hover:text-amber-500 translation-all duration-150 cursor-pointer">Recepten</span>
                <span class=" hover:text-amber-500 translation-all duration-150 cursor-pointer">Services</span>
                <span class=" hover:text-amber-500 translation-all duration-150 cursor-pointer">Spaaracties en meer</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
		name: "NavSection",
        data: () => ({
            menuOpen: false
        }),
        methods: {
            toggleMenu() {
                this.menuOpen = !this.menuOpen;
            }
        }
	}
</script>