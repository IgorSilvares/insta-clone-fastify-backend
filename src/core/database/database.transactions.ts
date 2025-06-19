import type { Database } from "better-sqlite3"

export const createTransactionHelpers = (db: Database) => {
    const statements = {
        getPostById: db.prepare("SELECT * FROM posts WHERE id = ?"),
        getAllPosts: db.prepare("SELECT * FROM posts"),
        createPost: db.prepare(
            "INSERT INTO posts (img_url, caption) VALUES (@img_url, @caption) RETURNING *"
        ),
        createReel: db.prepare(
            "INSERT INTO reels (video_url, description) VALUES (@video_url, @description) RETURNING *"
        ),
        getAllReels: db.prepare("SELECT * FROM reels"),
        getReelsById: db.prepare("SELECT * FROM reels WHERE id = ?"),
    }

    const posts = {
        getById: (id: number) => {
            return statements.getPostById.get(id)
        },
        getAll: () => {
            return statements.getAllPosts.all()
        },
        create: (data: { img_url: string; caption: string }) => {
            return statements.createPost.get(data)
        },
    }

    const reels = {
        create: (data: { video_url: string; description: string | null }) => {
            return statements.createReel.get(data)
        },
        getAll: () => {
            const allReels = statements.getAllReels.all()
            console.log("DATABASE TRANSACTION: Raw reels from DB:", allReels)
            return statements.getAllReels.all()
        },
    }

    return {
        posts,
        reels,
    }
}

export type TransactionHelpers = ReturnType<typeof createTransactionHelpers>
