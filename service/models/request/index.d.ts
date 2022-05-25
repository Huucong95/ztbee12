export interface SuppliersByPartnerIdQuery {
    currentPage: number;
    maxResult: number;
}
export interface ProductQuery {
    category: string;
    apartment: string;
    supplier: string;
    group: string;
    geo: string;
    price_from: string;
    price_to: string;
    tag: string;
    sort_order: "ASC" | "DESC";
    sort_by: "NAME" | "PRICE";
    option: "NEW" | "HOT" | "BUY-A-LOT";
    brand: string;
    feature: string;
    keyword: string;
    on_sale: boolean;
    currentPage: number;
    maxResult: number;
}
