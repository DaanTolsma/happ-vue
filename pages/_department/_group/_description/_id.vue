<template>
	<div class="w-full min-h-screen bg-gray-50 relative">
		<NavSection/>
        <!-- <pre>{{product.MainDescription}}</pre> -->
		<div class="max-w-[1200px] mx-auto pb-16 px-8 xl:px-0">
			<h1 class="text-sm text-gray-500 mb-8 font-light">{{ product.WebSubGroups[0].WebGroup.WebDepartment.Description }}<span class="mx-3">></span>{{ product.WebSubGroups[0].WebGroup.Description }}<span class="mx-3">></span>{{ product.Brand }} {{ product.MainDescription }} {{ product.SubDescription }} {{ product.CommercialContent }}</h1>
			<div class="flex flex-col sm:flex-row gap-4 xl:gap-12 pb-8">
				<div class="w-full sm:w-1/2 px-8 xl:px-0 relative">
					<img :src="product.ProductPictures[0].Url" class="aspect-square select-none"/>
					<div v-if="product.ProductOffers.length > 0" class="absolute top-0 left-0 bg-red-500 text-white rounded-lg py-1.5 px-3 m-2 text-sm">
						{{ `${getCurrentPrice(product.ProductOffers).Offer.TextPriceSign} ${getCurrentPrice(product.ProductOffers).Offer.TextPriceSign2}` }}
					</div>
				</div>
				<div class="w-full flex flex-col gap-4">
					<div>
						<h2 class="font-bold text-2xl">{{ product.Brand }} {{ product.MainDescription }} {{ product.SubDescription }}</h2>
						<p class="text-gray-500 font-sm mt-2 font-light">{{ product.CommercialContent }}</p>
					</div>
					<div class="flex gap-4">
						<div class="w-1/2">
							<span v-if="getCurrentPrice(product.ProductPrices).RegularPrice !== getCurrentPrice(product.ProductPrices).Price" class="block text-xs text-gray-500 line-through">{{ getCurrentPrice(product.ProductPrices).RegularPrice }}</span>
							<span class="block text-2xl font-bold" :class="{'text-red-500': (((getCurrentPrice(product.ProductPrices).IsActionPrice) && (getCurrentPrice(product.ProductPrices).RegularPrice !== getCurrentPrice(product.ProductPrices).Price) && (getCurrentPrice(product.ProductPrices).RegularPrice !== null)) || (product.ProductOffers.length > 0))}">{{ String(getCurrentPrice(product.ProductPrices).Price).slice(0, String(getCurrentPrice(product.ProductPrices).Price).length-2) }}<sup class="text-sm">{{ String(getCurrentPrice(product.ProductPrices).Price).slice(-2) }}</sup></span>
						</div>
						<div class="w-1/2">
							<div class="h-fit p-4 grid select-none float-right" :class="{'grid-cols-3' : getProductQuantityByID(product.ProductID) > 0}">
								<font-awesome-layers v-if="getProductQuantityByID(product.ProductID) === 1" class="group/quantity mr-1 cursor-pointer text-3xl hover:scale-125 transition-all duration-150" @click="removeProduct(product.ProductID)">
									<font-awesome-icon icon="fa-solid fa-circle" transform="shrink-1" class="text-gray-300 group-hover/quantity:text-red-500 transition-all duration-150"/>
									<font-awesome-icon icon="fa-solid fa-trash-can" transform="shrink-9" class="text-white"/>
								</font-awesome-layers>
								<font-awesome-layers v-if="getProductQuantityByID(product.ProductID) > 1" class="group/quantity mr-1 cursor-pointer text-3xl hover:scale-125 transition-all duration-150" @click="minusProduct(product.ProductID)">
									<font-awesome-icon icon="fa-solid fa-circle" transform="shrink-1" class="text-gray-300 group-hover/quantity:text-red-500 transition-all duration-150"/>
									<font-awesome-icon icon="fa-solid fa-minus" transform="shrink-8" class="text-white"/>
								</font-awesome-layers>
								<div v-if="getProductQuantityByID(product.ProductID) > 0" class="h-full relative w-full">
									<p class="absolute top-1/2 transform -translate-y-1/2 text-center w-full">{{ getProductQuantityByID(product.ProductID) }}</p>
								</div>
								<font-awesome-layers class="group/quantity ml-1 cursor-pointer text-3xl hover:scale-125 transition-all duration-150" @click="plusProduct(product.ProductID)">
									<font-awesome-icon icon="fa-solid fa-circle" transform="shrink-1" class="text-green-500"/>
									<font-awesome-icon icon="fa-solid fa-plus" transform="shrink-8" class="text-white"/>
								</font-awesome-layers>
							</div>
						</div>
					</div>
				</div>
				
			</div>
			<div v-if="product.CommodityLawName !== null" class="w-full lg:w-3/4 pb-16">
				<h3 class="text-2xl font-bold mb-4">Omschrijving</h3>
				<p class="text-gray-700">{{ product.CommodityLawName }}</p>
			</div>
			<div v-if="((product.ProductDeclarations[0] !== undefined) && (product.ProductDeclarations[0].ProductIngredients[0].Text !== undefined))" class="w-full lg:w-3/4 pb-16">
				<h3 class="text-2xl font-bold mb-4">Ingrediënten</h3>
				<p class="text-gray-700">{{ product.ProductDeclarations[0].ProductIngredients[0].Text }}</p>
			</div>
		</div>
		
        <CartButton @toggle-cart="toggleCart()"/>
		<CartMenu v-if="cartOpen" :products="products" @toggle-cart="toggleCart()"/>
		<FooterSection/>
	</div>
</template>

<script>
export default {
    async asyncData({ params }) {
        const products = await fetch("https://api.dekamarkt.nl/v1/assortmentcache/group/281/104?api_key=6d3a42a3-6d93-4f98-838d-bcc0ab2307fd").then(res => {
            if(res.ok) {
                return res.json()
            }
            throw new Error(res.status);
        });

        const product = products.filter(product => product.ProductID === parseInt(params.id))[0];

        return { products, product }
    },
	data: () => ({
		cartOpen: false,
		products: []
	}),
	head() {
			return {
				title: `${this.product.Brand !== null ? this.product.Brand : ""} ${this.product.MainDescription !== null ? this.product.MainDescription : ""} ${this.product.SubDescription !== null ? this.product.SubDescription : ""} | HAPP`
			}
		},
	methods: {
		toggleCart() {
			this.cartOpen = !this.cartOpen;
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
		minusProduct(productID) {
			this.$store.commit('cart/minusProduct', productID);
		},
		plusProduct(productID) {
			this.$store.commit('cart/plusProduct', productID);
		},
		removeProduct(productID) {
			this.$store.commit('cart/removeProduct', productID);
		},
		getProductQuantityByID(newProductID) {
			const cart = this.$store.state.cart.Products;
			let productQuantity = 0;
			
			if(cart.some(product => product.ProductID === newProductID)) {
				cart.forEach(product => {
					if(product.ProductID === newProductID) {
						productQuantity = product.Quantity;
					}
				});
			}

			return productQuantity;
		}
	},
}
</script>
  