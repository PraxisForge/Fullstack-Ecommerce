export interface Category {
    id: number;
    name: string;
    slug: string;
    image: string | null;
}

export interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: string; // Django DecimalField returns string in JSON often
    image: string | null;
    stock: number;
    category: Category;
}