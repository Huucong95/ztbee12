"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = require("./auth.service");
const product_service_1 = require("./product.service");
const account_service_1 = require("./account.service");
const cart_service_1 = require("./cart.service");
const collection_service_1 = require("./collection.service");
const order_service_1 = require("./order.service");
const payment_service_1 = require("./payment.service");
const location_service_1 = require("./location.service");
const sdk_client_1 = require("../common/sdk.client");
const supplier_service_1 = require("./supplier.service");
class SdkClientService {
    constructor(_baseUrl, _partnerId, _storeChannel, _sessionId) {
        this._baseUrl = _baseUrl;
        this._partnerId = _partnerId;
        this._storeChannel = _storeChannel;
        this._sessionId = _sessionId;
        this.serviceObservers = [];
        this._sdk = new sdk_client_1.default(this._baseUrl);
        this.attach((this.authService = new auth_service_1.default(this.partnerId, this.sdk)));
        this.attach((this.productService = new product_service_1.default(this.partnerId, this.storeChannel, this.sdk)));
        this.attach((this.customerService = new account_service_1.default(this.partnerId, this.sdk)));
        this.attach((this.cartService = new cart_service_1.default(this.partnerId, this.storeChannel, this.sessionId, this.sdk)));
        this.attach((this.collectionService = new collection_service_1.default(this.partnerId, this.sdk)));
        this.attach((this.orderService = new order_service_1.default(this.partnerId, this.storeChannel, this.sdk)));
        this.attach((this.paymentService = new payment_service_1.default(this.partnerId, this.storeChannel, this.sdk)));
        this.attach((this.locationService = new location_service_1.default(this.sdk)));
        this.attach((this.supplierService = new supplier_service_1.default(this.partnerId, this.sdk)));
    }
    get sdk() {
        return this._sdk;
    }
    set(sdk) {
        this._sdk = sdk;
    }
    set baseUrl(baseUrl) {
        this._baseUrl = baseUrl;
        this.notify();
    }
    get baseUrl() {
        return this._baseUrl;
    }
    set partnerId(partnetId) {
        this._partnerId = partnetId;
        this.notify();
    }
    get partnerId() {
        return this._partnerId;
    }
    set storeChannel(storeChannel) {
        this._storeChannel = storeChannel;
        this.notify();
    }
    get storeChannel() {
        return this._storeChannel;
    }
    set sessionId(sessionId) {
        this._sessionId = sessionId;
        this.notify();
    }
    get sessionId() {
        return this === null || this === void 0 ? void 0 : this._sessionId;
    }
    get observes() {
        return this.serviceObservers;
    }
    attach(observer) {
        const isAttached = this.serviceObservers.find((ele) => observer === ele);
        if (isAttached) {
            return;
        }
        this.serviceObservers.push(observer);
    }
    detach(observer) {
        const observerIndex = this.serviceObservers.indexOf(observer);
        if (observerIndex === -1) {
            return;
        }
        this.serviceObservers.splice(observerIndex, 1);
    }
    notify() {
        for (const observer of this.serviceObservers) {
            observer.update(this);
        }
    }
}
exports.default = SdkClientService;
