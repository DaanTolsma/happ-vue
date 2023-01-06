<template>
	<div class="inline-block">
        <div class="grid grid-cols-4 gap-4">
			<div class="col-span-1">
				<NuxtLink :to="'/' + slugify(product.WebSubGroups[0].WebGroup.WebDepartment.Description) + '/' + slugify(product.WebSubGroups[0].WebGroup.Description) + '/' + slugify(product.MainDescription) + '-' + slugify(product.CommercialContent) + '/' + product.ProductID">
					<img :src="product.ProductPictures[0].Url" class="aspect-square"/>
				</NuxtLink>
			</div>
			<div class="col-span-3 grid grid-cols-4 gap-2">
				<div class="col-span-2 relative">
					<div class="absolute top-1/2 transform -translate-y-1/2">
						<NuxtLink :to="'/' + slugify(product.WebSubGroups[0].WebGroup.WebDepartment.Description) + '/' + slugify(product.WebSubGroups[0].WebGroup.Description) + '/' + slugify(product.MainDescription) + '-' + slugify(product.CommercialContent) + '/' + product.ProductID">
							<p class="font-bold text-xs sm:text-sm vertical-align">{{ product.Brand }} {{ product.MainDescription }} {{ product.SubDescription }}</p>
							<p class="text-gray-500 text-xs mt-1 font-light">{{ product.CommercialContent }}</p>
						</NuxtLink>
					</div>
				</div>
				<div class="relative">
					<div class="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 w-20 text-center select-none text-sm">
						<font-awesome-layers class="group mr-1 cursor-pointer" :class="{'cursor-not-allowed' : quantity <= 1}" @click="minusProduct(product.ProductID); $emit('change-quantity')">
							<font-awesome-icon icon="fa-solid fa-circle" transform="grow-1" class="text-gray-300 group-hover:text-red-500 transition-all duration-150" :class="{'text-gray-100 group-hover:text-gray-100' : quantity <= 1}"/>
							<font-awesome-icon icon="fa-solid fa-minus" transform="shrink-3" class="text-white"/>
						</font-awesome-layers>
						{{ quantity }}
						<font-awesome-layers class="group ml-1 cursor-pointer" @click="plusProduct(product.ProductID); $emit('change-quantity')">
							<font-awesome-icon icon="fa-solid fa-circle" transform="grow-1" class="text-gray-300 group-hover:text-green-500 transition-all duration-150"/>
							<font-awesome-icon icon="fa-solid fa-plus" transform="shrink-3" class="text-white"/>
						</font-awesome-layers>
					</div>
				</div>
				<div class="relative select-none">
					<div class="absolute top-1/2 right-0 transform -translate-y-1/2 right-align text-sm">
						<p>{{ getCurrentPrice(product.ProductPrices).Price }}<font-awesome-icon icon="fa-solid fa-trash-can" transform="shrink-1" class="ml-2 cursor-pointer text-gray-300 hover:text-red-500 transition-all duration-150" @click="removeProduct(product.ProductID); $emit('change-quantity')"/></p>
					</div>
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
			},
            quantity: {
                type: Number,
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
			plusProduct(productID) {
				this.$store.commit('cart/plusProduct', productID);
			},
			minusProduct(productID) {
				this.$store.commit('cart/minusProduct', productID);
			},
			removeProduct(productID) {
				this.$store.commit('cart/removeProduct', productID);
			}
		}
	}
</script>
  