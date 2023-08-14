import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalName)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetpyes = /jpb|jpeg|png/;
  const extName = filetypes.test(path.extname(file.originalName).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, type);
  } else {
    cb("Images only!");
  }
}

const upload = multer({
  storage,
});

router.post("/", upload.single("image"), (req, res) => {
  res.send({ message: "Image Uploaded", image: `/${(req, file.path)}` });
});

export default router;
