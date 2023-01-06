<template>
	<div class="h-full w-full bg-gray-50">
		<NavSection/>
		<div class="w-full pb-16 px-1 md:px-8">
			<div class="flex gap-2 max-w-[1200px] mx-auto flex-col md:flex-row">
				<div class="w-full md:w-1/3 lg:w-1/4 min-w-[240px]">
					<div class="block" :class="{'hidden initial md:block' : !filterOpen}">
						<p class="font-bold mb-2">Producten</p>
						<div v-for="category in productCategories" :key="`filterCategory-${category}`" class="w-full my-0.5">
							<input id="check-categories" class="appearance-none h-4 w-4 border border-gray-300 rounded bg-white checked:bg-amber-500 outline-none mt-1 align-top float-left mr-2 cursor-pointer transition-all duration-150" type="checkbox" @change="onChangeCheckCategory(category); updateProducts()">
							<label class="inline-block text-sm" for="check-categories">{{category}}</label>
						</div>
						<hr class="my-4"/>
						<p class="font-bold mb-2">Merken</p>
						<div v-for="brand in productBrands" :key="`filterBrand-${brand}`" class="w-full my-0.5">
							<input id="check-brands" class="appearance-none h-4 w-4 border border-gray-300 rounded bg-white checked:bg-amber-500 outline-none mt-1 align-top float-left mr-2 cursor-pointer transition-all duration-150" type="checkbox" @change="onChangeCheckBrand(brand); updateProducts()">
							<label class="inline-block text-sm" for="check-brands">{{brand}}</label>
						</div>
						<hr class="my-4"/>
						<div class="w-full my-0.5">
							<input id="check-offers" class="appearance-none h-4 w-4 border border-gray-300 rounded bg-white checked:bg-amber-500 outline-none mt-1 align-top float-left mr-2 cursor-pointer transition-all duration-150" type="checkbox" @change="onChangeCheckOffer($event); updateProducts()">
							<label class="inline-block text-sm" for="check-offers">Aanbiedingen</label>
						</div>
					</div>
				</div>
				<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 w-full h-fit p-2">
					<div class="w-full text-right col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 pb-4">
						<button class="bg-white py-3 px-4 rounded-full shadow float-right block md:hidden ml-4" @click="toggleFilter">Filter<font-awesome-icon icon="fa-solid fa-filter" transform="shrink-4" class="text-gray-400 ml-2"/></button>
						<div class="relative float-right w-fit">
							<select class="block appearance-none w-full bg-white border border-white shadow text-gray-700 py-3 px-4 pr-8 rounded-full focus:outline-none focus:bg-white focus:border-gray-200" @change="onChangeSort($event); updateProducts()">
								<option disabled selected>Sorteer op</option>
								<option value="r">Relevantie</option>
								<option value="p-lh">Prijs (laag-hoog)</option>
								<option value="p-hl">Prijs (hoog-laag)</option>
							</select>
							<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
								<font-awesome-icon icon="fa-solid fa-sort" transform="shrink-4" class="mr-2"/>
							</div>
						</div>
					</div>
					<ProductCard v-for="product in products" :key="`productCard-${product.ProductID}`" :product="product"/>
					<div v-if="products.length === 0" class="mx-auto text-center col-span-4">
                        <font-awesome-icon icon="fa-solid fa-basket-shopping" size="6x" class="text-gray-200 mt-12 mb-4"/>
                        <p class="text-center italic text-gray-400">Geen producten gevonden</p>
                    </div>
				</div>
			</div>
			<CartButton @toggle-cart="toggleCart()"/>
			<CartMenu v-if="cartOpen" :key="`cartMenu-${keyCart}`" :products="productsInit" @toggle-cart="toggleCart()"/>
		</div>
		<FooterSection/>
	</div>
</template>

<script>
	export default {
		name: 'IndexPage',
		async asyncData({ params }) {
			const productsInit = await fetch("https://api.dekamarkt.nl/v1/assortmentcache/group/281/104?api_key=6d3a42a3-6d93-4f98-838d-bcc0ab2307fd").then(res => {
				if(res.ok) {
					return res.json()
				}
				throw new Error(res.status);
			});

			const products = productsInit;
			const productBrands = [];
			const productCategories = [];

			products.forEach(product => {
				if((!productBrands.includes(product.Brand)) && (product.Brand !== null)) {
					productBrands.push(product.Brand);
				}

				product.WebSubGroups.forEach(category => {
					if((!productCategories.includes(category.Description)) && (category.Description !== null)) {
						productCategories.push(category.Description);
					}
				});
			});

			return { products, productsInit, productBrands, productCategories }
		},
		data: () => ({
			cartOpen: false,
			products: [],
			productsInit: [],
			productBrands: [],
			keyCart: 0,
			filterOffers: false,
			filterBrands: [],
			filterSubGroups: [],
			sortType: null,
			filterOpen: false
		}),
		head() {
			return {
				title: `${this.products[0].WebSubGroups[0].WebGroup.WebDepartment.Description} | HAPP`
			}
		},
		methods: {
			toggleCart() {
				this.cartOpen = !this.cartOpen;
				this.keyCart++;
			},
			toggleFilter() {
				this.filterOpen = !this.filterOpen;
			},
			onChangeSort(event) {
				this.sortType = event.target.value;
			},
			onChangeCheckOffer(event) {
				this.filterOffers = event.target.checked;
			},
			onChangeCheckBrand(brand) {
				if(!this.filterBrands.includes(brand)) {
					this.filterBrands.push(brand);
				} else {
					const index = this.filterBrands.indexOf(brand);
					if(index > -1) {
						this.filterBrands.splice(index, 1);
					}
				}
			},
			onChangeCheckCategory(category) {
				if(!this.filterSubGroups.includes(category)) {
					this.filterSubGroups.push(category);
				} else {
					const index = this.filterSubGroups.indexOf(category);
					if(index > -1) {
						this.filterSubGroups.splice(index, 1);
					}
				}
			},
			updateProducts() {
				let newProducts = this.productsInit;

				const getCurrentPrice = (prices) => {
					let currentPrice = prices[0];
					prices.forEach(price => {
						if((new Date().valueOf() >= Date.parse(price.StartDate)) && (new Date().valueOf() <= Date.parse(price.EndDate))) {
							if(price.PriceID <= currentPrice.PriceID) {
								currentPrice = price;
							}
						}
					});

					return currentPrice;
				}

				switch(this.sortType) {
					case "p-lh":
					newProducts.sort((a, b) => {
							if(getCurrentPrice(a.ProductPrices).Price < getCurrentPrice(b.ProductPrices).Price) {
								return -1;
							}
							return 0;
						});
						break;
					case "p-hl":
						newProducts.sort((a, b) => {
							if(getCurrentPrice(a.ProductPrices).Price > getCurrentPrice(b.ProductPrices).Price) {
								return -1;
							}
							return 0;
						});
						break;
					default:
						newProducts.sort((a, b) => {
							if(a.ProductID < b.ProductID) {
								return -1;
							}
							return 0;
						});
				}

				if(this.filterOffers) {
					newProducts = newProducts.filter(product => {
						return (product.ProductOffers.length > 0) || ((getCurrentPrice(product.ProductPrices).Price < getCurrentPrice(product.ProductPrices).RegularPrice) && (getCurrentPrice(product.ProductPrices).RegularPrice !== null));
					});
				} else {
					newProducts = newProducts.filter(product => {
						return product.ProductOffers.length >= 0;
					});
				}

				if(this.filterBrands.length > 0) {
					newProducts = newProducts.filter(product => {
						return this.filterBrands.includes(product.Brand);
					});
				}

				if(this.filterSubGroups.length > 0) {
					newProducts = newProducts.filter(product => {
						let countIncludes = 0;

						product.WebSubGroups.forEach(category => {
							if (this.filterSubGroups.includes(category.Description)) {
								countIncludes++;
							}
						});

						return countIncludes;
					});
				}

				this.products = newProducts;
			}
		},
	}
</script>
