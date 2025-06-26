"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTaggedController = void 0;
const fastify_1 = __importDefault(require("fastify"));
const tagged_service_1 = require("./tagged.service");
const getTaggedController = async (request, reply) => {
    const service = (0, tagged_service_1.taggedService)(fastify_1.default);
    const tagged = await service.getAll();
    // Return a 200 Succes status code with the tagged object
    return reply.code(200).send(tagged);
};
exports.getTaggedController = getTaggedController;
