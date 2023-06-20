import {categories, productNumericKeys} from "../constants";

export type Categories = typeof categories[number];

export interface Products {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: Categories;
    thumbnail: string;
    images: string[];
}

export interface ProductsResponse {
    limit: number;
    skip: number;
    total: number;
    products: Products[];
}

export type Settings = keyof Products;
export type SettingsNumeric = typeof productNumericKeys[number];