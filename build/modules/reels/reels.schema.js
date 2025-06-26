"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reelSchema = void 0;
const zod_1 = require("zod");
exports.reelSchema = zod_1.z.object({
    id: zod_1.z.number().int().positive(),
    video_url: zod_1.z.string().url("Must be a valid video URL"),
    thumbnail_url: zod_1.z.string().url("Must be a valid thumbnail URL"),
    description: zod_1.z.string().nullable(),
    views: zod_1.z.number().int().min(0).default(0),
    created_at: zod_1.z.string().datetime(),
});
