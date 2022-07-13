const express = require("express");
const { saveAdharCard } = require("../../../multer");
const router = express.Router();
const controller = require("../controller/user.contrl");

// post
router.post("/create", saveAdharCard().single("image"), controller.createUser);

//get
router.get("/get", controller.getUser);
router.get("/getbyid/:id", controller.getUserById);
router.get("/getstudent/:filter", controller.getSuggestionStudent);

//update status
router.put("/updatestatus", controller.updateapplicationStatus);

module.exports = router;
