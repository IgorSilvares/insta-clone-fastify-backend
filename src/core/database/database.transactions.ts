import type { Database } from "better-sqlite3"
import { PostCreationInput } from "src/modules/posts/posts.schema"
import { type ReelCreationInput } from "src/modules/reels/reels.schema"
import { type HighlightCreationInput } from "src/modules/highlights/highlights.schema"
import { type TaggedPostUserCreationInput } from "src/modules/tagged/tagged.schema"
import { type UserCreationInput } from "src/modules/users/users.schema"
import { type HighlightItemCreationInput } from "src/modules/highlightsItems/highlightsItemsSchema"

export const createTransactionHelpers = (db: Database) => {
    const statements = {
        // USERS
        createUser: db.prepare(
            "INSERT INTO users (username) VALUES (@username) RETURNING *"
        ),
        getAllUsers: db.prepare("SELECT * FROM users"),
        getUserById: db.prepare("SELECT * FROM users WHERE id = ?"),
        getUserByUsername: db.prepare("SELECT * FROM users WHERE username = ?"),

        // POSTS
        createPost: db.prepare(
            "INSERT INTO posts (user_id, img_url, caption) VALUES (@user_id, @img_url, @caption) RETURNING *"
        ),
        getAllPosts: db.prepare("SELECT * FROM posts"),
        getPostById: db.prepare("SELECT * FROM posts WHERE id = ?"),
        getPostByUser: db.prepare("SELECT * FROM posts WHERE user_id = ?"),

        // REELS
        createReel: db.prepare(
            "INSERT INTO reels (user_id, video_url, description, thumbnail_url) VALUES (@user_id, @video_url, @description, @thumbnail_url) RETURNING *"
        ),
        getAllReels: db.prepare("SELECT * FROM reels"),
        getReelById: db.prepare("SELECT * FROM reels WHERE id = ?"),
        getReelByUser: db.prepare("SELECT * FROM reels WHERE user_id = ?"),

        // Tagged Posts
        createTaggedPostUser: db.prepare(
            "INSERT INTO tagged_post_users (post_id, tagged_username) VALUES (@post_id, @tagged_username) RETURNING *"
        ),
        getUsersTaggedInPost: db.prepare(
            "SELECT tpu.id as tag_id, tpu.post_id, tpu.created_at, u.id as user_id, u.username FROM tagged_post_users tpu JOIN users u ON tpu.tagged_username = u.username WHERE tpu.post_id = ?"
        ),
        getPostsTaggedByUser: db.prepare(
            "SELECT tpu.id as tag_id, p.id as post_id, p.img_url, p.caption, p.created_at, p.user_id as post_owner_id FROM tagged_post_users tpu JOIN posts p ON tpu.post_id = p.id WHERE tpu.tagged_username = ?"
        ),
        getTaggedPostUserById: db.prepare(
            "SELECT * FROM tagged_post_users WHERE id = ?"
        ),

        // HIGHLIGHTS
        createHighlight: db.prepare(
            "INSERT INTO highlights (user_id, cover_img_url, title) VALUES (@user_id, @cover_img_url, @title) RETURNING *"
        ),
        getHighlightById: db.prepare("SELECT * FROM highlights WHERE id = ?"),
        getAllHighlights: db.prepare("SELECT * FROM highlights"),
        getHighlightsByUser: db.prepare(
            "SELECT * FROM highlights WHERE user_id = ?"
        ),

        // HIGHLIGHTS ITEMS
        createHighlightItem: db.prepare(
            "INSERT INTO highlight_items (highlight_id, item_type, content_url, caption) VALUES (@highlight_id, @item_type, @content_url, @caption) RETURNING *"
        ),
        getHighlightItemsByHighlightId: db.prepare(
            "SELECT * FROM highlight_items WHERE highlight_id = ? ORDER BY created_at ASC"
        ),
        getHighlightItemById: db.prepare(
            "SELECT * FROM highlight_items WHERE id = ?"
        ),
    }

    const users = {
        create: (data: UserCreationInput) => {
            return statements.createUser.get(data)
        },
        getAll: () => {
            return statements.getAllUsers.all()
        },
        getById: (id: number) => {
            return statements.getUserById.get(id)
        },
        getByUsername: (username: string) => {
            return statements.getUserByUsername.get(username)
        },
    }

    const posts = {
        getById: (id: number) => {
            return statements.getPostById.get(id)
        },
        getAll: () => {
            return statements.getAllPosts.all()
        },
        create: (data: PostCreationInput & { user_id: number }) => {
            return statements.createPost.get(data)
        },
        getByUser: (userId: number) => {
            return statements.getPostByUser.all(userId)
        },
    }

    const reels = {
        create: (data: ReelCreationInput & { user_id: number }) => {
            return statements.createReel.get(data)
        },
        getAll: () => {
            const allReels = statements.getAllReels.all()
            console.log("DATABASE TRANSACTION: Raw reels from DB:", allReels)
            return allReels
        },
        getById: (id: number) => {
            return statements.getReelById.get(id)
        },
        getByUser: (userId: number) => {
            return statements.getReelByUser.all(userId)
        },
    }

    const taggedPostUsers = {
        create: (data: TaggedPostUserCreationInput) => {
            return statements.createTaggedPostUser.get(data)
        },
        getUsersInPost: (postId: number) => {
            return statements.getUsersTaggedInPost.all(postId)
        },
        getPostsByUser: (taggedUsername: string) => {
            return statements.getPostsTaggedByUser.all(taggedUsername)
        },
        getById: (id: number) => {
            return statements.getTaggedPostUserById.get(id)
        },
    }

    const highlights = {
        create: (data: HighlightCreationInput & { user_id: number }) => {
            return statements.createHighlight.get(data)
        },
        getAll: () => {
            const allHighlights = statements.getAllHighlights.all()
            console.log(
                "DATABASE TRANSACTION: Raw highlights from DB:",
                allHighlights
            )
            return allHighlights
        },
        getById: (id: number) => {
            const highlight_data = statements.getHighlightById.get(id)
            console.log(
                "DATABASE TRANSACTION: Raw highlight from DB:",
                highlight_data
            )
            return highlight_data
        },
        getByUser: (userId: number) => {
            return statements.getHighlightsByUser.all(userId)
        },
    }

    const highlightItems = {
        create: (data: HighlightItemCreationInput) => {
            return statements.createHighlightItem.get(data)
        },
        getByHighlightId: (highlightId: number) => {
            return statements.getHighlightItemsByHighlightId.all(highlightId)
        },
        getById: (id: number) => {
            return statements.getHighlightItemById.get(id)
        },
    }

    return {
        users,
        posts,
        reels,
        taggedPostUsers,
        highlights,
        highlightItems,
    }
}

export type TransactionHelpers = ReturnType<typeof createTransactionHelpers>
