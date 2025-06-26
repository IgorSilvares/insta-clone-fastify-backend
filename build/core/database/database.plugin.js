"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.databasePlugin = void 0;
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const database_transactions_1 = require("./database.transactions");
async function databasePluginHelper(fastify) {
    const db = new better_sqlite3_1.default("./database.db");
    fastify.log.info("SQLite database connection established.");
    // Create a simple table for testing if it doesn't exist
    db.exec(`
      CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        img_url TEXT NOT NULL,
        caption TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      );
    `);
    db.exec(`
      CREATE TABLE IF NOT EXISTS reels (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        video_url TEXT NOT NULL,
        thumbnail_url TEXT NOT NULL,
        description TEXT,
        views INTEGER DEFAULT 0,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      );
    `);
    db.exec(`
      CREATE TABLE IF NOT EXISTS tagged_posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      img_url TEXT NOT NULL,
      caption TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      who_tagged TEXT NOT NULL
      );
    `);
    db.exec(`
      CREATE TABLE IF NOT EXISTS highlights (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cover_img_url TEXT NOT NULL,
      title TEXT
      );
    `);
    const transactions = (0, database_transactions_1.createTransactionHelpers)(db);
    fastify.decorate("db", db);
    fastify.decorate("transactions", transactions);
    fastify.addHook("onClose", (instance, done) => {
        instance.db.close();
        instance.log.info("SQLite database connection closed.");
        done();
    });
}
exports.databasePlugin = (0, fastify_plugin_1.default)(databasePluginHelper);
