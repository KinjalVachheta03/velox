const express = require("express");
const router = express.Router();

const isLoggedIn = require("../middlewares/isLoggedIn");
const accountController = require("../controllers/accountController");
const upload = require("../config/multer-config");

router.get("/", isLoggedIn, accountController.accountPage);
// Update Profile
router.post("/update-profile", isLoggedIn, accountController.updateProfile );

// Upload Profile Picture
router.post("/upload-picture",isLoggedIn,upload.single("picture"),accountController.uploadPicture);

// Change Password
router.post("/change-password" , isLoggedIn , accountController.changePassword);

module.exports = router;