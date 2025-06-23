import { fastify, type FastifyInstance, type FastifyPluginAsync } from "fastify"
import { taggedService } from "./tagged.service"
import { CreateTaggedBody } from "./tagged.types"

const taggedRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
    const service = taggedService(fastify)

    fastify.post<{ Body: CreateTaggedBody }>(
        "/tagged",
        async (request, reply) => {
            const newTagged = await service.create(request.body)

            //Return a 201 Created status code withh the new tagged object
            return reply.code(201).send(newTagged)
        }
    )

    fastify.get("/tagged/grid", async (request, reply) => {
        const tagged = await service.getAll()

        // Return a 200 Succes status code with the tagged object
        return reply.code(200).send(tagged)
    })

    fastify.get("/tagged/feed", async (request, reply) => {
        const tagged = await service.getAll()

        // Return a 200 Succes status code with the tagged object
        return reply.code(200).send(tagged)
    })
}

export { taggedRoutes }
