export default class DiscountApplication {
    target_selection: 'all' | 'extitled' | 'explicit';
    target_type: 'line_item' | 'shipping_line';
    title: string;
    total_allocated_amount: number;
    type: 'automatic' | 'discount_code' | 'manual' | 'script';
    value: string | number;
    value_type: 'fixed_amount' | 'percentage';
}
