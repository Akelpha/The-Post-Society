import { Router } from "express";
import prisma from "@prisma/prisma.js";
var router = Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});
export default router;
