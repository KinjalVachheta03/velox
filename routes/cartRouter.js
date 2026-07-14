const express = require("express");
const router = express.Router();

const isLoggedIn = require("../middlewares/isLoggedIn");
const cartController = require("../controllers/cartController");

// ===================== View Cart =====================
router.get("/", isLoggedIn, cartController.viewCart);

// ===================== Add To Cart =====================
router.post("/add/:productId", isLoggedIn, cartController.addToCart);

// ===================== increaseQuantity =====================
router.post("/increase/:productId", isLoggedIn, cartController.increaseQuantity);

// ===================== decreaseQuantity =====================
router.post("/decrease/:productId", isLoggedIn, cartController.decreaseQuantity);

// ===================== removeProduct =====================
router.post("/remove/:productId", isLoggedIn, cartController.removeProduct);

module.exports = router;