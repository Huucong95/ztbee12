import Collection from "./collection";
import Image from "./image";
import Variant from "./variant";
export default class Product {
    constructor(init?: Partial<Product>);
    id: string;
    title: string;
    handle: string;
    type: string;
    vendor: string;
    price: string;
    price_max: string;
    price_min: string;
    price_varies: boolean;
    available: boolean;
    tags: string;
    options: string[];
    options_full: any;
    compare_at_price: number;
    compare_at_price_max: number;
    compare_at_price_min: number;
    compare_at_price_varies: boolean;
    url: string;
    featured_image: Image;
    images: string[];
    description: string;
    variants: Variant[];
    collections: Collection[];
}
