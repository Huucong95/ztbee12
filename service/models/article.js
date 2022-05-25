"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Article {
    constructor(init) {
        Object.assign(this, init);
        Object.defineProperty(this, 'published_at', {
            enumerable: true,
            get: function () {
                return this.created_at;
            },
        });
    }
}
exports.default = Article;
