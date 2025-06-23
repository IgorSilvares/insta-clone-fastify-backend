import type { FastifyInstance, FastifyPluginAsync } from "fastify"
import { postsService } from "./posts.service"
import { PostCreationInput } from "./post.schema"

const postsRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
    const service = postsService(fastify)

    fastify.post<{ Body: PostCreationInput }>(
        "/posts",
        async (request, reply) => {
            const newPost = await service.create(request.body)

            // Return a 201 Created status code with the new post object
            return reply.code(201).send(newPost)
        }
    )

    fastify.get("/posts", async (request, reply) => {
        const posts = await service.getAll()

        return reply.code(200).send(posts)
    })
}

export { postsRoutes }
