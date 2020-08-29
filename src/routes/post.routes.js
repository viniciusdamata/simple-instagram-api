const express = require("express");

const uploadLocal = require("../config/upload.config.local");
const {
  index,
  store,
  like,
} = require("../controllers/post.controller");

const router = express.Router();

router.post("/", uploadLocal.single("image"), store);
router.get("/", index);
router.put("/:id/like", like);

module.exports = router;
