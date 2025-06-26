import { fastify, type FastifyInstance, type FastifyPluginAsync } from "fastify"
import { usersService } from "./users.service"
import { UserCreationInput, UsersParams } from "./users.schema"
import { request } from "node:https"

const usersRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
    const service = usersService(fastify)

    fastify.post<{ Body: UserCreationInput }>(
        "/users",
        async (request, reply) => {
            const newUser = await service.create(request.body)

            return reply.code(201).send(newUser)
        }
    )

    fastify.get("/users", async (request, reply) => {
        const users = await service.getAll()

        return reply.code(200).send(users)
    })

    fastify.get<{ Params: UsersParams }>(
        "/users/:id",
        async (request, reply) => {
            const id = parseInt(request.params.id)
            const user = await service.getById(id)

            return reply.code(200).send(user)
        }
    )
}

export { usersRoutes }
