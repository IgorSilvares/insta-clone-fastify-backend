"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const database_plugin_1 = require("./core/database/database.plugin");
const posts_routes_1 = require("./modules/posts/posts.routes");
const reels_routes_1 = require("./modules/reels/reels.routes");
const tagged_routes_1 = require("./modules/tagged/tagged.routes");
const highlights_routes_1 = require("./modules/highlights/highlights.routes");
const fastify = (0, fastify_1.default)({
    logger: true,
});
// Register our database plugin
fastify.register(database_plugin_1.databasePlugin);
// Register our routes
fastify.register(posts_routes_1.postsRoutes);
fastify.register(reels_routes_1.reelsRoutes);
fastify.register(tagged_routes_1.taggedRoutes);
fastify.register(highlights_routes_1.highlightsRoutes);
// Declare a default route
fastify.get("/", function (request, reply) {
    reply.send({ hello: "world" });
});
const port = 3000;
fastify.listen({ port }, function (err, address) {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
});
