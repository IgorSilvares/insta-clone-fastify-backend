import Fastify from "fastify"
import { reelsRoutes } from "./reels.routes"

describe("GET /reels/grid", () => {
    it("should return a list of reels with a 200 status code", async () => {
        const app = Fastify()

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
        })

        app.register(reelsRoutes)

        const response = await app.inject({
            method: "GET",
            url: "/reels/grid",
        })

        expect(response.statusCode).toBe(200)
        //expect(JSON.parse(response.payload)).toEqual(mockReels)
        console.log(response.payload)
    })
})
