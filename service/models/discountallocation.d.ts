import DiscountApplication from "./discount";
export default class DiscountAllocation {
    constructor(init: Partial<DiscountAllocation>);
    amount: number;
    discount_application: DiscountApplication;
}
