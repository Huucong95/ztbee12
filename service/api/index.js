"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api = exports.HttpClient = exports.ContentType = void 0;
/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */
const node_fetch_1 = require("node-fetch");
var ContentType;
(function (ContentType) {
    ContentType["Json"] = "application/json";
    ContentType["FormData"] = "multipart/form-data";
    ContentType["UrlEncoded"] = "application/x-www-form-urlencoded";
})(ContentType = exports.ContentType || (exports.ContentType = {}));
class HttpClient {
    constructor(apiConfig = {}) {
        this.baseUrl = "https://api-dev.ecomos.vn:8443/gateway-service/";
        this.securityData = null;
        this.abortControllers = new Map();
        this.customFetch = (...fetchParams) => (0, node_fetch_1.default)(...fetchParams);
        this.baseApiParams = {
            credentials: "same-origin",
            headers: {},
            redirect: "follow",
            referrerPolicy: "no-referrer",
        };
        this.setSecurityData = (data) => {
            this.securityData = data;
        };
        this.contentFormatters = {
            [ContentType.Json]: (input) => input !== null && (typeof input === "object" || typeof input === "string")
                ? JSON.stringify(input)
                : input,
            [ContentType.FormData]: (input) => Object.keys(input || {}).reduce((formData, key) => {
                const property = input[key];
                formData.append(key, property instanceof Blob
                    ? property
                    : typeof property === "object" && property !== null
                        ? JSON.stringify(property)
                        : `${property}`);
                return formData;
            }, new FormData()),
            [ContentType.UrlEncoded]: (input) => this.toQueryString(input),
        };
        this.createAbortSignal = (cancelToken) => {
            if (this.abortControllers.has(cancelToken)) {
                const abortController = this.abortControllers.get(cancelToken);
                if (abortController) {
                    return abortController.signal;
                }
                return void 0;
            }
            const abortController = new AbortController();
            this.abortControllers.set(cancelToken, abortController);
            return abortController.signal;
        };
        this.abortRequest = (cancelToken) => {
            const abortController = this.abortControllers.get(cancelToken);
            if (abortController) {
                abortController.abort();
                this.abortControllers.delete(cancelToken);
            }
        };
        this.request = (_a) => __awaiter(this, void 0, void 0, function* () {
            var { body, secure, path, type, query, format, baseUrl, cancelToken } = _a, params = __rest(_a, ["body", "secure", "path", "type", "query", "format", "baseUrl", "cancelToken"]);
            const secureParams = ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
                this.securityWorker &&
                (yield this.securityWorker(this.securityData))) ||
                {};
            const requestParams = this.mergeRequestParams(params, secureParams);
            const queryString = query && this.toQueryString(query);
            const payloadFormatter = this.contentFormatters[type || ContentType.Json];
            const responseFormat = format || requestParams.format;
            return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, Object.assign(Object.assign({}, requestParams), { headers: Object.assign(Object.assign({}, (type && type !== ContentType.FormData
                    ? { "Content-Type": type }
                    : {})), (requestParams.headers || {})), signal: cancelToken ? this.createAbortSignal(cancelToken) : void 0, body: typeof body === "undefined" || body === null
                    ? null
                    : payloadFormatter(body) })).then((response) => __awaiter(this, void 0, void 0, function* () {
                const r = response;
                r.data = null;
                r.error = null;
                const data = !responseFormat
                    ? r
                    : yield response[responseFormat]()
                        .then((data) => {
                        if (r.ok) {
                            r.data = data;
                        }
                        else {
                            r.error = data;
                        }
                        return r;
                    })
                        .catch((e) => {
                        r.error = e;
                        return r;
                    });
                if (cancelToken) {
                    this.abortControllers.delete(cancelToken);
                }
                if (!response.ok)
                    throw data;
                return data;
            }));
        });
        Object.assign(this, apiConfig);
    }
    encodeQueryParam(key, value) {
        const encodedKey = encodeURIComponent(key);
        return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
    }
    addQueryParam(query, key) {
        return this.encodeQueryParam(key, query[key]);
    }
    addArrayQueryParam(query, key) {
        const value = query[key];
        return value.map((v) => this.encodeQueryParam(key, v)).join("&");
    }
    toQueryString(rawQuery) {
        const query = rawQuery || {};
        const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
        return keys
            .map((key) => Array.isArray(query[key])
            ? this.addArrayQueryParam(query, key)
            : this.addQueryParam(query, key))
            .join("&");
    }
    addQueryParams(rawQuery) {
        const queryString = this.toQueryString(rawQuery);
        return queryString ? `?${queryString}` : "";
    }
    mergeRequestParams(params1, params2) {
        return Object.assign(Object.assign(Object.assign(Object.assign({}, this.baseApiParams), params1), (params2 || {})), { headers: Object.assign(Object.assign(Object.assign({}, (this.baseApiParams.headers || {})), (params1.headers || {})), ((params2 && params2.headers) || {})) });
    }
}
exports.HttpClient = HttpClient;
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
class Api extends HttpClient {
    constructor() {
        super(...arguments);
        this.v1 = {
            /**
             * No description
             *
             * @tags Authenticate Service
             * @name Logout
             * @summary Đăng xuất
             * @request POST:/v1/auth
             */
            logout: (partnerId, params = {}) => this.request(Object.assign({ path: `/v1/auth/${partnerId}/logout`, method: "POST" }, params)),
            /**
             * No description
             *
             * @tags Authenticate Service
             * @name Login
             * @summary Đăng nhập
             * @request POST:/v1/auth/{partner_id}
             */
            login: (partnerId, body, params = {}) => this.request(Object.assign({ path: `/v1/auth/${partnerId}/login`, method: "POST", body: body, type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Authenticate Service
             * @name Login
             * @summary Đăng nhập
             * @request POST:/v1/auth/{partner_id}
             */
            loginGoogle: (partnerId, body, params = {}) => this.request(Object.assign({ path: `/v1/auth/${partnerId}/login-google`, method: "POST", body: body, type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Authenticate Service
             * @name Login
             * @summary Đăng nhập
             * @request POST:/v1/auth/{partner_id}
             */
            loginFB: (partnerId, body, params = {}) => this.request(Object.assign({ path: `/v1/auth/${partnerId}/login-facebook`, method: "POST", body: body, type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Apartment Service
             * @name GetListApartments
             * @summary Danh sách chung cư
             * @request GET:/v1/apartments/{partner_id}
             */
            getListApartments: (partnerId, query, params = {}) => this.request(Object.assign({ path: `/v1/apartments/${partnerId}`, method: "GET", query: query }, params)),
            /**
             * No description
             *
             * @tags Contact Service
             * @name SendContact
             * @summary Gửi liên hệ
             * @request POST:/v1/contact
             */
            sendContact: (body, params = {}) => this.request(Object.assign({ path: `/v1/contact`, method: "POST", body: body, type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Balance Service
             * @name GetAccountBalance
             * @summary Ví khách hàng
             * @request GET:/v1/balance
             */
            getAccountBalance: (params = {}) => this.request(Object.assign({ path: `/v1/balance`, method: "GET", type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Customer Service
             * @name ResetPassword
             * @summary Lấy lại mật khẩu
             * @request POST:/v1/customers/reset-password
             */
            resetPassword: (partnerId, body, query, params = {}) => this.request(Object.assign({ path: `/v1/customers/${partnerId}/reset-password`, method: "POST", query: query, body: body, type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Customer Service
             * @name GetAddresses
             * @summary Danh sách địa chỉ giao hàng
             * @request GET:/v1/customers/addresses
             */
            getAddresses: (partnerId, params = {}) => {
                return this.request(Object.assign({ path: `/v1/customers/${partnerId}/addresses`, method: "GET", type: ContentType.Json }, params));
            },
            /**
             * No description
             *
             * @tags Customer Service
             * @name CreateDeliveryInfo
             * @summary Tạo địa chỉ giao hàng
             * @request POST:/v1/customers/addresses
             */
            createDeliveryInfo: (partnerId, body, params = {}) => this.request(Object.assign({ path: `/v1/customers/${partnerId}/addresses`, method: "POST", body: body, type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Customer Service
             * @name ItemReceived
             * @summary Xác nhận đã nhận được hàng
             * @request POST:/v1/customers/item-received/{order_id}
             */
            itemReceived: (orderId, params = {}) => this.request(Object.assign({ path: `/v1/customers/item-received/${orderId}`, method: "POST", type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Customer Service
             * @name SendCodeActive
             * @summary Gửi lại mã kích hoạt
             * @request POST:/v1/customers/send-code
             */
            sendCodeActive: (body, query, params = {}) => this.request(Object.assign({ path: `/v1/customers/send-code`, method: "POST", query: query, body: body, type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Customer Service
             * @name GetCustomerInfo
             * @summary Lấy thông tin khách hàng
             * @request GET:/v1/customers
             */
            getCustomerInfo: (partnerId, params = {}) => this.request(Object.assign({ path: `/v1/customers/${partnerId}`, method: "GET", type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Customer Service
             * @name UpdateUserInfo
             * @summary Cập nhật thông tin khách hàng
             * @request PUT:/v1/customers
             */
            updateUserInfo: (body, params = {}) => this.request(Object.assign({ path: `/v1/customers`, method: "PUT", body: body, type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Customer Service
             * @name ForgotPassword
             * @summary Quên mật khẩu
             * @request POST:/v1/customers/forgot-password
             */
            forgotPassword: (partnerId, body, params = {}) => this.request(Object.assign({ path: `/v1/customers/${partnerId}/forgot-password`, method: "POST", body: body, type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Customer Service
             * @name ActiveAccount
             * @summary Kích hoạt tài khoản
             * @request POST:/v1/customers/active-account
             */
            activeAccount: (partnerId, body, query, params = {}) => this.request(Object.assign({ path: `/v1/customers/${partnerId}/active-account`, method: "POST", query: query, body: body, type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Customer Service
             * @name UpdateDeliveryInfo
             * @summary Cập nhật địa chỉ giao hàng
             * @request PUT:/v1/customers/addresses/{address_id}
             */
            updateDeliveryInfo: (partnerId, addressId, body, params = {}) => this.request(Object.assign({ path: `/v1/customers/${partnerId}/addresses/${addressId}`, method: "PUT", body: body, type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Customer Service
             * @name DeleteDeliveryInfo
             * @summary Xoá địa chỉ giao hàng
             * @request DELETE:/v1/customers/addresses/{address_id}
             */
            deleteDeliveryInfo: (partnerId, addressId, params = {}) => this.request(Object.assign({ path: `/v1/customers/${partnerId}/addresses/${addressId}`, method: "DELETE", type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Customer Service
             * @name ChangePassword
             * @summary Đổi mật khẩu
             * @request PUT:/v1/customers/change-password
             */
            changePassword: (partnerId, body, params = {}) => this.request(Object.assign({ path: `/v1/customers/${partnerId}/change-password`, method: "PUT", body: body, type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Customer Service
             * @name MakeDefaultAddress
             * @summary Đặt địa chỉ mặc định
             * @request PUT:/v1/customers/addresses/{address_id}/default
             */
            makeDefaultAddress: (partnerId, addressId, params = {}) => this.request(Object.assign({ path: `/v1/customers/${partnerId}/addresses/${addressId}/default`, method: "PUT", type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Customer Service
             * @name Register
             * @summary Đăng ký tài khoản
             * @request POST:/v1/customers/register/{partner_id}
             */
            register: (partnerId, body, params = {}) => this.request(Object.assign({ path: `/v1/customers/${partnerId}/register`, method: "POST", body: body, type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Notification Service
             * @name GetNotifications
             * @summary Lấy danh sách thông báo
             * @request GET:/v1/notification
             */
            getNotifications: (query, params = {}) => this.request(Object.assign({ path: `/v1/notification`, method: "GET", query: query, type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Notification Service
             * @name GetMarkNotification
             * @summary Đánh dấu đã đọc thông báo
             * @request PUT:/v1/notification/{notificationId}
             */
            getMarkNotification: (notificationId, params = {}) => this.request(Object.assign({ path: `/v1/notification/${notificationId}`, method: "PUT", type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Notification Service
             * @name GetMarkNotification1
             * @summary Đánh dấu tất cả thông báo
             * @request PUT:/v1/notification/all-readed
             */
            getMarkNotification1: (params = {}) => this.request(Object.assign({ path: `/v1/notification/all-readed`, method: "PUT", type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Notification Service
             * @name GetUnreadNotifications
             * @summary Lấy số lượng thông báo
             * @request GET:/v1/notification/count
             */
            getUnreadNotifications: (params = {}) => this.request(Object.assign({ path: `/v1/notification/count`, method: "GET", type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Product Favorite Service
             * @name GetProductFavorites
             * @summary Danh sách sản phẩm yêu thích
             * @request GET:/v1/product-favorite/{partner_id}/{store_channel}
             */
            getProductFavorites: (partnerId, storeChannel, query, params = {}) => this.request(Object.assign({ path: `/v1/product-favorite/${partnerId}/${storeChannel}`, method: "GET", query: query, type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Product Favorite Service
             * @name AddProductFavorite
             * @summary Thêm sản phẩm ưa thích
             * @request POST:/v1/product-favorite/{partner_id}/{store_channel}/{product_id}
             */
            addProductFavorite: (partnerId, storeChannel, productId, params = {}) => this.request(Object.assign({ path: `/v1/product-favorite/${partnerId}/${storeChannel}/${productId}`, method: "POST", type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Product Favorite Service
             * @name RemoveProductFavorite
             * @summary Xóa sản phẩm ưa thích
             * @request DELETE:/v1/product-favorite/{partner_id}/{store_channel}/{product_id}
             */
            removeProductFavorite: (partnerId, storeChannel, productId, params = {}) => this.request(Object.assign({ path: `/v1/product-favorite/${partnerId}/${storeChannel}/${productId}`, method: "DELETE", type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Transaction History Service
             * @name SearchHistory
             * @summary Lịch sử giao dịch
             * @request GET:/v1/transaction-history
             */
            searchHistory: (query, params = {}) => this.request(Object.assign({ path: `/v1/transaction-history`, method: "GET", query: query, type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Location Service
             * @name GetProvince
             * @summary Lấy danh sách thành phố
             * @request GET:/v1/location/provinces
             */
            getProvince: (params = {}) => this.request(Object.assign({ path: `/v1/location/provinces`, method: "GET" }, params)),
            /**
             * No description
             *
             * @tags Location Service
             * @name GetDistricts
             * @summary Lấy danh sách quận huyện
             * @request GET:/v1/location/{province_id}/districts
             */
            getDistricts: (provinceId, params = {}) => this.request(Object.assign({ path: `/v1/location/${provinceId}/districts`, method: "GET" }, params)),
            /**
             * No description
             *
             * @tags Location Service
             * @name GetWards
             * @summary Lấy danh sách phường xã
             * @request GET:/v1/location/{district_id}/wards
             */
            getWards: (districtId, params = {}) => this.request(Object.assign({ path: `/v1/location/${districtId}/wards`, method: "GET" }, params)),
            /**
             * No description
             *
             * @tags Groupon Service
             * @name GetProduct
             * @summary Lấy sản phẩm
             * @request GET:/v1/groupon/{store_channel}/{code}
             */
            getProduct: (storeChannel, code, params = {}) => this.request(Object.assign({ path: `/v1/groupon/${storeChannel}/${code}`, method: "GET", type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Groupon Service
             * @name CreateOrderWithoutLogin
             * @summary Tạo đơn hàng (Không cần login)
             * @request POST:/v1/groupon/{code}
             */
            createOrderWithoutLogin: (code, body, params = {}) => this.request(Object.assign({ path: `/v1/groupon/${code}`, method: "POST", body: body, type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Order Service
             * @name GetOrders
             * @summary Tra cứu đơn hàng nhanh (Không cần login)
             * @request GET:/v1/orders/express/{partner_id}/{store_channel}
             */
            getOrders: (partnerId, storeChannel, query, params = {}) => this.request(Object.assign({ path: `/v1/orders/express/${partnerId}/${storeChannel}`, method: "GET", query: query, type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Order Service
             * @name CreateOrderWithoutLogin1
             * @summary Tạo đơn hàng nhanh (Không cần login)
             * @request POST:/v1/orders/express/{partner_id}/{store_channel}
             */
            createOrderWithoutLogin1: (partnerId, storeChannel, query, body, params = {}) => this.request(Object.assign({ path: `/v1/orders/express/${partnerId}/${storeChannel}`, method: "POST", query: query, body: body, type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Shopping cart
             * @name GetShoppingCart
             * @summary Xem giỏ hàng
             * @request GET:/v1/shopping-cart/{store_channel}/{session_id}
             */
            getShoppingCart: (partnerId, storeChannel, sessionId, params = {}) => this.request(Object.assign({ path: `/v1/shopping-cart/${partnerId}/${storeChannel}/${sessionId}`, method: "GET", type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Shopping cart
             * @name AddToCart
             * @summary Thêm vào giỏ hàng
             * @request POST:/v1/shopping-cart/{store_channel}/{session_id}
             */
            addToCart: (partnerId, storeChannel, sessionId, body, params = {}) => this.request(Object.assign({ path: `/v1/shopping-cart/${partnerId}/${storeChannel}/${sessionId}`, method: "POST", body: body, type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Shopping cart
             * @name UpdateQuantity
             * @summary Cập nhật số lượng
             * @request PUT:/v1/shopping-cart/{store_channel}/{session_id}
             */
            updateQuantity: (partnerId, storeChannel, sessionId, body, params = {}) => this.request(Object.assign({ path: `/v1/shopping-cart/${partnerId}/${storeChannel}/${sessionId}`, method: "PUT", body: body, type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Shopping cart
             * @name RemoveCart
             * @summary Xóa giỏ hàng
             * @request DELETE:/v1/shopping-cart/{store_channel}/{session_id}
             */
            removeCart: (partnerId, storeChannel, sessionId, params = {}) => this.request(Object.assign({ path: `/v1/shopping-cart/${partnerId}/${storeChannel}/${sessionId}`, method: "DELETE", type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Shopping cart
             * @name RemoveFromCart
             * @summary Xóa khỏi giỏ hàng
             * @request DELETE:/v1/shopping-cart/{store_channel}/{session_id}/{supplier_id}/{product_id}
             */
            removeFromCart: (partnerId, storeChannel, sessionId, supplierId, productId, params = {}) => this.request(Object.assign({ path: `/v1/shopping-cart/${partnerId}/${storeChannel}/${sessionId}/${supplierId}/${productId}`, method: "DELETE", type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Order Service
             * @name GetOrder
             * @summary Thông tin chi tiết đơn hàng
             * @request GET:/v1/orders/{partner_id}/{store_channel}/{order_id}
             */
            getOrder: (partnerId, storeChannel, orderId, query, params = {}) => this.request(Object.assign({ path: `/v1/orders/${partnerId}/${storeChannel}/${orderId}`, method: "GET", query: query, type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Order Service
             * @name CancelOrder
             * @summary Hủy đơn hàng
             * @request PUT:/v1/orders/{partner_id}/{store_channel}/cancel
             */
            cancelOrder: (partnerId, storeChannel, body, params = {}) => this.request(Object.assign({ path: `/v1/orders/${partnerId}/${storeChannel}/cancel`, method: "PUT", body: body, type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Order Service
             * @name GetOrderStatus
             * @summary Danh sách trạng thái đơn hàng
             * @request GET:/v1/orders/{partner_id}/{store_channel}/status
             */
            getOrderStatus: (partnerId, storeChannel, params = {}) => this.request(Object.assign({ path: `/v1/orders/${partnerId}/${storeChannel}/status`, method: "GET", type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Order Service
             * @name GetOrders1
             * @summary Danh sách đơn hàng
             * @request GET:/v1/orders/{partner_id}/{store_channel}
             */
            getOrders1: (partnerId, storeChannel, query, params = {}) => this.request(Object.assign({ path: `/v1/orders/${partnerId}/${storeChannel}`, method: "GET", query: query, type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Order Service
             * @name CreateOrder
             * @summary Tạo đơn hàng
             * @request POST:/v1/orders/{partner_id}/{store_channel}
             */
            createOrder: (partnerId, storeChannel, query, body, params = {}) => this.request(Object.assign({ path: `/v1/orders/${partnerId}/${storeChannel}`, method: "POST", query: query, body: body, type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Payment Service
             * @name GetPaymentMethods
             * @summary Danh sách phương thức thanh toán
             * @request GET:/v1/payments/{partner_id}/{store_channel}
             */
            getPaymentMethods: (partnerId, storeChannel, params = {}) => this.request(Object.assign({ path: `/v1/payments/${partnerId}/${storeChannel}`, method: "GET", type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Category Service
             * @name GetCategories
             * @summary Danh sách danh mục
             * @request GET:/v1/categories/{partner_id}/{store_channel}
             */
            getCategories: (partnerId, storeChannel, query, params = {}) => this.request(Object.assign({ path: `/v1/product-categories/${partnerId}/${storeChannel}`, method: "GET", query: query, type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Category Service
             * @name GetCategoryByHandle
             * @summary Chi tiết danh mục theo slug/handle
             * @request GET:/v1/categories/{partner_id}/{store_channel}/handle/{handle}
             */
            getCategoryByHandle: (partnerId, storeChannel, handle, params = {}) => this.request(Object.assign({ path: `/v1/product-categories/${partnerId}/${storeChannel}/handle/${handle}`, method: "GET", type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Category Service
             * @name GetCategoryById
             * @summary Chi tiết danh mục theo id
             * @request GET:/v1/categories/{partner_id}/{store_channel}/{category_id}
             */
            getCategoryById: (partnerId, storeChannel, categoryId, params = {}) => this.request(Object.assign({ path: `/v1/product-categories/${partnerId}/${storeChannel}/${categoryId}`, method: "GET", type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Product Group Service
             * @name GetProductGroups
             * @summary Danh sách nhóm sản phẩm
             * @request GET:/v1/product-groups/{partner_id}
             */
            getProductGroups: (partnerId, params = {}) => this.request(Object.assign({ path: `/v1/product-groups/${partnerId}`, method: "GET", type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Product Service
             * @name GetTags
             * @summary Danh sách tag
             * @request GET:/v1/products/tags
             */
            getTags: (params = {}) => this.request(Object.assign({ path: `/v1/products/tags`, method: "GET", type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Product Service
             * @name GetProductById
             * @summary Chi tiết sản phẩm theo id
             * @request GET:/v1/products/{partner_id}/{store_channel}/{product_id}
             */
            getProductById: (partnerId, storeChannel, productId, params = {}) => this.request(Object.assign({ path: `/v1/products/${partnerId}/${storeChannel}/${productId}`, method: "GET", type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Product Service
             * @name GetProductByVariantId
             * @summary Chi tiết sản phẩm theo biến thể id
             * @request GET:/v1/products/{partner_id}/{store_channel}/variants/{variantId}
             */
            getProductByVariantId: (partnerId, storeChannel, variantId, params = {}) => this.request(Object.assign({ path: `/v1/products/${partnerId}/${storeChannel}/variants/${variantId}`, method: "GET", type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Product Service
             * @name GetProducts
             * @summary Danh sách sản phẩm
             * @request GET:/v1/products/{partner_id}/{store_channel}
             */
            getProducts: (partnerId, storeChannel, query, params = {}) => 
            // axios({
            //   method: "GET",
            //   url: `https://api-dev.ecomos.vn:8443/gateway-service/v1/products/${partnerId}/${storeChannel}`,
            //   params: query,
            // }),
            this.request(Object.assign({ path: `/v1/products/${partnerId}/${storeChannel}/`, method: "GET", query, type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Product Service
             * @name GetProductByHandle
             * @summary Chi tiết sản phẩm theo slug/handle
             * @request GET:/v1/products/{partner_id}/{store_channel}/handle/{handle}
             */
            getProductByHandle: (partnerId, storeChannel, handle, params = {}) => this.request(Object.assign({ path: `/v1/products/${partnerId}/${storeChannel}/handle/${handle}`, method: "GET", type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Supplier Service
             * @name GetListSupplierByPartnerId
             * @summary Danh sách nhà cung cấp
             * @request GET:/v1/suppliers/{partner_id}
             */
            GetListSupplierByPartnerIds: (body, params = {}) => this.request(Object.assign({ path: `/v1/suppliers`, method: "GET", body }, params)),
            /**
             * No description
             *
             * @tags Supplier Service
             * @name GetListSupplierByPartnerId
             * @summary Danh sách nhà cung cấp
             * @request GET:/v1/suppliers/{partner_id}
             */
            GetListSupplierByPartnerId: (partnerId, query, params = {}) => this.request(Object.assign({ path: `/v1/suppliers/${partnerId}`, method: "GET", query: query }, params)),
            /**
             * No description
             *
             * @tags Tracking Service
             * @name SearchTracking
             * @summary Tracking đơn hàng
             * @request GET:/v1/tracking/{order_id}
             */
            searchTracking: (orderId, params = {}) => this.request(Object.assign({ path: `/v1/tracking/${orderId}`, method: "GET", type: ContentType.Json }, params)),
        };
    }
}
exports.Api = Api;
