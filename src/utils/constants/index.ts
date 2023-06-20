export const categories = [
    "smartphones",
    "laptops",
    "fragrances",
    "skincare",
    "groceries",
    "home-decoration",
    "furniture",
    "tops",
    "womens-dresses",
    "womens-shoes",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "womens-watches",
    "womens-bags",
    "womens-jewellery",
    "sunglasses",
    "automotive",
    "motorcycle",
    "lighting"
] as const;

export const productKeys = [
    'id',
    'title',
    'description',
    'price',
    'discountPercentage',
    'rating',
    'stock',
    'brand',
    'category',
    'thumbnail',
    'images',
];

export const productNumericKeys = [
    'id',
    'price',
    'discountPercentage',
    'rating',
    'stock',
] as const;