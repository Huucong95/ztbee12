import Product from "./product";
export default class Collection {
    constructor(init?: Partial<Collection>);
    id: string;
    title: string;
    handle: string;
    url: string;
    description: string;
    products: Product[];
}
