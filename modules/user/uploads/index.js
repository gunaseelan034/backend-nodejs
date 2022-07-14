const multer = require("multer");
const path = require("path");

const uploadApplicantPhoto = () => {
  const imageStorage = multer.diskStorage({
    // Destination to store image
    destination: "./public/image",
    filename: (req, file, cb) => {
      cb(
        null,
        file.fieldname + "_" + Date.now() + path.extname(file.originalname)
      );
    },
  });

  const upload = multer({
    storage: imageStorage,
  }).fields([
    {
      name: "applicant_photo",
      maxCount: 1,
    },
    {
      name: "adhar_photo",
      maxCount: 1,
    },
    {
      name: "age_proof",
      maxCount: 1,
    },
    {
      name: "father_photo",
      maxCount: 1,
    },
    {
      name: "mother_photo",
      maxCount: 1,
    },
  ]);
  return upload;
};

module.exports = { uploadApplicantPhoto };
