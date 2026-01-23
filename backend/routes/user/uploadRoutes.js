import express from "express";
import upload from "../../middleware/uploadMiddleware.js";
import {
  uploadProfilePicture,
  uploadEventImage,
} from "../../controllers/user/uploadController.js";

const router = express.Router();

// Route to upload profile picture
router.post(
  "/upload/profile-picture",
  upload.single("profilePicture"),
  uploadProfilePicture
);

// Route to upload event image
router.post(
  "/upload/event-image",
  upload.single("eventImage"),
  uploadEventImage
);

export default router;