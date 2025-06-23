import Fastify from "fastify"
import { taggedRoutes } from "./tagged.routes"

describe("GET /tagged/grid", () => {
    it("should return a list o tagged posts with a 200 status code", async () => {
        const app = Fastify()
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
        ]

        app.decorate("transactions", {
            posts: {
                create: jest.fn(),
                getAll: jest.fn(),
                getById: jest.fn(),
            },
            reels: {
                create: jest.fn(),
                getAll: jest.fn(),
            },
            tagged_posts: {
                create: jest.fn().mockReturnValue(mockTaggedPosts),
                getAll: jest.fn(),
            },
        })

        app.register(taggedRoutes)

        const response = await app.inject({
            method: "GET",
            url: "/tagged/grid",
        })
    })
})
