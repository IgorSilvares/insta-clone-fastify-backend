"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taggedRoutes = void 0;
const tagged_service_1 = require("./tagged.service");
const posts_service_1 = require("../posts/posts.service");
const taggedRoutes = async (fastify) => {
    const service = (0, tagged_service_1.taggedService)(fastify);
    const postService = (0, posts_service_1.postsService)(fastify);
    fastify.post("/tagged", async (request, reply) => {
        const newTagged = await service.create(request.body);
        //Return a 201 Created status code withh the new tagged object
        return reply.code(201).send(newTagged);
    });
    fastify.get("/tagged/grid", async (request, reply) => {
        const service = (0, tagged_service_1.taggedService)(fastify);
        const tagged = await service.getAll();
        // Return a 200 Succes status code with the tagged object
        return reply.code(200).send(tagged);
    });
    fastify.get("/tagged/feed", async (request, reply) => {
        const tagged = await service.getAll();
        // Return a 200 Succes status code with the tagged object
        return reply.code(200).send(tagged);
    });
};
exports.taggedRoutes = taggedRoutes;
