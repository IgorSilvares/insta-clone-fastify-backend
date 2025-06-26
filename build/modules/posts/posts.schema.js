"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSchema = void 0;
const zod_1 = require("zod");
exports.postSchema = zod_1.z.object({
    id: zod_1.z.number().int().positive(),
    img_url: zod_1.z.string().url("Must be a valid image URL"),
    caption: zod_1.z.string().nullable(),
    created_at: zod_1.z.string().datetime(),
});
