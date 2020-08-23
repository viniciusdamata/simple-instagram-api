const express = require("express");

const uploadImgur = require("../config/upload.config.imgur");
const uploadLocal = require("../config/upload.config.local");
const { index, store, like, storeImgur } = require("../controllers/post.controller");

const router = express.Router();

router.post("/imgur", uploadImgur.single("image"), storeImgur);
router.post("/", uploadLocal.single("image"), store);
router.get("/", index);
router.put("/:id/like", like);

module.exports = router;
