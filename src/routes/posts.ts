import { Router } from "express";
import prisma from "@prisma/prisma.js";
import { createPost } from "src/controllers/postController";
import { showPosts } from "src/controllers/postController";
var router = Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

// Get post page
router.get('/feed', showPosts)

// Create post
router.post(`/post`, createPost)
// Update post
router.put('/publish/:id', async (req, res) => {
  const { id } = req.params
  const post = await prisma.post.update({
    where: { id: Number(id) },
    data: { published: true },
  })
  res.json(post)
})
// Delete post
router.delete(`/post/:id`, async (req, res) => {
  const { id } = req.params
  const post = await prisma.post.delete({
    where: {
      id: Number(id),
    },
  })
  res.json(post)
})
export default router;
