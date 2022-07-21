const express = require("express");
const router = express.Router();
const controller = require("../controller/user.contrl");
const { uploadApplicantPhoto } = require("../uploads");

//verify email
router.post("/verifyemail", controller.verifyEmail);

// post
router.post("/create", uploadApplicantPhoto(), controller.createUser);

//get
router.get("/get/:filters", controller.getUser);
router.get("/getbyid/:id", controller.getUserById);
router.get("/getstudent/:filter", controller.getSuggestionStudent);

//update status
router.put("/updatestatus", controller.updateapplicationStatus);
router.out('/sheduleinterview', controller.updateapplicationStatus)

module.exports = router;
