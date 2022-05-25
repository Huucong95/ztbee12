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
const variant_1 = require("../models/variant");
class ProductService {
    // private slug:string
    constructor(_partnerId, _storeChannel, _sdk) {
        this._partnerId = _partnerId;
        this._storeChannel = _storeChannel;
        this._sdk = _sdk;
    }
    getFavoriteProducts() {
        throw new Error("Method not implemented.");
    }
    getFavoriteProduct(productId) {
        throw new Error("Method not implemented.");
    }
    addFavoriteProduct(productId) {
        throw new Error("Method not implemented.");
    }
    removeFavoriteProduct(productId) {
        throw new Error("Method not implemented.");
    }
    update(serviceSubject) {
        if (this.sdk !== serviceSubject.sdk) {
            this.sdk = serviceSubject.sdk;
        }
        if (this.partnerId !== serviceSubject.partnerId) {
            this.partnerId = serviceSubject.partnerId;
        }
        if (this.storeChannel !== serviceSubject.storeChannel) {
            this.storeChannel = serviceSubject.storeChannel;
        }
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
    get storeChannel() {
        return this._storeChannel;
    }
    set partnerId(partnerId) {
        this._partnerId = partnerId;
    }
    set storeChannel(storeChannel) {
        this._storeChannel = storeChannel;
    }
    getProducts(query = {
        currentPage: 1,
        maxResult: 10,
    }) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this._sdk.api.v1.getProducts(this.partnerId, this.storeChannel, query);
            const r = (yield response.json());
            return r.data;
        });
    }
    getProductByHandle(handle) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.sdk.api.v1
                .getProductByHandle(this.partnerId, this.storeChannel, handle)
                .then((response) => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
                .then((data) => {
                var _a, _b, _c, _d;
                let m = data.data;
                return new product_1.default({
                    id: m.id,
                    title: m.title,
                    handle: m.handle,
                    type: m.type,
                    vendor: m.vendor,
                    price: m.price,
                    price_max: m.price_max,
                    price_min: m.price_min,
                    price_varies: (_a = m.price_varies) !== null && _a !== void 0 ? _a : true,
                    available: (_b = m.available) !== null && _b !== void 0 ? _b : true,
                    tags: m.tags,
                    options: m.options,
                    options_full: m.options_full,
                    compare_at_price: m.compare_at_price,
                    compare_at_price_max: m.compare_at_price_max,
                    compare_at_price_min: m.compare_at_price_min,
                    compare_at_price_varies: (_c = m.compare_at_price_varies) !== null && _c !== void 0 ? _c : false,
                    url: `/product/${m.handle}`,
                    featured_image: m.featured_image,
                    images: m.images,
                    description: (_d = m.description) !== null && _d !== void 0 ? _d : "",
                    variants: m.variants.map((variant) => new variant_1.default({
                        id: variant.id,
                        title: variant.title,
                        price: variant.price,
                        weight: variant.weight,
                        compare_at_price: variant.compare_at_price,
                        available: variant.available,
                        inventory_quantity: variant.inventory_quantity,
                        option1: variant.option1 || "",
                        option2: variant.option2 || "",
                        option3: variant.option3 || "",
                        options: variant.options || ["random", "random"],
                        options_full: variant.options_full || [],
                    })),
                    collections: m.collections.map((mc) => new collection_1.default({
                        id: mc.id,
                        handle: mc.slug,
                        title: mc.title,
                        description: mc.description,
                        url: `/collection/${mc.handle}`,
                    })),
                });
                //return _(products).first()
            });
        });
    }
    getProductById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.sdk.api.v1
                .getProductById(this.partnerId, this.storeChannel, id)
                .then((response) => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
                .then((data) => {
                var _a, _b, _c, _d;
                if (data.status === 0)
                    throw new Error(data.message);
                let m = data.data;
                return new product_1.default({
                    id: m.id,
                    title: m.title,
                    handle: m.handle,
                    type: m.type,
                    vendor: m.vendor,
                    price: m.price,
                    price_max: m.price_max,
                    price_min: m.price_min,
                    price_varies: (_a = m.price_varies) !== null && _a !== void 0 ? _a : true,
                    available: (_b = m.available) !== null && _b !== void 0 ? _b : true,
                    tags: m.tags,
                    options: m.options,
                    options_full: m.options_full,
                    compare_at_price: m.compare_at_price,
                    compare_at_price_max: m.compare_at_price_max,
                    compare_at_price_min: m.compare_at_price_min,
                    compare_at_price_varies: (_c = m.compare_at_price_varies) !== null && _c !== void 0 ? _c : false,
                    url: `/product/${m.handle}`,
                    featured_image: m.featured_image,
                    images: m.images,
                    description: (_d = m.description) !== null && _d !== void 0 ? _d : "",
                    variants: m.variants.map((mc) => new variant_1.default({
                        id: mc.id,
                        title: mc.title,
                        price: mc.price,
                        weight: mc.weight,
                        compare_at_price: mc.compare_at_price,
                        available: mc.available,
                        inventory_quantity: mc.inventory_quantity,
                        option1: mc.option1 || "",
                        option2: mc.option2 || "",
                        option3: mc.option3 || "",
                        options: mc.options,
                        options_full: mc.options_full,
                    })),
                    collections: m.collections.map((mc) => new collection_1.default({
                        id: mc.id,
                        handle: mc.slug,
                        title: mc.title,
                        description: mc.description,
                        url: `/collection/${mc.handle}`,
                    })),
                });
                //return _(products).first()
            })
                .catch((err) => err);
        });
    }
    getProductByVariantId(variantId) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.sdk.api.v1.getProductByVariantId(this.partnerId, this.storeChannel, variantId);
                const response_json = yield response.json();
                const { data: m } = response_json;
                return new product_1.default({
                    id: m.id,
                    title: m.title,
                    handle: m.handle,
                    type: m.type,
                    vendor: m.vendor,
                    price: m.price,
                    price_max: m.price_max,
                    price_min: m.price_min,
                    price_varies: (_a = m.price_varies) !== null && _a !== void 0 ? _a : true,
                    available: (_b = m.available) !== null && _b !== void 0 ? _b : true,
                    tags: m.tags,
                    options: m.options,
                    options_full: m.options_full,
                    compare_at_price: m.compare_at_price,
                    compare_at_price_max: m.compare_at_price_max,
                    compare_at_price_min: m.compare_at_price_min,
                    compare_at_price_varies: (_c = m.compare_at_price_varies) !== null && _c !== void 0 ? _c : false,
                    url: `/product/${m.handle}`,
                    featured_image: m.featured_image,
                    images: m.images,
                    description: (_d = m.description) !== null && _d !== void 0 ? _d : "",
                    variants: m.variants.map((mc) => new variant_1.default({
                        id: mc.id,
                        title: mc.title,
                        price: mc.price,
                        weight: mc.weight,
                        compare_at_price: mc.compare_at_price,
                        available: mc.available,
                        inventory_quantity: mc.inventory_quantity,
                        option1: mc.option1 || "",
                        option2: mc.option2 || "",
                        option3: mc.option3 || "",
                        options: mc.options,
                        options_full: mc.options_full,
                    })),
                    collections: m.collections.map((mc) => new collection_1.default({
                        id: mc.id,
                        handle: mc.slug,
                        title: mc.title,
                        description: mc.description,
                        url: `/collection/${mc.handle}`,
                    })),
                });
            }
            catch (error) {
                const err = yield error.json();
                throw new Error(err.response.statusText);
            }
        });
    }
}
exports.default = ProductService;
