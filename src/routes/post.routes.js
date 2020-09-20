const express = require("express");

const uploadLocal = require("../config/upload.config.local");
const { index, store, like } = require("../controllers/post.controller");
const postValidator = require("../middlewares/post.validator")

const router = express.Router();

router.post(
  "/",
  uploadLocal.single("image"),
 postValidator,
  store
);
router.get("/", index);
router.put("/:id/like", like);

module.exports = router;
