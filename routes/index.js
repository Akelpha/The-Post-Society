import { Router } from "express";
var router = Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "The Post Society" });
});

export default router;
