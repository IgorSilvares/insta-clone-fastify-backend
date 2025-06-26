"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reelsService = void 0;
const reelsService = (fastify) => {
    return {
        create: async (reelData) => {
            fastify.log.info(`Creating a new reel`);
            const reel = fastify.transactions.reels.create(reelData);
            return reel;
        },
        getAll: async () => {
            fastify.log.info(`Getting all reels`);
            const reels = fastify.transactions.reels.getAll();
            fastify.log.info(`Retrieved reels from transactions: ${JSON.stringify(reels)}`);
            return reels;
        },
    };
};
exports.reelsService = reelsService;
