export const state = () => (
    {
        Products: []
    }
)

export const getters = { }

export const mutations = {
    plusProduct(state, newProductID) {
        const cart = state.Products;

        if(cart.some(product => product.ProductID === newProductID)) {
            cart.forEach((product, i) => {
                if(product.ProductID === newProductID) {
                    cart[i].Quantity++;
                }
            });
        } else {
            cart.push({
                ProductID: newProductID,
                Quantity: 1
            });
        }

        state.Products = cart;
    },
    minusProduct(state, newProductID) {
        const cart = state.Products;

        if(cart.some(product => product.ProductID === newProductID)) {
            cart.forEach((product, i) => {
                if(product.ProductID === newProductID) {
                    if(cart[i].Quantity > 1) {
                        cart[i].Quantity--;
                    }
                }
            });
        }

        state.Products = cart;
    },
    removeProduct(state, newProductID) {
        const cart = state.Products;

        if(cart.some(product => product.ProductID === newProductID)) {
            cart.forEach((product, i) => {
                if(product.ProductID === newProductID) {
                    cart.splice(i, 1);
                }
            });
        }

        state.Products = cart;
    }
}