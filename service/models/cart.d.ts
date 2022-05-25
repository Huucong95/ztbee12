import DiscountApplication from "./discountapplication";
import LineItem from "./lineItem";
export default class Cart {
    constructor(init?: Partial<Cart>);
    attributes: {
        [key: string]: string;
    };
    cart_level_discount_applications: DiscountApplication[];
    currency: string;
    discount_applications: DiscountApplication[];
    item_count: number;
    items: LineItem[];
    items_subtotal_price: number;
    note: string;
    original_total_price: number;
    taxes_included: boolean;
    total_discount: number;
    total_price: number;
    total_weight: number;
    completed: boolean;
}
