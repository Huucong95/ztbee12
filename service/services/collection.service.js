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
const collection_1 = require("../models/collection");
const product_1 = require("../models/product");
class CollectionService {
    constructor(_partnerId, _sdk) {
        this._partnerId = _partnerId;
        this._sdk = _sdk;
    }
    update(serviceSubject) {
        if (this.partnerId !== serviceSubject.partnerId) {
            this.partnerId = serviceSubject.partnerId;
        }
        if (this.sdk !== serviceSubject.sdk) {
            this.sdk = serviceSubject.sdk;
        }
    }
    get partnerId() {
        return this._partnerId;
    }
    set partnerId(partnerId) {
        this._partnerId = partnerId;
    }
    set sdk(sdk) {
        this._sdk = sdk;
    }
    get sdk() {
        return this._sdk;
    }
    getListCollection(partner_id, storeChannel) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.sdk.api.v1
                .getCategories(partner_id, storeChannel)
                .then((response) => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
                .then((data) => {
                return data.data.map((m) => new collection_1.default({
                    id: m.id,
                    handle: m.handle,
                    title: m.title,
                    description: m.description,
                    url: `/collections/${m.handle}`,
                    products: m.products.map((m) => new product_1.default(Object.assign(Object.assign({}, m), { url: `/products/${m.handle}` }))),
                }));
            })
                .catch((error) => error.json())
                .then((err) => {
                return err;
            });
        });
    }
    getCollection(partner_id, storeChannel, handle) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.sdk.api.v1
                .getCategoryByHandle(partner_id, storeChannel, handle)
                .then((response) => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
                .then((data) => {
                const m = data.data;
                return new collection_1.default({
                    id: m.id,
                    handle: m.handle,
                    title: m.title,
                    description: m.description,
                    url: `/collections/${m.handle}`,
                    products: m.products.map((m) => new product_1.default(Object.assign(Object.assign({}, m), { url: `/products/${m.handle}` }))),
                });
            });
        });
    }
}
exports.default = CollectionService;
