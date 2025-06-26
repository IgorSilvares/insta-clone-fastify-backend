"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.highlightsSchema = void 0;
const zod_1 = require("zod");
exports.highlightsSchema = zod_1.z.object({
    id: zod_1.z.number().int().positive(),
    cover_img_url: zod_1.z.string().url("Must be a valid image URL"),
    title: zod_1.z.string(),
});
