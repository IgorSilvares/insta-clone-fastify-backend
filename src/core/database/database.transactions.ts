import type { Database } from "better-sqlite3"
import { type PostCreationInput } from "src/modules/posts/post.schema"
import { type ReelCreationInput } from "src/modules/reels/reel.schema"

export const createTransactionHelpers = (db: Database) => {
    const statements = {
        getPostById: db.prepare("SELECT * FROM posts WHERE id = ?"),
        getAllPosts: db.prepare("SELECT * FROM posts"),
        createPost: db.prepare(
            "INSERT INTO posts (img_url, caption) VALUES (@img_url, @caption) RETURNING *"
        ),
        createReel: db.prepare(
            "INSERT INTO reels (video_url, description, thumbnail_url) VALUES (@video_url, @description, @thumbnail_url) RETURNING *"
        ),
        getAllReels: db.prepare("SELECT * FROM reels"),
        getReelById: db.prepare("SELECT * FROM reels WHERE id = ?"),

        createTagged: db.prepare(
            "INSERT INTO tagged_posts (img_url, caption, who_tagged) VALUES (@img_url, @caption, @who_tagged) RETURNING *"
        ),
        getAllTagged: db.prepare("SELECT * FROM tagged_posts"),
    }

    const posts = {
        getById: (id: number) => {
            return statements.getPostById.get(id)
        },
        getAll: () => {
            return statements.getAllPosts.all()
        },
        create: (data: PostCreationInput) => {
            return statements.createPost.get(data)
        },
    }

    const reels = {
        create: (data: ReelCreationInput) => {
            return statements.createReel.get(data)
        },
        getAll: () => {
            const allReels = statements.getAllReels.all()
            console.log("DATABASE TRANSACTION: Raw reels from DB:", allReels)
            return statements.getAllReels.all()
        },
    }

    const tagged_posts = {
        create: (data: {
            img_url: string
            caption: string
            who_tagged: string
        }) => {
            return statements.createTagged.get(data)
        },
        getAll: () => {
            const allTagged = statements.getAllTagged.all()
            console.log("DATABASE TRANSACTION: Raw tagged from DB:", allTagged)
            return statements.getAllTagged.all()
        },
    }

    return {
        posts,
        reels,
        tagged_posts,
    }
}

export type TransactionHelpers = ReturnType<typeof createTransactionHelpers>
