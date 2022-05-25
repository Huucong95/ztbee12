"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LineItem {
    constructor(init) {
        Object.defineProperty(this, "original_line_price", {
            get: function () {
                return this.original_price * this.quantity;
            },
        });
        Object.assign(this, init);
        this.price = init === null || init === void 0 ? void 0 : init.original_price;
    }
}
exports.default = LineItem;
