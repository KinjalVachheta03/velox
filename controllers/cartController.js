const cartModel = require("../models/cart-model");

// ======================= View Cart =======================
exports.viewCart = async (req, res) => {
    try {

        const cart = await cartModel
            .findOne({ user: req.user._id })
            .populate("products.productId");

        let subtotal = 0;

        if (cart) {
            cart.products.forEach(item => {
                subtotal += item.productId.price * item.quantity;
            });
        }

        res.render("cart", {
            cart,
            subtotal
        });

    } catch (err) {
        console.log(err);
        res.redirect("/shop");
    }
};


// ======================= Add To Cart =======================
exports.addToCart = async (req, res) => {
    try {

        const userId = req.user._id;
        const productId = req.params.productId;

        // Find user's cart
        let cart = await cartModel.findOne({ user: userId });

        // Create cart if it doesn't exist
        if (!cart) {
            cart = await cartModel.create({
                user: userId,
                products: []
            });
        }

        // Check if product already exists
        const existingProduct = cart.products.find(
            item => item.productId.toString() === productId
        );

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.products.push({
                productId,
                quantity: 1
            });
        }

        await cart.save();

        req.flash("success", "Product added to cart");
        res.redirect("/cart");

    } catch (err) {
        console.log(err);
        req.flash("error", "Something went wrong");
        res.redirect("/shop");
    }
};



// ======================= Increase Quantity =======================
exports.increaseQuantity = async (req, res) => {
    try {

        const userId = req.user._id;
        const productId = req.params.productId;

        const cart = await cartModel.findOne({ user: userId });

        const product = cart.products.find(
            item => item.productId.toString() === productId
        );

        if (product) {
            product.quantity += 1;
        }

        await cart.save();

        res.redirect("/cart");

    } catch (err) {
        console.log(err);
        res.redirect("/cart");
    }
};


// ======================= Decrease Quantity =======================
exports.decreaseQuantity = async (req, res) => {
    try {

        const userId = req.user._id;
        const productId = req.params.productId;

        const cart = await cartModel.findOne({ user: userId });

        const product = cart.products.find(
            item => item.productId.toString() === productId
        );

        if (product && product.quantity > 1) {
            product.quantity -= 1;
        }

        await cart.save();

        res.redirect("/cart");

    } catch (err) {
        console.log(err);
        res.redirect("/cart");
    }
};

// ======================= Remove Product =======================
exports.removeProduct = async (req, res) => {
    try {

        const userId = req.user._id;
        const productId = req.params.productId;

        const cart = await cartModel.findOne({ user: userId });

        cart.products = cart.products.filter(
            item => item.productId.toString() !== productId
        );

        await cart.save();

        req.flash("success", "Product removed successfully");

        res.redirect("/cart");

    } catch (err) {
        console.log(err);
        res.redirect("/cart");
    }
};