import { FastifyInstance } from "fastify/types/instance"
import { UserCreationInput, User } from "./users.schema"
import fastify from "fastify"

export const usersService = (fastify: FastifyInstance) => {
    return {
        create: async (userData: UserCreationInput) => {
            fastify.log.info(`Creating a new User`)
            const user = fastify.transactions.users.create(userData)
            return user
        },

        getAll: async (): Promise<User[]> => {
            fastify.log.info(`Getting all users`)
            const users = fastify.transactions.users.getAll()
            return users as User[]
        },

        getById: async (id: number): Promise<User> => {
            fastify.log.info(`Getting user with id: ${id}`)
            const user = fastify.transactions.users.getById(id)
            return user as User
        },

        getByUsername: async (username: string): Promise<User> => {
            fastify.log.info(`Getting User with username: ${username}`)
            const user = fastify.transactions.users.getByUsername(username)
            return user as User
        },
    }
}
