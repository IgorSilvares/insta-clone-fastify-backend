"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const reels_routes_1 = require("./reels.routes");
describe("GET /reels/grid", () => {
    it("should return a list of reels with a 200 status code", async () => {
        const app = (0, fastify_1.default)();
        // To satisfy TypeScript, our mock must match the full shape of the
        // 'transactions' dependency, including all methods on 'posts'.
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
        app.register(reels_routes_1.reelsRoutes);
        const response = await app.inject({
            method: "GET",
            url: "/reels/grid",
        });
        expect(response.statusCode).toBe(200);
        //expect(JSON.parse(response.payload)).toEqual(mockReels)
        console.log(response.payload);
    });
});
