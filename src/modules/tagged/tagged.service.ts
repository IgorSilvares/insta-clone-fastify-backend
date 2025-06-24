import { type FastifyInstance } from "fastify"
import { taggedPostCreationInput } from "./tagged_schema"

export const taggedService = (fastify: FastifyInstance) => {
    return {
        create: async (taggedData: taggedPostCreationInput) => {
            fastify.log.info(`Creating a new tagged post`)
            const tagged_post =
                fastify.transactions.tagged_posts.create(taggedData)
            return tagged_post
        },

        getAll: async () => {
            fastify.log.info(`Getting all tagged posts`)
            const tagged_posts = fastify.transactions.tagged_posts.getAll()
            //fastify.log.info(`Retrieved reels from transactions: ${JSON.stringify(tagged_posts)}`)
            return tagged_posts
        },
    }
}
