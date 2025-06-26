import { type FastifyInstance } from "fastify"
import { TaggedPostUserCreationInput } from "./tagged.schema"

export const taggedService = (fastify: FastifyInstance) => {
    return {
        create: async (taggedData: TaggedPostUserCreationInput) => {
            fastify.log.info(`Creating a new tagged post`)
            const tagged_post =
                fastify.transactions.taggedPostUsers.create(taggedData)
            return tagged_post
        },

        getTaggedPostsByUser: async (username: string) => {
            fastify.log.info(
                `Getting all tagged posts for user with username: ${username}`
            )
            const tagged_post =
                fastify.transactions.taggedPostUsers.getPostsByUser(username)
            return tagged_post
        },

        getUsersInTaggedPost: async (postId: number) => {
            fastify.log.info(
                `Getting all users taggeds in the post with id: ${postId}`
            )
            const tagged_users =
                fastify.transactions.taggedPostUsers.getUsersInPost(postId)
            return tagged_users
        },

        getTaggedPostById: async (id: number) => {
            fastify.log.info(``)
        },
    }
}
