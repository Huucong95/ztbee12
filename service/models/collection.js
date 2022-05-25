"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Collection {
    constructor(init) {
        Object.defineProperty(this, "tags", {
            enumerable: true,
            get: function () {
                // const db = Database.table()
                // const datas = _.toArray(_(db.products).flatMap(m => m.tags))
                // return _.uniqWith(datas);
            },
        });
        Object.defineProperty(this, "all_products_count", {
            enumerable: true,
            get: function () {
                return this.products ? this.products.length : 0;
            },
        });
        Object.assign(this, init);
    }
}
exports.default = Collection;
