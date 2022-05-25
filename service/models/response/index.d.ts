import AddressShopify from "../address";
import Customer from "../customer";
import Product from "../product";
import Shop from "../shop";
import Theme from "../theme";
export default class ShopifyResponse {
    constructor(init?: Partial<ShopifyResponse>);
    customer: Customer;
    addresses: AddressShopify[];
    token: string;
    shop: Shop;
    theme: Theme;
    settings: {
        [key: string]: any;
    };
    sessionId: string;
}
export interface Province {
    provinceName: string;
    provinceId: string;
}
export interface District {
    districtId: string;
    districtName: string;
    provinceId: string;
}
export interface Ward {
    wardName: string;
    districtId: string;
    wardId: string;
}
export interface Gateway {
    accountHolder: string;
    accountNumber: string;
    bankBranch: string;
    id: string;
    image: string;
    method_id: string;
    name: string;
}
export interface Payment {
    body_html: string;
    gateways: Gateway[];
    id: string;
    name: string;
}
export interface SupplierResponseByPartnerId {
    currentPage: number;
    maxResult: number;
    totalPage: number;
    suppliers: {
        index: number;
        id: string;
        name: string;
        phone: string;
        address: string;
    }[];
}
export interface CustomResponse<T> {
    data: T;
    status: number;
    message: string;
}
export interface ProductsResponse {
    totalResult: number;
    maxResult: number;
    totalPage: number;
    currentPage: number;
    products: Product[];
}
