<template>
	<div class="inline-block bg-white rounded-md shadow-sm text-gray-900 group/card">
		<div class="h-full flex flex-col gap-4">
			<div class="h-fit">
				<NuxtLink :to="'/' + slugify(product.WebSubGroups[0].WebGroup.WebDepartment.Description) + '/' + slugify(product.WebSubGroups[0].WebGroup.Description) + '/' + slugify(product.MainDescription) + '-' + slugify(product.CommercialContent) + '/' + product.ProductID">
					<div class="relative">
						<img :src="product.ProductPictures[0].Url" class="aspect-square scale-90 group-hover/card:scale-100 transition-all duration-200 p-4 select-none"/>
						<div v-if="product.ProductOffers.length > 0" class="absolute bottom-0 left-0 bg-red-500 text-white rounded py-0.5 px-1 m-2 text-xs">
							{{ `${getCurrentPrice(product.ProductOffers).Offer.TextPriceSign} ${getCurrentPrice(product.ProductOffers).Offer.TextPriceSign2}` }}
						</div>
						<div class="absolute bottom-0 right-0 bg-white/90 text-right px-2 py-1 rounded-md m-2">
							<span v-if="getCurrentPrice(product.ProductPrices).RegularPrice !== getCurrentPrice(product.ProductPrices).Price" class="block text-xs text-gray-500 line-through">{{ getCurrentPrice(product.ProductPrices).RegularPrice }}</span>
							<span class="block text-2xl font-bold" :class="{'text-red-500': (((getCurrentPrice(product.ProductPrices).IsActionPrice) && (getCurrentPrice(product.ProductPrices).RegularPrice !== getCurrentPrice(product.ProductPrices).Price) && (getCurrentPrice(product.ProductPrices).RegularPrice !== null)) || (product.ProductOffers.length > 0))}">{{ String(getCurrentPrice(product.ProductPrices).Price).slice(0, String(getCurrentPrice(product.ProductPrices).Price).length-2) }}<sup class="text-sm">{{ String(getCurrentPrice(product.ProductPrices).Price).slice(-2) }}</sup></span>
						</div>
					</div>
					<div class="pt-8 px-4">
						<p class="font-bold text-sm">{{ product.Brand }} {{ product.MainDescription }} {{ product.SubDescription }}</p>
						<p class="text-gray-500 text-xs mt-1 font-light">{{ product.CommercialContent }}</p>
					</div>
				</NuxtLink>
			</div>
			<div class="w-full h-full min-h-[3rem] relative">
				<div class="absolute bottom-0 right-0 h-fit p-4 grid select-none" :class="{'grid-cols-3' : getProductQuantityByID(product.ProductID) > 0}">
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
</template>

<script>
	export default {
		name: "ProductCard",
		props: {
			product: {
				type: Object,
				required: true
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
		}
	}
</script>
  