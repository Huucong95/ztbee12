import fetch from "node-fetch";
import { ProductQuery } from "../models";
export declare type Platform = "WEB" | "ANDROID" | "IOS";
export interface LoginModel {
    username?: string;
    password?: string;
    access_token?: string;
    platform?: string;
}
export interface ContactDTO {
    name?: string;
    phone?: string;
    email?: string;
    content?: string;
}
export interface ResetPasswordDTO {
    code?: string;
    new_password?: string;
}
export interface SendCodeActiveDTO {
    platform?: string;
    url_active_account?: string;
}
export interface ForgotPasswordDTO {
    email?: string;
    url_active_account?: string;
}
export interface ActiveAccountDTO {
    code?: string;
}
export interface Address {
    address1?: string;
    name?: string;
    phone?: string;
    province_code?: string;
    district_code?: string;
    ward_code?: string;
}
export interface ChangePasswordDTO {
    old_password?: string;
    new_password?: string;
}
export interface Customer {
    email?: string;
    name?: string;
    phone?: string;
    /** M = Nam; F = Nữ */
    gender?: string;
    /** @format int64 */
    birthday_time_long?: number;
}
export interface RegisterAccountDTO {
    fullName?: string;
    email?: string;
    password?: string;
    phone?: string;
    /** @example WEB, ANDROID, IOS */
    platform?: Platform;
    url_active_account?: string;
}
export interface Order {
    /** @format int64 */
    time?: number;
    customer?: Customer;
    note?: string;
    order_id?: string;
    line_items: OrderItem[];
    shipping_address_id?: string;
    shipping_address?: Address;
    payment_method?: string;
    payment_gateway?: string;
}
export interface ShoppingCartInput {
    product_id?: string;
    quantity?: number;
    supplier_id?: string;
}
export interface OrderItem {
    quantity: number;
    product_id: string;
    supplier_id: string;
}
export interface CancelOrder {
    reason?: string;
    order_id: string;
}
export declare type QueryParamsType = Record<string | number, any>;
export declare type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;
export interface FullRequestParams extends Omit<RequestInit, "body"> {
    /** set parameter to `true` for call `securityWorker` for this request */
    secure?: boolean;
    /** request path */
    path: string;
    /** content type of request body */
    type?: ContentType;
    /** query params */
    query?: QueryParamsType;
    /** format of response (i.e. response.json() -> format: "json") */
    format?: ResponseFormat;
    /** request body */
    body?: unknown;
    /** base url */
    baseUrl?: string;
    /** request cancellation token */
    cancelToken?: CancelToken;
}
export declare type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;
export interface ApiConfig<SecurityDataType = unknown> {
    baseUrl?: string;
    baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
    securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
    customFetch?: typeof fetch;
}
export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
    data: D;
    error: E;
}
declare type CancelToken = Symbol | string | number;
export declare enum ContentType {
    Json = "application/json",
    FormData = "multipart/form-data",
    UrlEncoded = "application/x-www-form-urlencoded"
}
export declare class HttpClient<SecurityDataType = unknown> {
    baseUrl: string;
    private securityData;
    private securityWorker?;
    private abortControllers;
    private customFetch;
    private baseApiParams;
    constructor(apiConfig?: ApiConfig<SecurityDataType>);
    setSecurityData: (data: SecurityDataType | null) => void;
    private encodeQueryParam;
    private addQueryParam;
    private addArrayQueryParam;
    protected toQueryString(rawQuery?: QueryParamsType): string;
    protected addQueryParams(rawQuery?: QueryParamsType): string;
    private contentFormatters;
    private mergeRequestParams;
    private createAbortSignal;
    abortRequest: (cancelToken: CancelToken) => void;
    request: <T = any, E = any>({ body, secure, path, type, query, format, baseUrl, cancelToken, ...params }: FullRequestParams) => Promise<HttpResponse<T, E>>;
}
/**
 * @title Gateway API
 * @version 1.0
 * @license ECOMOS (https://ecomos.vn)
 * @baseUrl https://api-dev.ecomos.vn:8443/gateway-service
 *
 *
 * 	HTTP Code
 * 		200 - Success
 * 		401 - Unauthorized
 * 		400 - Bad Request (some parameters may contain invalid values)
 * 		500 - Server error
 *
 * 	Response Json
 * 		status": "1 or 0, 1=success; 0=error",
 * 		message": "xxx",
 * 		data": "object"
 *
 * 	Date Format
 * 		Input - Time Long
 * 		Output - yyyy-MM-dd'T'HH:mm:ssZ
 */
export declare class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    v1: {
        /**
         * No description
         *
         * @tags Authenticate Service
         * @name Logout
         * @summary Đăng xuất
         * @request POST:/v1/auth
         */
        logout: (partnerId: string, params?: RequestParams) => Promise<HttpResponse<any, void>>;
        /**
         * No description
         *
         * @tags Authenticate Service
         * @name Login
         * @summary Đăng nhập
         * @request POST:/v1/auth/{partner_id}
         */
        login: (partnerId: string, body: LoginModel, params?: RequestParams) => Promise<HttpResponse<any, void>>;
        /**
         * No description
         *
         * @tags Authenticate Service
         * @name Login
         * @summary Đăng nhập
         * @request POST:/v1/auth/{partner_id}
         */
        loginGoogle: (partnerId: string, body: LoginModel, params?: RequestParams) => Promise<HttpResponse<any, void>>;
        /**
         * No description
         *
         * @tags Authenticate Service
         * @name Login
         * @summary Đăng nhập
         * @request POST:/v1/auth/{partner_id}
         */
        loginFB: (partnerId: string, body: LoginModel, params?: RequestParams) => Promise<HttpResponse<any, void>>;
        /**
         * No description
         *
         * @tags Apartment Service
         * @name GetListApartments
         * @summary Danh sách chung cư
         * @request GET:/v1/apartments/{partner_id}
         */
        getListApartments: (partnerId: string, query?: {
            province?: string | undefined;
            district?: string | undefined;
            ward?: string | undefined;
            currentPage?: number | undefined;
            maxResult?: number | undefined;
        } | undefined, params?: RequestParams) => Promise<HttpResponse<any, void>>;
        /**
         * No description
         *
         * @tags Contact Service
         * @name SendContact
         * @summary Gửi liên hệ
         * @request POST:/v1/contact
         */
        sendContact: (body: ContactDTO, params?: RequestParams) => Promise<HttpResponse<any, void>>;
        /**
         * No description
         *
         * @tags Balance Service
         * @name GetAccountBalance
         * @summary Ví khách hàng
         * @request GET:/v1/balance
         */
        getAccountBalance: (params?: RequestParams) => Promise<HttpResponse<any, void>>;
        /**
         * No description
         *
         * @tags Customer Service
         * @name ResetPassword
         * @summary Lấy lại mật khẩu
         * @request POST:/v1/customers/reset-password
         */
        resetPassword: (partnerId: string, body: ResetPasswordDTO, query?: {
            email?: string | undefined;
        } | undefined, params?: RequestParams) => Promise<HttpResponse<any, void>>;
        /**
         * No description
         *
         * @tags Customer Service
         * @name GetAddresses
         * @summary Danh sách địa chỉ giao hàng
         * @request GET:/v1/customers/addresses
         */
        getAddresses: (partnerId: string, params?: RequestParams) => Promise<HttpResponse<any, void>>;
        /**
         * No description
         *
         * @tags Customer Service
         * @name CreateDeliveryInfo
         * @summary Tạo địa chỉ giao hàng
         * @request POST:/v1/customers/addresses
         */
        createDeliveryInfo: (partnerId: string, body: Address, params?: RequestParams) => Promise<HttpResponse<any, void>>;
        /**
         * No description
         *
         * @tags Customer Service
         * @name ItemReceived
         * @summary Xác nhận đã nhận được hàng
         * @request POST:/v1/customers/item-received/{order_id}
         */
        itemReceived: (orderId: string, params?: RequestParams) => Promise<HttpResponse<any, void>>;
        /**
         * No description
         *
         * @tags Customer Service
         * @name SendCodeActive
         * @summary Gửi lại mã kích hoạt
         * @request POST:/v1/customers/send-code
         */
        sendCodeActive: (body: SendCodeActiveDTO, query?: {
            email?: string | undefined;
        } | undefined, params?: RequestParams) => Promise<HttpResponse<any, void>>;
        /**
         * No description
         *
         * @tags Customer Service
         * @name GetCustomerInfo
         * @summary Lấy thông tin khách hàng
         * @request GET:/v1/customers
         */
        getCustomerInfo: (partnerId: string, params?: RequestParams) => Promise<HttpResponse<any, void>>;
        /**
         * No description
         *
         * @tags Customer Service
         * @name UpdateUserInfo
         * @summary Cập nhật thông tin khách hàng
         * @request PUT:/v1/customers
         */
        updateUserInfo: (body: Customer, params?: RequestParams) => Promise<HttpResponse<any, void>>;
        /**
         * No description
         *
         * @tags Customer Service
         * @name ForgotPassword
         * @summary Quên mật khẩu
         * @request POST:/v1/customers/forgot-password
         */
        forgotPassword: (partnerId: string, body: ForgotPasswordDTO, params?: RequestParams) => Promise<HttpResponse<any, void>>;
        /**
         * No description
         *
         * @tags Customer Service
         * @name ActiveAccount
         * @summary Kích hoạt tài khoản
         * @request POST:/v1/customers/active-account
         */
        activeAccount: (partnerId: string, body: ActiveAccountDTO, query?: {
            email?: string | undefined;
        } | undefined, params?: RequestParams) => Promise<HttpResponse<any, void>>;
        /**
         * No description
         *
         * @tags Customer Service
         * @name UpdateDeliveryInfo
         * @summary Cập nhật địa chỉ giao hàng
         * @request PUT:/v1/customers/addresses/{address_id}
         */
        updateDeliveryInfo: (partnerId: string, addressId: string, body: Address, params?: RequestParams) => Promise<HttpResponse<any, void>>;
        /**
         * No description
         *
         * @tags Customer Service
         * @name DeleteDeliveryInfo
         * @summary Xoá địa chỉ giao hàng
         * @request DELETE:/v1/customers/addresses/{address_id}
         */
        deleteDeliveryInfo: (partnerId: string, addressId: string, params?: RequestParams) => Promise<HttpResponse<any, void>>;
        /**
         * No description
         *
         * @tags Customer Service
         * @name ChangePassword
         * @summary Đổi mật khẩu
         * @request PUT:/v1/customers/change-password
         */
        changePassword: (partnerId: string, body: ChangePasswordDTO, params?: RequestParams) => Promise<HttpResponse<any, void>>;
        /**
         * No description
         *
         * @tags Customer Service
         * @name MakeDefaultAddress
         * @summary Đặt địa chỉ mặc định
         * @request PUT:/v1/customers/addresses/{address_id}/default
         */
        makeDefaultAddress: (partnerId: string, addressId: string, params?: RequestParams) => Promise<HttpResponse<any, void>>;
        /**
         * No description
         *
         * @tags Customer Service
         * @name Register
         * @summary Đăng ký tài khoản
         * @request POST:/v1/customers/register/{partner_id}
         */
        register: (partnerId: string, body: RegisterAccountDTO, params?: RequestParams) => Promise<HttpResponse<any, void>>;
        /**
         * No description
         *
         * @tags Notification Service
         * @name GetNotifications
         * @summary Lấy danh sách thông báo
         * @request GET:/v1/notification
         */
        getNotifications: (query?: {
            type?: string | undefined;
            fromDate?: number | undefined;
            toDate?: number | undefined;
            currentPage?: number | undefined;
            maxResult?: number | undefined;
        } | undefined, params?: RequestParams) => Promise<HttpResponse<any, void>>;
        /**
         * No description
         *
         * @tags Notification Service
         * @name GetMarkNotification
         * @summary Đánh dấu đã đọc thông báo
         * @request PUT:/v1/notification/{notificationId}
         */
        getMarkNotification: (notificationId: string, params?: RequestParams) => Promise<HttpResponse<any, void>>;
        /**
         * No description
         *
         * @tags Notification Service
         * @name GetMarkNotification1
         * @summary Đánh dấu tất cả thông báo
         * @request PUT:/v1/notification/all-readed
         */
        getMarkNotification1: (params?: RequestParams) => Promise<HttpResponse<any, void>>;
        /**
         * No description
         *
         * @tags Notification Service
         * @name GetUnreadNotifications
         * @summary Lấy số lượng thông báo
         * @request GET:/v1/notification/count
         */
        getUnreadNotifications: (params?: RequestParams) => Promise<HttpResponse<any, void>>;
        /**
         * No description
         *
         * @tags Product Favorite Service
         * @name GetProductFavorites
         * @summary Danh sách sản phẩm yêu thích
         * @request GET:/v1/product-favorite/{partner_id}/{store_channel}
         */
        getProductFavorites: (partnerId: string, storeChannel: string, query?: {
            currentPage?: number | undefined;
            maxResult?: number | undefined;
            sort_order?: string | undefined;
            sort_by?: string | undefined;
        } | undefined, params?: RequestParams) => Promise<HttpResponse<any, void>>;
        /**
         * No description
         *
         * @tags Product Favorite Service
         * @name AddProductFavorite
         * @summary Thêm sản phẩm ưa thích
         * @request POST:/v1/product-favorite/{partner_id}/{store_channel}/{product_id}
         */
        addProductFavorite: (partnerId: string, storeChannel: string, productId: string, params?: RequestParams) => Promise<HttpResponse<any, void>>;
        /**
         * No description
         *
         * @tags Product Favorite Service
         * @name RemoveProductFavorite
         * @summary Xóa sản phẩm ưa thích
         * @request DELETE:/v1/product-favorite/{partner_id}/{store_channel}/{product_id}
         */
        removeProductFavorite: (partnerId: string, storeChannel: string, productId: string, params?: RequestParams) => Promise<HttpResponse<any, void>>;
        /**
         * No description
         *
         * @tags Transaction History Service
         * @name SearchHistory
         * @summary Lịch sử giao dịch
         * @request GET:/v1/transaction-history
         */
        searchHistory: (query?: {
            type?: string | undefined;
            fromDate?: number | undefined;
            toDate?: number | undefined;
            currentPage?: number | undefined;
            maxResult?: number | undefined;
        } | undefined, params?: RequestParams) => Promise<HttpResponse<any, void>>;
        /**
         * No description
         *
         * @tags Location Service
         * @name GetProvince
         * @summary Lấy danh sách thành phố
         * @request GET:/v1/location/provinces
         */
        getProvince: (params?: RequestParams) => Promise<HttpResponse<any, void>>;
        /**
         * No description
         *
         * @tags Location Service
         * @name GetDistricts
         * @summary Lấy danh sách quận huyện
         * @request GET:/v1/location/{province_id}/districts
         */
        getDistricts: (provinceId: string, params?: RequestParams) => Promise<HttpResponse<any, void>>;
        /**
         * No description
         *
         * @tags Location Service
         * @name GetWards
         * @summary Lấy danh sách phường xã
         * @request GET:/v1/location/{district_id}/wards
         */
        getWards: (districtId: string, params?: RequestParams) => Promise<HttpResponse<any, void>>;
        /**
         * No description
         *
         * @tags Groupon Service
         * @name GetProduct
         * @summary Lấy sản phẩm
         * @request GET:/v1/groupon/{store_channel}/{code}
         */
        getProduct: (storeChannel: string, code: string, params?: RequestParams) => Promise<HttpResponse<any, void>>;
        /**
         * No description
         *
         * @tags Groupon Service
         * @name CreateOrderWithoutLogin
         * @summary Tạo đơn hàng (Không cần login)
         * @request POST:/v1/groupon/{code}
         */
        createOrderWithoutLogin: (code: string, body: Order, params?: RequestParams) => Promise<HttpResponse<any, void>>;
        /**
         * No description
         *
         * @tags Order Service
         * @name GetOrders
         * @summary Tra cứu đơn hàng nhanh (Không cần login)
         * @request GET:/v1/orders/express/{partner_id}/{store_channel}
         */
        getOrders: (partnerId: string, storeChannel: string, query: {
            customer_info: string;
            order_id: string;
            status?: string;
            tracking?: boolean;
            currentPage?: number;
            maxResult?: number;
        }, params?: RequestParams) => Promise<HttpResponse<any, void>>;
        /**
         * No description
         *
         * @tags Order Service
         * @name CreateOrderWithoutLogin1
         * @summary Tạo đơn hàng nhanh (Không cần login)
         * @request POST:/v1/orders/express/{partner_id}/{store_channel}
         */
        createOrderWithoutLogin1: (partnerId: string, storeChannel: string, query: {
            platform: string;
            collaboratorId?: string;
        }, body: Order, params?: RequestParams) => Promise<HttpResponse<any, void>>;
        /**
         * No description
         *
         * @tags Shopping cart
         * @name GetShoppingCart
         * @summary Xem giỏ hàng
         * @request GET:/v1/shopping-cart/{store_channel}/{session_id}
         */
        getShoppingCart: (partnerId: string, storeChannel: string, sessionId: string, params?: RequestParams) => Promise<HttpResponse<any, void>>;
        /**
         * No description
         *
         * @tags Shopping cart
         * @name AddToCart
         * @summary Thêm vào giỏ hàng
         * @request POST:/v1/shopping-cart/{store_channel}/{session_id}
         */
        addToCart: (partnerId: string, storeChannel: string, sessionId: string, body: ShoppingCartInput, params?: RequestParams) => Promise<HttpResponse<any, void>>;
        /**
         * No description
         *
         * @tags Shopping cart
         * @name UpdateQuantity
         * @summary Cập nhật số lượng
         * @request PUT:/v1/shopping-cart/{store_channel}/{session_id}
         */
        updateQuantity: (partnerId: string, storeChannel: string, sessionId: string, body: ShoppingCartInput, params?: RequestParams) => Promise<HttpResponse<any, void>>;
        /**
         * No description
         *
         * @tags Shopping cart
         * @name RemoveCart
         * @summary Xóa giỏ hàng
         * @request DELETE:/v1/shopping-cart/{store_channel}/{session_id}
         */
        removeCart: (partnerId: string, storeChannel: string, sessionId: string, params?: RequestParams) => Promise<HttpResponse<any, void>>;
        /**
         * No description
         *
         * @tags Shopping cart
         * @name RemoveFromCart
         * @summary Xóa khỏi giỏ hàng
         * @request DELETE:/v1/shopping-cart/{store_channel}/{session_id}/{supplier_id}/{product_id}
         */
        removeFromCart: (partnerId: string, storeChannel: string, sessionId: string, supplierId: string, productId: string, params?: RequestParams) => Promise<HttpResponse<any, void>>;
        /**
         * No description
         *
         * @tags Order Service
         * @name GetOrder
         * @summary Thông tin chi tiết đơn hàng
         * @request GET:/v1/orders/{partner_id}/{store_channel}/{order_id}
         */
        getOrder: (partnerId: string, storeChannel: string, orderId: string, query?: {
            tracking?: boolean | undefined;
        } | undefined, params?: RequestParams) => Promise<HttpResponse<any, void>>;
        /**
         * No description
         *
         * @tags Order Service
         * @name CancelOrder
         * @summary Hủy đơn hàng
         * @request PUT:/v1/orders/{partner_id}/{store_channel}/cancel
         */
        cancelOrder: (partnerId: string, storeChannel: string, body: CancelOrder, params?: RequestParams) => Promise<HttpResponse<any, void>>;
        /**
         * No description
         *
         * @tags Order Service
         * @name GetOrderStatus
         * @summary Danh sách trạng thái đơn hàng
         * @request GET:/v1/orders/{partner_id}/{store_channel}/status
         */
        getOrderStatus: (partnerId: string, storeChannel: string, params?: RequestParams) => Promise<HttpResponse<any, void>>;
        /**
         * No description
         *
         * @tags Order Service
         * @name GetOrders1
         * @summary Danh sách đơn hàng
         * @request GET:/v1/orders/{partner_id}/{store_channel}
         */
        getOrders1: (partnerId: string, storeChannel: string, query?: {
            keyword?: string | undefined;
            status?: string | undefined;
            currentPage?: number | undefined;
            maxResult?: number | undefined;
        } | undefined, params?: RequestParams) => Promise<HttpResponse<any, void>>;
        /**
         * No description
         *
         * @tags Order Service
         * @name CreateOrder
         * @summary Tạo đơn hàng
         * @request POST:/v1/orders/{partner_id}/{store_channel}
         */
        createOrder: (partnerId: string, storeChannel: string, query: {
            collaboratorId?: string;
            platform: string;
        }, body: Order, params?: RequestParams) => Promise<HttpResponse<any, void>>;
        /**
         * No description
         *
         * @tags Payment Service
         * @name GetPaymentMethods
         * @summary Danh sách phương thức thanh toán
         * @request GET:/v1/payments/{partner_id}/{store_channel}
         */
        getPaymentMethods: (partnerId: string, storeChannel: string, params?: RequestParams) => Promise<HttpResponse<any, void>>;
        /**
         * No description
         *
         * @tags Category Service
         * @name GetCategories
         * @summary Danh sách danh mục
         * @request GET:/v1/categories/{partner_id}/{store_channel}
         */
        getCategories: (partnerId: string, storeChannel: string, query?: {
            type?: string | undefined;
            level?: string | undefined;
            count_product?: string | undefined;
        } | undefined, params?: RequestParams) => Promise<HttpResponse<any, void>>;
        /**
         * No description
         *
         * @tags Category Service
         * @name GetCategoryByHandle
         * @summary Chi tiết danh mục theo slug/handle
         * @request GET:/v1/categories/{partner_id}/{store_channel}/handle/{handle}
         */
        getCategoryByHandle: (partnerId: string, storeChannel: string, handle: string, params?: RequestParams) => Promise<HttpResponse<any, void>>;
        /**
         * No description
         *
         * @tags Category Service
         * @name GetCategoryById
         * @summary Chi tiết danh mục theo id
         * @request GET:/v1/categories/{partner_id}/{store_channel}/{category_id}
         */
        getCategoryById: (partnerId: string, storeChannel: string, categoryId: string, params?: RequestParams) => Promise<HttpResponse<any, void>>;
        /**
         * No description
         *
         * @tags Product Group Service
         * @name GetProductGroups
         * @summary Danh sách nhóm sản phẩm
         * @request GET:/v1/product-groups/{partner_id}
         */
        getProductGroups: (partnerId: string, params?: RequestParams) => Promise<HttpResponse<any, void>>;
        /**
         * No description
         *
         * @tags Product Service
         * @name GetTags
         * @summary Danh sách tag
         * @request GET:/v1/products/tags
         */
        getTags: (params?: RequestParams) => Promise<HttpResponse<any, void>>;
        /**
         * No description
         *
         * @tags Product Service
         * @name GetProductById
         * @summary Chi tiết sản phẩm theo id
         * @request GET:/v1/products/{partner_id}/{store_channel}/{product_id}
         */
        getProductById: (partnerId: string, storeChannel: string, productId: string, params?: RequestParams) => Promise<HttpResponse<any, void>>;
        /**
         * No description
         *
         * @tags Product Service
         * @name GetProductByVariantId
         * @summary Chi tiết sản phẩm theo biến thể id
         * @request GET:/v1/products/{partner_id}/{store_channel}/variants/{variantId}
         */
        getProductByVariantId: (partnerId: string, storeChannel: string, variantId: string, params?: RequestParams) => Promise<HttpResponse<any, void>>;
        /**
         * No description
         *
         * @tags Product Service
         * @name GetProducts
         * @summary Danh sách sản phẩm
         * @request GET:/v1/products/{partner_id}/{store_channel}
         */
        getProducts: (partnerId: string, storeChannel: string, query?: Partial<ProductQuery> | undefined, params?: RequestParams) => Promise<HttpResponse<any, void>>;
        /**
         * No description
         *
         * @tags Product Service
         * @name GetProductByHandle
         * @summary Chi tiết sản phẩm theo slug/handle
         * @request GET:/v1/products/{partner_id}/{store_channel}/handle/{handle}
         */
        getProductByHandle: (partnerId: string, storeChannel: string, handle: string, params?: RequestParams) => Promise<HttpResponse<any, void>>;
        /**
         * No description
         *
         * @tags Supplier Service
         * @name GetListSupplierByPartnerId
         * @summary Danh sách nhà cung cấp
         * @request GET:/v1/suppliers/{partner_id}
         */
        GetListSupplierByPartnerIds: (body: string[], params?: RequestParams) => Promise<HttpResponse<any, void>>;
        /**
         * No description
         *
         * @tags Supplier Service
         * @name GetListSupplierByPartnerId
         * @summary Danh sách nhà cung cấp
         * @request GET:/v1/suppliers/{partner_id}
         */
        GetListSupplierByPartnerId: (partnerId: string, query?: {
            currentPage?: number | undefined;
            maxResult?: number | undefined;
        } | undefined, params?: RequestParams) => Promise<HttpResponse<any, void>>;
        /**
         * No description
         *
         * @tags Tracking Service
         * @name SearchTracking
         * @summary Tracking đơn hàng
         * @request GET:/v1/tracking/{order_id}
         */
        searchTracking: (orderId: string, params?: RequestParams) => Promise<HttpResponse<any, void>>;
    };
}
export {};
