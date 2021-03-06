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
             * @summary ????ng xu???t
             * @request POST:/v1/auth
             */
            logout: (partnerId, params = {}) => this.request(Object.assign({ path: `/v1/auth/${partnerId}/logout`, method: "POST" }, params)),
            /**
             * No description
             *
             * @tags Authenticate Service
             * @name Login
             * @summary ????ng nh???p
             * @request POST:/v1/auth/{partner_id}
             */
            login: (partnerId, body, params = {}) => this.request(Object.assign({ path: `/v1/auth/${partnerId}/login`, method: "POST", body: body, type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Authenticate Service
             * @name Login
             * @summary ????ng nh???p
             * @request POST:/v1/auth/{partner_id}
             */
            loginGoogle: (partnerId, body, params = {}) => this.request(Object.assign({ path: `/v1/auth/${partnerId}/login-google`, method: "POST", body: body, type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Authenticate Service
             * @name Login
             * @summary ????ng nh???p
             * @request POST:/v1/auth/{partner_id}
             */
            loginFB: (partnerId, body, params = {}) => this.request(Object.assign({ path: `/v1/auth/${partnerId}/login-facebook`, method: "POST", body: body, type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Apartment Service
             * @name GetListApartments
             * @summary Danh s??ch chung c??
             * @request GET:/v1/apartments/{partner_id}
             */
            getListApartments: (partnerId, query, params = {}) => this.request(Object.assign({ path: `/v1/apartments/${partnerId}`, method: "GET", query: query }, params)),
            /**
             * No description
             *
             * @tags Contact Service
             * @name SendContact
             * @summary G???i li??n h???
             * @request POST:/v1/contact
             */
            sendContact: (body, params = {}) => this.request(Object.assign({ path: `/v1/contact`, method: "POST", body: body, type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Balance Service
             * @name GetAccountBalance
             * @summary V?? kh??ch h??ng
             * @request GET:/v1/balance
             */
            getAccountBalance: (params = {}) => this.request(Object.assign({ path: `/v1/balance`, method: "GET", type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Customer Service
             * @name ResetPassword
             * @summary L???y l???i m???t kh???u
             * @request POST:/v1/customers/reset-password
             */
            resetPassword: (partnerId, body, query, params = {}) => this.request(Object.assign({ path: `/v1/customers/${partnerId}/reset-password`, method: "POST", query: query, body: body, type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Customer Service
             * @name GetAddresses
             * @summary Danh s??ch ?????a ch??? giao h??ng
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
             * @summary T???o ?????a ch??? giao h??ng
             * @request POST:/v1/customers/addresses
             */
            createDeliveryInfo: (partnerId, body, params = {}) => this.request(Object.assign({ path: `/v1/customers/${partnerId}/addresses`, method: "POST", body: body, type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Customer Service
             * @name ItemReceived
             * @summary X??c nh???n ???? nh???n ???????c h??ng
             * @request POST:/v1/customers/item-received/{order_id}
             */
            itemReceived: (orderId, params = {}) => this.request(Object.assign({ path: `/v1/customers/item-received/${orderId}`, method: "POST", type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Customer Service
             * @name SendCodeActive
             * @summary G???i l???i m?? k??ch ho???t
             * @request POST:/v1/customers/send-code
             */
            sendCodeActive: (body, query, params = {}) => this.request(Object.assign({ path: `/v1/customers/send-code`, method: "POST", query: query, body: body, type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Customer Service
             * @name GetCustomerInfo
             * @summary L???y th??ng tin kh??ch h??ng
             * @request GET:/v1/customers
             */
            getCustomerInfo: (partnerId, params = {}) => this.request(Object.assign({ path: `/v1/customers/${partnerId}`, method: "GET", type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Customer Service
             * @name UpdateUserInfo
             * @summary C???p nh???t th??ng tin kh??ch h??ng
             * @request PUT:/v1/customers
             */
            updateUserInfo: (body, params = {}) => this.request(Object.assign({ path: `/v1/customers`, method: "PUT", body: body, type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Customer Service
             * @name ForgotPassword
             * @summary Qu??n m???t kh???u
             * @request POST:/v1/customers/forgot-password
             */
            forgotPassword: (partnerId, body, params = {}) => this.request(Object.assign({ path: `/v1/customers/${partnerId}/forgot-password`, method: "POST", body: body, type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Customer Service
             * @name ActiveAccount
             * @summary K??ch ho???t t??i kho???n
             * @request POST:/v1/customers/active-account
             */
            activeAccount: (partnerId, body, query, params = {}) => this.request(Object.assign({ path: `/v1/customers/${partnerId}/active-account`, method: "POST", query: query, body: body, type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Customer Service
             * @name UpdateDeliveryInfo
             * @summary C???p nh???t ?????a ch??? giao h??ng
             * @request PUT:/v1/customers/addresses/{address_id}
             */
            updateDeliveryInfo: (partnerId, addressId, body, params = {}) => this.request(Object.assign({ path: `/v1/customers/${partnerId}/addresses/${addressId}`, method: "PUT", body: body, type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Customer Service
             * @name DeleteDeliveryInfo
             * @summary Xo?? ?????a ch??? giao h??ng
             * @request DELETE:/v1/customers/addresses/{address_id}
             */
            deleteDeliveryInfo: (partnerId, addressId, params = {}) => this.request(Object.assign({ path: `/v1/customers/${partnerId}/addresses/${addressId}`, method: "DELETE", type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Customer Service
             * @name ChangePassword
             * @summary ?????i m???t kh???u
             * @request PUT:/v1/customers/change-password
             */
            changePassword: (partnerId, body, params = {}) => this.request(Object.assign({ path: `/v1/customers/${partnerId}/change-password`, method: "PUT", body: body, type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Customer Service
             * @name MakeDefaultAddress
             * @summary ?????t ?????a ch??? m???c ?????nh
             * @request PUT:/v1/customers/addresses/{address_id}/default
             */
            makeDefaultAddress: (partnerId, addressId, params = {}) => this.request(Object.assign({ path: `/v1/customers/${partnerId}/addresses/${addressId}/default`, method: "PUT", type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Customer Service
             * @name Register
             * @summary ????ng k?? t??i kho???n
             * @request POST:/v1/customers/register/{partner_id}
             */
            register: (partnerId, body, params = {}) => this.request(Object.assign({ path: `/v1/customers/${partnerId}/register`, method: "POST", body: body, type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Notification Service
             * @name GetNotifications
             * @summary L???y danh s??ch th??ng b??o
             * @request GET:/v1/notification
             */
            getNotifications: (query, params = {}) => this.request(Object.assign({ path: `/v1/notification`, method: "GET", query: query, type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Notification Service
             * @name GetMarkNotification
             * @summary ????nh d???u ???? ?????c th??ng b??o
             * @request PUT:/v1/notification/{notificationId}
             */
            getMarkNotification: (notificationId, params = {}) => this.request(Object.assign({ path: `/v1/notification/${notificationId}`, method: "PUT", type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Notification Service
             * @name GetMarkNotification1
             * @summary ????nh d???u t???t c??? th??ng b??o
             * @request PUT:/v1/notification/all-readed
             */
            getMarkNotification1: (params = {}) => this.request(Object.assign({ path: `/v1/notification/all-readed`, method: "PUT", type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Notification Service
             * @name GetUnreadNotifications
             * @summary L???y s??? l?????ng th??ng b??o
             * @request GET:/v1/notification/count
             */
            getUnreadNotifications: (params = {}) => this.request(Object.assign({ path: `/v1/notification/count`, method: "GET", type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Product Favorite Service
             * @name GetProductFavorites
             * @summary Danh s??ch s???n ph???m y??u th??ch
             * @request GET:/v1/product-favorite/{partner_id}/{store_channel}
             */
            getProductFavorites: (partnerId, storeChannel, query, params = {}) => this.request(Object.assign({ path: `/v1/product-favorite/${partnerId}/${storeChannel}`, method: "GET", query: query, type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Product Favorite Service
             * @name AddProductFavorite
             * @summary Th??m s???n ph???m ??a th??ch
             * @request POST:/v1/product-favorite/{partner_id}/{store_channel}/{product_id}
             */
            addProductFavorite: (partnerId, storeChannel, productId, params = {}) => this.request(Object.assign({ path: `/v1/product-favorite/${partnerId}/${storeChannel}/${productId}`, method: "POST", type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Product Favorite Service
             * @name RemoveProductFavorite
             * @summary X??a s???n ph???m ??a th??ch
             * @request DELETE:/v1/product-favorite/{partner_id}/{store_channel}/{product_id}
             */
            removeProductFavorite: (partnerId, storeChannel, productId, params = {}) => this.request(Object.assign({ path: `/v1/product-favorite/${partnerId}/${storeChannel}/${productId}`, method: "DELETE", type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Transaction History Service
             * @name SearchHistory
             * @summary L???ch s??? giao d???ch
             * @request GET:/v1/transaction-history
             */
            searchHistory: (query, params = {}) => this.request(Object.assign({ path: `/v1/transaction-history`, method: "GET", query: query, type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Location Service
             * @name GetProvince
             * @summary L???y danh s??ch th??nh ph???
             * @request GET:/v1/location/provinces
             */
            getProvince: (params = {}) => this.request(Object.assign({ path: `/v1/location/provinces`, method: "GET" }, params)),
            /**
             * No description
             *
             * @tags Location Service
             * @name GetDistricts
             * @summary L???y danh s??ch qu???n huy???n
             * @request GET:/v1/location/{province_id}/districts
             */
            getDistricts: (provinceId, params = {}) => this.request(Object.assign({ path: `/v1/location/${provinceId}/districts`, method: "GET" }, params)),
            /**
             * No description
             *
             * @tags Location Service
             * @name GetWards
             * @summary L???y danh s??ch ph?????ng x??
             * @request GET:/v1/location/{district_id}/wards
             */
            getWards: (districtId, params = {}) => this.request(Object.assign({ path: `/v1/location/${districtId}/wards`, method: "GET" }, params)),
            /**
             * No description
             *
             * @tags Groupon Service
             * @name GetProduct
             * @summary L???y s???n ph???m
             * @request GET:/v1/groupon/{store_channel}/{code}
             */
            getProduct: (storeChannel, code, params = {}) => this.request(Object.assign({ path: `/v1/groupon/${storeChannel}/${code}`, method: "GET", type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Groupon Service
             * @name CreateOrderWithoutLogin
             * @summary T???o ????n h??ng (Kh??ng c???n login)
             * @request POST:/v1/groupon/{code}
             */
            createOrderWithoutLogin: (code, body, params = {}) => this.request(Object.assign({ path: `/v1/groupon/${code}`, method: "POST", body: body, type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Order Service
             * @name GetOrders
             * @summary Tra c???u ????n h??ng nhanh (Kh??ng c???n login)
             * @request GET:/v1/orders/express/{partner_id}/{store_channel}
             */
            getOrders: (partnerId, storeChannel, query, params = {}) => this.request(Object.assign({ path: `/v1/orders/express/${partnerId}/${storeChannel}`, method: "GET", query: query, type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Order Service
             * @name CreateOrderWithoutLogin1
             * @summary T???o ????n h??ng nhanh (Kh??ng c???n login)
             * @request POST:/v1/orders/express/{partner_id}/{store_channel}
             */
            createOrderWithoutLogin1: (partnerId, storeChannel, query, body, params = {}) => this.request(Object.assign({ path: `/v1/orders/express/${partnerId}/${storeChannel}`, method: "POST", query: query, body: body, type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Shopping cart
             * @name GetShoppingCart
             * @summary Xem gi??? h??ng
             * @request GET:/v1/shopping-cart/{store_channel}/{session_id}
             */
            getShoppingCart: (partnerId, storeChannel, sessionId, params = {}) => this.request(Object.assign({ path: `/v1/shopping-cart/${partnerId}/${storeChannel}/${sessionId}`, method: "GET", type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Shopping cart
             * @name AddToCart
             * @summary Th??m v??o gi??? h??ng
             * @request POST:/v1/shopping-cart/{store_channel}/{session_id}
             */
            addToCart: (partnerId, storeChannel, sessionId, body, params = {}) => this.request(Object.assign({ path: `/v1/shopping-cart/${partnerId}/${storeChannel}/${sessionId}`, method: "POST", body: body, type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Shopping cart
             * @name UpdateQuantity
             * @summary C???p nh???t s??? l?????ng
             * @request PUT:/v1/shopping-cart/{store_channel}/{session_id}
             */
            updateQuantity: (partnerId, storeChannel, sessionId, body, params = {}) => this.request(Object.assign({ path: `/v1/shopping-cart/${partnerId}/${storeChannel}/${sessionId}`, method: "PUT", body: body, type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Shopping cart
             * @name RemoveCart
             * @summary X??a gi??? h??ng
             * @request DELETE:/v1/shopping-cart/{store_channel}/{session_id}
             */
            removeCart: (partnerId, storeChannel, sessionId, params = {}) => this.request(Object.assign({ path: `/v1/shopping-cart/${partnerId}/${storeChannel}/${sessionId}`, method: "DELETE", type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Shopping cart
             * @name RemoveFromCart
             * @summary X??a kh???i gi??? h??ng
             * @request DELETE:/v1/shopping-cart/{store_channel}/{session_id}/{supplier_id}/{product_id}
             */
            removeFromCart: (partnerId, storeChannel, sessionId, supplierId, productId, params = {}) => this.request(Object.assign({ path: `/v1/shopping-cart/${partnerId}/${storeChannel}/${sessionId}/${supplierId}/${productId}`, method: "DELETE", type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Order Service
             * @name GetOrder
             * @summary Th??ng tin chi ti???t ????n h??ng
             * @request GET:/v1/orders/{partner_id}/{store_channel}/{order_id}
             */
            getOrder: (partnerId, storeChannel, orderId, query, params = {}) => this.request(Object.assign({ path: `/v1/orders/${partnerId}/${storeChannel}/${orderId}`, method: "GET", query: query, type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Order Service
             * @name CancelOrder
             * @summary H???y ????n h??ng
             * @request PUT:/v1/orders/{partner_id}/{store_channel}/cancel
             */
            cancelOrder: (partnerId, storeChannel, body, params = {}) => this.request(Object.assign({ path: `/v1/orders/${partnerId}/${storeChannel}/cancel`, method: "PUT", body: body, type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Order Service
             * @name GetOrderStatus
             * @summary Danh s??ch tr???ng th??i ????n h??ng
             * @request GET:/v1/orders/{partner_id}/{store_channel}/status
             */
            getOrderStatus: (partnerId, storeChannel, params = {}) => this.request(Object.assign({ path: `/v1/orders/${partnerId}/${storeChannel}/status`, method: "GET", type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Order Service
             * @name GetOrders1
             * @summary Danh s??ch ????n h??ng
             * @request GET:/v1/orders/{partner_id}/{store_channel}
             */
            getOrders1: (partnerId, storeChannel, query, params = {}) => this.request(Object.assign({ path: `/v1/orders/${partnerId}/${storeChannel}`, method: "GET", query: query, type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Order Service
             * @name CreateOrder
             * @summary T???o ????n h??ng
             * @request POST:/v1/orders/{partner_id}/{store_channel}
             */
            createOrder: (partnerId, storeChannel, query, body, params = {}) => this.request(Object.assign({ path: `/v1/orders/${partnerId}/${storeChannel}`, method: "POST", query: query, body: body, type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Payment Service
             * @name GetPaymentMethods
             * @summary Danh s??ch ph????ng th???c thanh to??n
             * @request GET:/v1/payments/{partner_id}/{store_channel}
             */
            getPaymentMethods: (partnerId, storeChannel, params = {}) => this.request(Object.assign({ path: `/v1/payments/${partnerId}/${storeChannel}`, method: "GET", type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Category Service
             * @name GetCategories
             * @summary Danh s??ch danh m???c
             * @request GET:/v1/categories/{partner_id}/{store_channel}
             */
            getCategories: (partnerId, storeChannel, query, params = {}) => this.request(Object.assign({ path: `/v1/product-categories/${partnerId}/${storeChannel}`, method: "GET", query: query, type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Category Service
             * @name GetCategoryByHandle
             * @summary Chi ti???t danh m???c theo slug/handle
             * @request GET:/v1/categories/{partner_id}/{store_channel}/handle/{handle}
             */
            getCategoryByHandle: (partnerId, storeChannel, handle, params = {}) => this.request(Object.assign({ path: `/v1/product-categories/${partnerId}/${storeChannel}/handle/${handle}`, method: "GET", type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Category Service
             * @name GetCategoryById
             * @summary Chi ti???t danh m???c theo id
             * @request GET:/v1/categories/{partner_id}/{store_channel}/{category_id}
             */
            getCategoryById: (partnerId, storeChannel, categoryId, params = {}) => this.request(Object.assign({ path: `/v1/product-categories/${partnerId}/${storeChannel}/${categoryId}`, method: "GET", type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Product Group Service
             * @name GetProductGroups
             * @summary Danh s??ch nh??m s???n ph???m
             * @request GET:/v1/product-groups/{partner_id}
             */
            getProductGroups: (partnerId, params = {}) => this.request(Object.assign({ path: `/v1/product-groups/${partnerId}`, method: "GET", type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Product Service
             * @name GetTags
             * @summary Danh s??ch tag
             * @request GET:/v1/products/tags
             */
            getTags: (params = {}) => this.request(Object.assign({ path: `/v1/products/tags`, method: "GET", type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Product Service
             * @name GetProductById
             * @summary Chi ti???t s???n ph???m theo id
             * @request GET:/v1/products/{partner_id}/{store_channel}/{product_id}
             */
            getProductById: (partnerId, storeChannel, productId, params = {}) => this.request(Object.assign({ path: `/v1/products/${partnerId}/${storeChannel}/${productId}`, method: "GET", type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Product Service
             * @name GetProductByVariantId
             * @summary Chi ti???t s???n ph???m theo bi???n th??? id
             * @request GET:/v1/products/{partner_id}/{store_channel}/variants/{variantId}
             */
            getProductByVariantId: (partnerId, storeChannel, variantId, params = {}) => this.request(Object.assign({ path: `/v1/products/${partnerId}/${storeChannel}/variants/${variantId}`, method: "GET", type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Product Service
             * @name GetProducts
             * @summary Danh s??ch s???n ph???m
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
             * @summary Chi ti???t s???n ph???m theo slug/handle
             * @request GET:/v1/products/{partner_id}/{store_channel}/handle/{handle}
             */
            getProductByHandle: (partnerId, storeChannel, handle, params = {}) => this.request(Object.assign({ path: `/v1/products/${partnerId}/${storeChannel}/handle/${handle}`, method: "GET", type: ContentType.Json }, params)),
            /**
             * No description
             *
             * @tags Supplier Service
             * @name GetListSupplierByPartnerId
             * @summary Danh s??ch nh?? cung c???p
             * @request GET:/v1/suppliers/{partner_id}
             */
            GetListSupplierByPartnerIds: (body, params = {}) => this.request(Object.assign({ path: `/v1/suppliers`, method: "GET", body }, params)),
            /**
             * No description
             *
             * @tags Supplier Service
             * @name GetListSupplierByPartnerId
             * @summary Danh s??ch nh?? cung c???p
             * @request GET:/v1/suppliers/{partner_id}
             */
            GetListSupplierByPartnerId: (partnerId, query, params = {}) => this.request(Object.assign({ path: `/v1/suppliers/${partnerId}`, method: "GET", query: query }, params)),
            /**
             * No description
             *
             * @tags Tracking Service
             * @name SearchTracking
             * @summary Tracking ????n h??ng
             * @request GET:/v1/tracking/{order_id}
             */
            searchTracking: (orderId, params = {}) => this.request(Object.assign({ path: `/v1/tracking/${orderId}`, method: "GET", type: ContentType.Json }, params)),
        };
    }
}
exports.Api = Api;
