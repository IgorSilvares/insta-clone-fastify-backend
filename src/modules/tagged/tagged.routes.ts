import { type FastifyInstance, type FastifyPluginAsync } from "fastify"
import { taggedService } from "./tagged.service"
import { TaggedPostUserCreationInput, TaggedPostsParams } from "./tagged.schema"
import { postsService } from "../posts/posts.service"
import { parseArgs } from "node:util"
import { parse } from "node:path/posix"

const taggedRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
    const service = taggedService(fastify)
    const postService = postsService(fastify)

    fastify.post<{ Body: TaggedPostUserCreationInput }>(
        "/tagged",
        async (request, reply) => {
            const newTagged = await service.create(request.body)

            //Return a 201 Created status code withh the new tagged object
            return reply.code(201).send(newTagged)
        }
    )

    fastify.get<{ Params: TaggedPostsParams }>(
        "/tagged/:username",
        async (request, reply) => {
            const username = request.params.username
            const taggedPosts = await service.getTaggedPostsByUser(username)

            // Return a 200 Succes status code with the tagged object
            return reply.code(200).send(taggedPosts)
        }
    )
}

export { taggedRoutes }
