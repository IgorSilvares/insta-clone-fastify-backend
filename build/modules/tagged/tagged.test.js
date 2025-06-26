"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const tagged_routes_1 = require("./tagged.routes");
describe("GET /tagged/grid", () => {
    it("should return a list o tagged posts with a 200 status code", async () => {
        const app = (0, fastify_1.default)();
        const mockTaggedPosts = [
            {
                id: 1,
                img_url: "https://picsum.photos/id/100/300",
                caption: "Mock Tagged Post 1",
                who_tagged: "John",
            },
            {
                id: 2,
                img_url: "https://picsum.photos/id/101/300",
                caption: "Mock Tagged Post 2",
                who_tagged: "Will",
            },
        ];
        app.decorate("transactions", {
            posts: {
                getById: jest.fn(),
                getAll: jest.fn(),
                create: jest.fn(),
            },
            reels: {
                create: jest.fn(),
                getAll: jest.fn(),
                getById: jest.fn(),
            },
            tagged_posts: {
                create: jest.fn(),
                getAll: jest.fn(),
                getById: jest.fn(),
            },
            highlights: {
                create: jest.fn(),
                getAll: jest.fn(),
                getById: jest.fn(),
            },
        });
        app.register(tagged_routes_1.taggedRoutes);
        const response = await app.inject({
            method: "GET",
            url: "/tagged/grid",
        });
    });
});
