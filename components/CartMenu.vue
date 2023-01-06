<template>
	<div class="fixed w-screen h-screen top-0 left-0 bg-black/90 z-50" @click="$emit('toggle-cart')">
        <div class="w-full sm:w-1/4 sm:min-w-[540px] bg-white right-0 top-0 h-screen fixed flex flex-col" @click.stop>
            <div class="relative w-full py-8 h-20">
                <h1 class="absolute inline-block left-0 top-1/2 transform -translate-y-1/2 ml-8 text-2xl font-bold">Winkelwagen</h1>
                <font-awesome-icon icon="fa-solid fa-times" class="absolute inline-block right-0 top-1/2 transform -translate-y-1/2 mr-8 hover:scale-125 translate-all duration-300" size="lg" @click="$emit('toggle-cart')"/>
            </div>
            <div class="p-8 h-full overflow-y-auto flex flex-col gap-4">
                <CartProduct v-for="product in $store.state.cart.Products" :key="product.ProductID" :product="getProduct(product.ProductID)" :quantity="product.Quantity" @change-quantity="updateTotalPrice()"/>
                <div v-if="$store.state.cart.Products.length < 1" class="text-center">
                    <font-awesome-icon icon="fa-solid fa-cart-shopping" size="6x" class="text-gray-200 mt-12 mb-4"/>
                    <p class="text-center italic text-gray-400">Je winkelwagen is leeg</p>
                </div>
            </div>
            <div class="h-fit bg-gray-100 p-8">
                <div class="grid grid-cols-2 mb-8">
                    <p class="text-left font-bold">Totaalbedrag</p>
                    <p class="text-right">{{ totalPrice }}</p>
                </div>
                <button class="w-full py-4 bg-amber-500 text-white rounded-full font-bold hover:bg-amber-600 transition-all duration-300">
                    Afrekenen
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
		name: "CartButton",
        props: {
			products: {
				type: Array,
				required: true
			}
		},
        data() {
            return {
                totalPrice: this.getTotalPrice(this.$store.state.cart.Products)
            }
        },
		methods: {
			slugify(string) {
				return string
					.toLowerCase()
					.trim()
					.replace(/[^\w\s-]/g, '')
					.replace(/[\s_-]+/g, '-')
					.replace(/^-+|-+$/g, '');
			},
			getCurrentPrice(prices) {
				let currentPrice = prices[0];

				prices.forEach(price => {
					if((new Date().valueOf() >= Date.parse(price.StartDate)) && (new Date().valueOf() <= Date.parse(price.EndDate))) {
						if(price.PriceID <= currentPrice.PriceID) {
							currentPrice = price;
						}
					}
				});

				return currentPrice;
			},
			getProduct(newProductID) {
                const product = this.products.filter(product => product.ProductID === newProductID)[0];
                return product;
            },
            getTotalPrice(cartProducts) {
                let totalPrice = 0.00;

                cartProducts.forEach(product => {
                    totalPrice += (this.getCurrentPrice(this.getProduct(product.ProductID).ProductPrices).Price * product.Quantity);
                });

                return totalPrice.toFixed(2);
            },
            updateTotalPrice() {
                this.totalPrice = this.getTotalPrice(this.$store.state.cart.Products);
            }
		}
	}
</script>
  