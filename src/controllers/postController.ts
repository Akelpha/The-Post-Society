import { PrismaClient } from '../generated/prisma'
// import { Request, Response } from "express";
// import { Post } from "../generated/prisma/models/Post";
const prisma = new PrismaClient();

export const createPost = async (req: any, res: any) => {
    const { title, content, imageUrl } = req.body
    try {
        const post = await prisma.post.create({
            data: {
                title,
                content,
                imageUrl,
            }
        })
        res.json(post)
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}
export const showPosts = async (res: any) => {
    try {
        const posts = await prisma.post.findMany({
            include: { author: true },
            orderBy: { created_at: 'desc' }
        })
        res.render('home', { posts });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}
