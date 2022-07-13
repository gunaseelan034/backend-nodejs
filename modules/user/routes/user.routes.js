const express = require("express");
const router = express.Router();
const controller = require("../controller/user.contrl");
const multer = require("multer");
const path = require("path");

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./Images");
  },
  filename: (req, res, cb) => {
    cb(null, new Date().now() + path.extname(file.originalname));
  },
});
const imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 1000000, // 1000000 Bytes = 1 MB
  },
  fileFilter(req, file, cb) {
    const fileType = /jpeg|jpg|png|gif/;
    const mimeType = fileType.test(file.mimetype);
    const extname = fileType.test(path.extname(file.originalname));
    if (mimeType && extname) {
      cb(null, true);
    }
  },
});

// post
router.post("/create", imageUpload.single("adhar_card"), controller.createUser);

//get
router.get("/get", controller.getUser);
router.get("/getbyid/:id", controller.getUserById);
router.get("/getstudent/:filter", controller.getSuggestionStudent);

//update status
router.put("/updatestatus", controller.updateapplicationStatus);

module.exports = router;
