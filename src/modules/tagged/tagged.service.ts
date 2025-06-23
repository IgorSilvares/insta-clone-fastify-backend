import { fastify, type FastifyInstance } from "fastify"
import { CreateTaggedBody } from "./tagged.types"

type CreateTaggedData = {
    img_url: string
    caption: string
    who_tagged: string
}

export const taggedService = (fastify: FastifyInstance) => {
    return {
        create: async (taggedData: CreateTaggedData) => {
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
