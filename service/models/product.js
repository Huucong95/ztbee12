"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Product {
    constructor(init) {
        Object.defineProperty(this, "selected_or_first_available_variant", {
            enumerable: true,
            get: function () {
                // return _(this.variants).first();
            },
        });
        Object.assign(this, init);
    }
}
exports.default = Product;
