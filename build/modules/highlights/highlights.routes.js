"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.highlightsRoutes = void 0;
const highlights_service_1 = require("./highlights.service");
const highlightsRoutes = async (fastify) => {
    const service = (0, highlights_service_1.highlightsService)(fastify);
    fastify.post("/highlights", async (request, reply) => {
        const newHighlight = await service.create(request.body);
        return reply.code(201).send(newHighlight);
    });
    fastify.get("/highlights", async (request, reply) => {
        const highlights = await service.getAll();
        return reply.code(200).send(highlights);
    });
    fastify.get("/highlights/:id", async (request, reply) => {
        const id = parseInt(request.params.id);
        const highlight = await service.getById(id);
        return reply.code(200).send(highlight);
    });
};
exports.highlightsRoutes = highlightsRoutes;
