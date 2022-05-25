import Address from "./address";
import Order from "./order";
export default class Customer {
    constructor(init?: Partial<Customer>);
    accepts_marketing: boolean;
    addresses: Address[];
    addresses_count: number;
    default_addresss: Address;
    email: string;
    first_name: string;
    last_name: string;
    name: string;
    has_account: boolean;
    id: string;
    last_order: Order;
    orders: Order[];
    orders_count: number;
    phone: string;
    tags: string[];
    tax_exempt: any;
    tolal_spent: number;
}
