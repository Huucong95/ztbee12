export default class Discount {
    constructor(init: Partial<Discount>);
    target_selection: any;
    target_type: "line_item" | "shipping_line";
    title: string;
    total_allocated_amount: number;
    type: "automatic" | "discount_code" | "manual" | "script";
    value: number;
    value_type: "fixed_amount" | "percent_tage";
}
