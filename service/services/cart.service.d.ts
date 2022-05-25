import SdkClientService from ".";
import { ShoppingCartInput } from "../api";
import SdkClientApi from "../common/sdk.client";
import Cart from "../models/cart";
import ServiceObserver from "../models/observer/service_observer";
export interface ICartService extends ServiceObserver {
    getCartInfo(): Promise<Cart>;
    addToCart(body: ShoppingCartInput): Promise<String>;
    updateCartQuantity(body: ShoppingCartInput): Promise<any>;
    deleteItemFromCart(supplierId: string, productId: string): Promise<any>;
    deleteCart(): Promise<any>;
}
export default class CartService implements ICartService {
    private _sdk;
    private _store_channel;
    private _partnerId;
    private _sessionId;
    constructor(partnerId: string, store_channel: string, sessionId: string, sdk: SdkClientApi);
    update(serviceSubject: SdkClientService): void;
    set sdk(sdk: SdkClientApi);
    get sdk(): SdkClientApi;
    get store_channel(): string;
    get sessionId(): string;
    get partnerId(): string;
    set store_channel(store_channel: string);
    set partnerId(partnerId: string);
    set sessionId(sessionId: string);
    getCartInfo(): Promise<Cart>;
    static generateSessionIdForCart(length: number): string;
    addToCart(body: ShoppingCartInput): Promise<String>;
    updateCartQuantity(body: ShoppingCartInput): Promise<any>;
    deleteItemFromCart(supplierId: string, producId: string): Promise<any>;
    deleteCart(): Promise<any>;
}
