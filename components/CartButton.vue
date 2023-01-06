<template>
    <div class="m-8 bottom-0 right-0 fixed block z-50 w-20 h-20 hover:scale-125 transition-all duration-300">
        <div class="relative w-full h-full">
            <div class="bg-amber-500 w-full h-full p-4 rounded-full shadow" @click="$emit('toggle-cart')">
                <font-awesome-icon icon="fa-solid fa-cart-shopping" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white" size="2xl"/>
            </div>
            <div class="absolute top-0 right-0 bg-red-500 text-white rounded-full h-6 w-6 text-xs py-1 text-center scale-0 translation-all duration-150" :class="{'scale-100' : countProducts() > 0}">
                {{ countProducts() }}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
		name: "CartButton",
        methods: {
            countProducts() {
                let productCount = 0;

                this.$store.state.cart.Products.forEach(product => {
                    productCount += product.Quantity;
                });

                return productCount;
            }
        }
	}
</script>