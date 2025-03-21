const multer = require("multer");

// configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter

const fileFilter = (req, file, cb) => {
  const allowedtypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedtypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only jpeg,png and jpg are allowed"), false);
  }
};

const uploads = multer({ storage, fileFilter });
module.exports = uploads;
