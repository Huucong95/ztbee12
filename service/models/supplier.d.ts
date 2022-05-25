import { Address } from "../api";
export default class Supplier {
    constructor(init: Partial<Supplier>);
    "id": string;
    "name": string;
    "phone": string;
    "address": Address;
}
