"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reelsRoutes = void 0;
const reels_service_1 = require("./reels.service");
const reelsRoutes = async (fastify) => {
    const service = (0, reels_service_1.reelsService)(fastify);
    fastify.post("/reels", async (request, reply) => {
        const newReel = await service.create(request.body);
        // Return a 201 Created status code with the new reel object
        return reply.code(201).send(newReel);
    });
    fastify.get("/reels/grid", async (request, reply) => {
        const reels = await service.getAll();
        // Return a 200 Succes status code with the reels object
        return reply.code(200).send(reels);
    });
};
exports.reelsRoutes = reelsRoutes;
