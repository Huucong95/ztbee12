import Address from "./address";
import Customer from "./customer";
import DiscountApplication from "./discount";
import LineItem from "./lineItem";
export default class Order {
    attributes: {
        name: string;
        value: string;
    };
    billing_address: Address;
    cancelled: boolean;
    cancelled_at: Date;
    cancel_reason: "items unavailable" | "fraudulent order" | "customer changed/cancelled order" | " other";
    cancel_reason_label: string;
    cart_level_discount_applications: DiscountApplication[];
    created_at: Date;
    customer: Customer;
    customer_url: string;
    discount_applications: DiscountApplication;
    email: string;
    financial_status: "pending" | "authorized" | "paid" | "partially_paid";
    financial_status_label: (financial_status: string) => string;
    fulfillment_status: string;
    fulfillment_status_label: (fullfillment_status: string) => string;
    line_items: LineItem[];
    line_items_subtotal_price: number;
    location: any;
    name: string;
    note: string;
    order_number: number;
    order_status_url: string;
    payment_terms: any;
    phone: string;
}
