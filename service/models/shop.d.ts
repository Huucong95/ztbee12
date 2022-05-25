import Partner from "./partner";
import Store from "./store";
export default class Shop {
    constructor(init?: Partial<Shop>);
    money_with_currency_format: string;
    money_format: string;
    currency: string;
    store: Store;
    partner: Partner;
}
