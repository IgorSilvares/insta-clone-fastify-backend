"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagged_postsSchema = void 0;
const zod_1 = require("zod");
exports.tagged_postsSchema = zod_1.z.object({
    id: zod_1.z.number().int().positive(),
    img_url: zod_1.z.string().url("Must be a valid image URL"),
    caption: zod_1.z.string(),
    who_tagged: zod_1.z.string(),
});
