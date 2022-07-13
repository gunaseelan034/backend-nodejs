const multer = require("multer");
const path = require("path");

const saveAdharCard = () => {
  const imageStorage = multer.diskStorage({
    // Destination to store image
    destination: "images",
    filename: (req, file, cb) => {
      cb(
        null,
        file.fieldname + "_" + Date.now() + path.extname(file.originalname)
      );
    },
  });
  const uploadAdhar = multer({
    storage: imageStorage,
    limits: {
      fileSize: 1000000, // 1000000 Bytes = 1 MB
    },
    fileFilter(req, file, cb) {
      console.log(req, file);
      if (!file.originalname.match(/\.(png|jpg)$/)) {
        // upload only png and jpg format
        return cb(new Error("Please upload a Image"));
      }
      cb(undefined, true);
    },
  });

  return uploadAdhar;
};

module.exports = { saveAdharCard };
