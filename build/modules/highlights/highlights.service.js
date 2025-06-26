"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.highlightsService = void 0;
const highlightsService = (fastify) => {
    return {
        create: async (highlightData) => {
            fastify.log.info(`Creating a new highlight`);
            const highlight = fastify.transactions.highlights.create(highlightData);
            return highlight;
        },
        getAll: async () => {
            fastify.log.info(`Getting all highlights`);
            const highlights = fastify.transactions.highlights.getAll();
            return highlights;
        },
        getById: async (id) => {
            fastify.log.info(`Getting hightlight with ID: ${id}`);
            const highlight = fastify.transactions.highlights.getById(id);
            return highlight;
        },
    };
};
exports.highlightsService = highlightsService;
