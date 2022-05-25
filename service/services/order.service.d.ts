import { CancelOrder, Order } from "../api";
import SdkClientApi from "../common/sdk.client";
import ServiceObserver from "../models/observer/service_observer";
import SdkClientService from ".";
import { InfoTokenOrderWithoutLogin } from "../utils";
interface QueryOrderBody {
    customer_info: string;
    order_id: string;
    status?: string;
    tracking?: boolean;
    currentPage?: number;
    maxResult?: number;
}
export interface IOrderService extends ServiceObserver {
    consultOrderWithoutLogin(query: QueryOrderBody): Promise<any>;
    createOrderWithoutLogin(query: {
        platform: string;
        collaboratorId?: string;
    }, body: Order, accessToken: string): Promise<any>;
    getOrderInfo(orderIdL: string, accessToken: string, query: {
        tracking: boolean;
    }): Promise<any>;
    cancelOrder(body: CancelOrder, accessToken: string): Promise<any>;
    getListOrders(accessToken: string, query: {
        keyword?: string;
        status?: string;
        currentPage?: number;
        maxResult?: number;
    }): Promise<any>;
    createOrderWithLogin(query: {
        collaboratorId?: string;
        platform: string;
    }, body: Order, accessToken: string): Promise<any>;
    getOrdersStatus(accessToken: string): Promise<any>;
}
export default class OrderService implements IOrderService {
    private _partnerId;
    private _store_channel;
    private _sdk;
    constructor(_partnerId: string, _store_channel: string, _sdk: SdkClientApi);
    update(serviceSubject: SdkClientService): void;
    static generateTokenForOrderWithoutLogin(data: InfoTokenOrderWithoutLogin): string;
    set sdk(sdk: SdkClientApi);
    get sdk(): SdkClientApi;
    get partnerId(): string;
    get store_channel(): string;
    set partnerId(partnerId: string);
    set store_channel(store_channel: string);
    consultOrderWithoutLogin(query: QueryOrderBody): Promise<any>;
    createOrderWithoutLogin(query: {
        platform: string;
        collaboratorId?: string;
    }, body: Order, accessToken: string): Promise<any>;
    getOrderInfo(orderId: string, accessToken: string, query: {
        tracking: boolean;
    }): Promise<any>;
    cancelOrder(body: CancelOrder, accessToken: string): Promise<any>;
    getListOrders(accessToken: string, query?: {
        keyword?: string;
        status?: string;
        currentPage?: number;
        maxResult?: number;
    }): Promise<any>;
    createOrderWithLogin(query: {
        collaboratorId?: string;
        platform: string;
    }, body: Order, accessToken: string): Promise<any>;
    getOrdersStatus(accessToken: string): Promise<any>;
}
export {};
