import SellingPlan from './sellingplan';
export default class SellingPlanAllocation {
    compare_at_price: number | 'nil';
    per_delivery_price: number;
    price: number;
    price_adjustments: any;
    selling_plan: SellingPlan;
    selling_plan_group_id: string;
    unit_price: number | 'nil';
}
