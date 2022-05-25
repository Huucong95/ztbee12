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
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
class OrderService {
    constructor(_partnerId, _store_channel, _sdk) {
        this._partnerId = _partnerId;
        this._store_channel = _store_channel;
        this._sdk = _sdk;
    }
    update(serviceSubject) {
        if (this.sdk !== serviceSubject.sdk) {
            this.sdk = serviceSubject.sdk;
        }
        if (this.partnerId !== serviceSubject.partnerId) {
            this.partnerId = serviceSubject.partnerId;
        }
        if (this.store_channel !== serviceSubject.storeChannel) {
            this.store_channel = serviceSubject.storeChannel;
        }
    }
    static generateTokenForOrderWithoutLogin(data) {
        return (0, utils_1.generateTokenForOrderWithoutLogin)(data);
    }
    set sdk(sdk) {
        this._sdk = sdk;
    }
    get sdk() {
        return this._sdk;
    }
    get partnerId() {
        return this._partnerId;
    }
    get store_channel() {
        return this._store_channel;
    }
    set partnerId(partnerId) {
        this._partnerId = partnerId;
    }
    set store_channel(store_channel) {
        this._store_channel = store_channel;
    }
    consultOrderWithoutLogin(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.sdk.api.v1.getOrders(this.partnerId, this.store_channel, query);
                const rs = yield response.json();
                return rs;
            }
            catch (error) {
                const err = yield error.json();
                return err;
            }
        });
    }
    createOrderWithoutLogin(query, body, accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.sdk.api.v1.createOrderWithoutLogin1(this.partnerId, this.store_channel, query, body, {
                    headers: {
                        "X-Ecomos-Access-Token": accessToken,
                    },
                });
                const rs = yield response.json();
                return rs;
            }
            catch (error) {
                return yield error.json();
            }
        });
    }
    getOrderInfo(orderId, accessToken, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.sdk.api.v1.getOrder(this.partnerId, this.store_channel, orderId, query, {
                    headers: {
                        "X-Ecomos-Access-Token": accessToken,
                    },
                });
                const rs = yield response.json();
                return rs;
            }
            catch (error) {
                return yield error.json();
            }
        });
    }
    cancelOrder(body, accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.sdk.api.v1.cancelOrder(this.partnerId, this.store_channel, body, {
                    headers: {
                        "X-Ecomos-Access-Token": accessToken,
                    },
                });
                return yield response.json();
            }
            catch (error) {
                return yield error.json();
            }
        });
    }
    getListOrders(accessToken, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.sdk.api.v1.getOrders1(this.partnerId, this.store_channel, query, {
                    headers: {
                        "X-Ecomos-Access-Token": accessToken,
                    },
                });
                return yield response.json();
            }
            catch (error) {
                return error.json();
            }
        });
    }
    createOrderWithLogin(query, body, accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.sdk.api.v1.createOrder(this.partnerId, this.store_channel, query, body, {
                    headers: {
                        "X-Ecomos-Access-Token": accessToken,
                    },
                });
                return yield response.json();
            }
            catch (error) {
                return yield error.json();
            }
        });
    }
    getOrdersStatus(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.sdk.api.v1.getOrderStatus(this.partnerId, this.store_channel, {
                    headers: {
                        "X-Ecomos-Access-Token": accessToken,
                    },
                });
                return yield response.json();
            }
            catch (error) {
                return error.json();
            }
        });
    }
}
exports.default = OrderService;
