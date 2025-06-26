"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taggedService = void 0;
const taggedService = (fastify) => {
    return {
        create: async (taggedData) => {
            fastify.log.info(`Creating a new tagged post`);
            const tagged_post = fastify.transactions.tagged_posts.create(taggedData);
            return tagged_post;
        },
        getAll: async () => {
            fastify.log.info(`Getting all tagged posts`);
            const tagged_posts = fastify.transactions.tagged_posts.getAll();
            //fastify.log.info(`Retrieved reels from transactions: ${JSON.stringify(tagged_posts)}`)
            return tagged_posts;
        },
    };
};
exports.taggedService = taggedService;
