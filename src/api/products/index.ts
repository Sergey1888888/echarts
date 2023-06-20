import {ProductsResponse} from "../../utils/types";

const getProducts = (limit = 10) => {
    return fetch(`https://dummyjson.com/products?limit=${limit}`)
        .then(res => res.json())
        .then((json: ProductsResponse) => json.products);
}

export {
    getProducts
};