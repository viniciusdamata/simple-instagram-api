const multer = require("multer");
const path = require("path");
const storage = multer.memoryStorage()
const upload = multer({
    storage:  storage
    // new multer.diskStorage({
    //     destination:path.resolve(__dirname, "..", "..", "uploads"),
    //     filename:function(req, file, cb){
    //         cb(null, file.originalname)
    //     }
    // })
});
module.exports = upload;