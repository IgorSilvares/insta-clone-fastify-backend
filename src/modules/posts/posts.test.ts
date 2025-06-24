import Fastify from "fastify"
import { postsRoutes } from "./posts.routes"

describe("POST /posts", () => {
    it("should create a new post and return it with a 201 status code", async () => {
        const app = Fastify()

        const newPostPayload = {
            img_url: "http://example.com/new-image.jpg",
            caption: "A brand new post from our test!",
        }

        const createdPost = { ...newPostPayload, id: 1 }

        app.decorate("transactions", {
            posts: {
                getById: jest.fn(),
                getAll: jest.fn(),
                create: jest.fn().mockReturnValue(createdPost),
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

        app.register(postsRoutes)

        const response = await app.inject({
            method: "POST",
            url: "/posts",
            payload: newPostPayload,
        })

        expect(response.statusCode).toBe(201)
        expect(JSON.parse(response.payload)).toEqual(createdPost)
    })
})

describe("GET /posts", () => {
    it("should get all posts and return them with a 200 status code", async () => {
        const app = Fastify()
        const mockPosts = [
            {
                id: 1,
                img_url: "http://example.com/img1.jpg",
                caption: "Test Post 1",
            },
            {
                id: 2,
                img_url: "http://example.com/img2.jpg",
                caption: "Test Post 2",
            },
        ]

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

        app.register(postsRoutes)

        const response = await app.inject({
            method: "GET",
            url: "/posts",
        })

        expect(response.statusCode).toBe(200)
        expect(JSON.parse(response.payload)).toEqual(mockPosts)
    })
})
