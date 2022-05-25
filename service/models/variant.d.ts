export default class Variant {
    constructor(init?: Partial<Variant>);
    id: string;
    title: string;
    price: number;
    weight: number;
    compare_at_price: number;
    available: boolean;
    inventory_quantity: number;
    option1: string | [];
    option2: string | [];
    option3: string | [];
    options: string | any[];
    options_full: [];
}
