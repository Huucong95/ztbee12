import SdkClientService from ".";
import SdkClientApi from "../common/sdk.client";
import { ProductQuery } from "../models";
import ServiceObserver from "../models/observer/service_observer";
import Product from "../models/product";
import { ProductsResponse } from "../models/response";
/**
 * Interface for UserService
 */
export interface IProductService extends ServiceObserver {
    getProductByHandle(handle: string): Promise<Product>;
    getProductById(id: string): Promise<Product>;
    getProductByVariantId(variantId: string): Promise<Product>;
    getProducts(): Promise<ProductsResponse>;
    getFavoriteProducts(): Promise<Product[]>;
    getFavoriteProduct(productId: string): Promise<Product[]>;
    addFavoriteProduct(productId: string): Promise<Product>;
    removeFavoriteProduct(productId: string): Promise<Product>;
}
export default class ProductService implements IProductService {
    private _partnerId;
    private _storeChannel;
    private _sdk;
    constructor(_partnerId: string, _storeChannel: string, _sdk: SdkClientApi);
    getFavoriteProducts(): Promise<Product[]>;
    getFavoriteProduct(productId: string): Promise<Product[]>;
    addFavoriteProduct(productId: string): Promise<Product>;
    removeFavoriteProduct(productId: string): Promise<Product>;
    update(serviceSubject: SdkClientService): void;
    set sdk(sdk: SdkClientApi);
    get sdk(): SdkClientApi;
    get partnerId(): string;
    get storeChannel(): string;
    set partnerId(partnerId: string);
    set storeChannel(storeChannel: string);
    getProducts(query?: Partial<ProductQuery>): Promise<ProductsResponse>;
    getProductByHandle(handle: string): Promise<Product>;
    getProductById(id: string): Promise<Product>;
    getProductByVariantId(variantId: string): Promise<Product>;
}
