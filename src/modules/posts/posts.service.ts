import type { FastifyInstance } from "fastify"
import { PostCreationInput, Post } from "./posts.schema"

export const postsService = (fastify: FastifyInstance) => {
    return {
        create: async (postData: PostCreationInput) => {
            fastify.log.info(`Creating a new post`)
            // This will use the MOCK `transactions` in our test,
            // and the REAL `transactions` in our live application.
            const post = fastify.transactions.posts.create(postData)
            return post
        },

        getAll: async (): Promise<Post[]> => {
            fastify.log.info(`Getting all posts`)
            const posts = fastify.transactions.posts.getAll()
            return posts as Post[]
        },

        getById: async (id: number): Promise<Post> => {
            fastify.log.info(`Getting post with id:${id}`)
            const post = fastify.transactions.posts.getById(id)
            return post as Post
        },

        getByUser: async (userId: number): Promise<Post[]> => {
            fastify.log.info(`Getting post from user with id:${userId}`)
            const post = fastify.transactions.posts.getByUser(userId)
            return post as Post[]
        },
    }
}
