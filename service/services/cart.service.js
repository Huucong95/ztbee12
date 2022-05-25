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
const cart_1 = require("../models/cart");
const utils_1 = require("../utils");
class CartService {
    constructor(partnerId, store_channel, sessionId, sdk) {
        this._partnerId = partnerId;
        this._store_channel = store_channel;
        this._sessionId = sessionId;
        this._sdk = sdk;
    }
    update(serviceSubject) {
        if (this.partnerId !== serviceSubject.partnerId) {
            this.partnerId = serviceSubject.partnerId;
        }
        if (this.sdk !== serviceSubject.sdk) {
            this.sdk = serviceSubject.sdk;
        }
        if (this.sessionId !== serviceSubject.sessionId) {
            this.sessionId = serviceSubject.sessionId;
        }
    }
    set sdk(sdk) {
        this._sdk = sdk;
    }
    get sdk() {
        return this._sdk;
    }
    get store_channel() {
        return this._store_channel;
    }
    get sessionId() {
        return this._sessionId;
    }
    get partnerId() {
        return this._partnerId;
    }
    set store_channel(store_channel) {
        this._store_channel = store_channel;
    }
    set partnerId(partnerId) {
        this._partnerId = partnerId;
    }
    set sessionId(sessionId) {
        this._sessionId = sessionId;
    }
    getCartInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.sdk.api.v1.getShoppingCart(this.partnerId, this.store_channel, this.sessionId);
                const { data } = yield response.json();
                // console.log(data);
                const cart = new cart_1.default(data);
                return Object.assign(Object.assign({}, cart), { items: cart.items.map((item) => (Object.assign(Object.assign({}, item), { price: item.original_price, variant_id: item.product_id }))) });
            }
            catch (error) {
                console.log(error);
                const err = yield error.json();
                if (err.status == 404) {
                    throw Error(err);
                }
                return yield error.json();
            }
        });
    }
    static generateSessionIdForCart(length) {
        return (0, utils_1.generateSessionId)(length);
    }
    addToCart(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resposne = yield this.sdk.api.v1.addToCart(this.partnerId, this.store_channel, this.sessionId, body);
                const rs = yield resposne.json();
                // console.log(rs);
                return rs.message;
            }
            catch (error) {
                const json_error = yield error.json();
                return json_error;
            }
        });
    }
    updateCartQuantity(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.sdk.api.v1.updateQuantity(this.partnerId, this.store_channel, this.sessionId, body);
                const rs = yield response.json();
                return rs.message || rs.data;
            }
            catch (error) {
                return yield error.json();
            }
        });
    }
    deleteItemFromCart(supplierId, producId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.sdk.api.v1.removeFromCart(this.partnerId, this.store_channel, this.sessionId, supplierId, producId);
                const rs = yield response.json();
                return rs.message || rs.data;
            }
            catch (error) {
                return yield error.json();
            }
        });
    }
    deleteCart() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.sdk.api.v1.removeCart(this.partnerId, this.store_channel, this.sessionId);
                const rs = yield response.json();
                return rs.message || rs.data;
            }
            catch (error) {
                return yield error.json();
            }
        });
    }
}
exports.default = CartService;
