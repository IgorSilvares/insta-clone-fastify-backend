"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransactionHelpers = void 0;
const createTransactionHelpers = (db) => {
    const statements = {
        getPostById: db.prepare("SELECT * FROM posts WHERE id = ?"),
        getAllPosts: db.prepare("SELECT * FROM posts"),
        createPost: db.prepare("INSERT INTO posts (img_url, caption) VALUES (@img_url, @caption) RETURNING *"),
        createReel: db.prepare("INSERT INTO reels (video_url, description, thumbnail_url) VALUES (@video_url, @description, @thumbnail_url) RETURNING *"),
        getAllReels: db.prepare("SELECT * FROM reels"),
        getReelById: db.prepare("SELECT * FROM reels WHERE id = ?"),
        createTagged: db.prepare("INSERT INTO tagged_posts (img_url, caption, who_tagged) VALUES (@img_url, @caption, @who_tagged) RETURNING *"),
        getAllTagged: db.prepare("SELECT * FROM tagged_posts"),
        getTaggedById: db.prepare("SELECT * FROM tagged_posts WHERE id = ?"),
        createHighlight: db.prepare("INSERT INTO highlights (cover_img_url, title) VALUES (@cover_img_url, @title) RETURNING *"),
        getHighlightById: db.prepare("SELECT * FROM highlights WHERE id = ?"),
        getAllHighlights: db.prepare("SELECT * FROM highlights"),
    };
    const posts = {
        getById: (id) => {
            return statements.getPostById.get(id);
        },
        getAll: () => {
            return statements.getAllPosts.all();
        },
        create: (data) => {
            return statements.createPost.get(data);
        },
    };
    const reels = {
        create: (data) => {
            return statements.createReel.get(data);
        },
        getAll: () => {
            const allReels = statements.getAllReels.all();
            console.log("DATABASE TRANSACTION: Raw reels from DB:", allReels);
            return statements.getAllReels.all();
        },
        getById: (id) => {
            return statements.getReelById.get(id);
        },
    };
    const tagged_posts = {
        create: (data) => {
            return statements.createTagged.get(data);
        },
        getAll: () => {
            const allTagged = statements.getAllTagged.all();
            console.log("DATABASE TRANSACTION: Raw tagged from DB:", allTagged);
            return allTagged;
        },
        getById: (id) => {
            return statements.getTaggedById.get(id);
        },
    };
    const highlights = {
        create: (data) => {
            return statements.createHighlight.get(data);
        },
        getAll: () => {
            const allHighlights = statements.getAllHighlights.all();
            console.log("DATABASE TRANSACTION: Raw highlights from DB:", allHighlights);
            return allHighlights;
        },
        getById: (id) => {
            const highlight_data = statements.getHighlightById.get(id);
            console.log("DATABASE TRANSACTION: Raw highlight from DB:", highlight_data);
            return highlight_data;
        },
    };
    return {
        posts,
        reels,
        tagged_posts,
        highlights,
    };
};
exports.createTransactionHelpers = createTransactionHelpers;
