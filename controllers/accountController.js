const bcrypt = require("bcrypt");
const userModel = require("../models/user-model");

exports.accountPage = async (req, res) => {
    try {

        const success = req.flash("success");
        const error = req.flash("error");

        res.render("account", {
            user: req.user,
            success,
            error
        });

    } catch (err) {
        console.log(err);
        res.redirect("/");
    }
};



// ================= Update Profile =================



exports.updateProfile = async (req, res) => {
    try {

        const { fullname, email } = req.body;

        await userModel.findByIdAndUpdate(
            req.user._id,
            {
                fullname,
                email
            }
        );

        req.flash("success", "Profile updated successfully");

        res.redirect("/account");

    } catch (err) {

        console.log(err);

        req.flash("error", "Unable to update profile");

        res.redirect("/account");

    }
};


// ================= Upload Profile Picture =================

exports.uploadPicture = async (req, res) => {
    try {

        await userModel.findByIdAndUpdate(
            req.user._id,
            {
                picture: req.file.buffer
            }
        );

        req.flash("success", "Profile picture updated successfully");

        res.redirect("/account");

    } catch (err) {

        console.log(err);

        req.flash("error", "Unable to upload picture");

        res.redirect("/account");

    }
};


// ================= Change Password =================

exports.changePassword = async (req, res) => {
    try {

        const {
            currentPassword,
            newPassword,
            confirmPassword
        } = req.body;

        if (newPassword !== confirmPassword) {
            req.flash("error", "Passwords do not match");
            return res.redirect("/account");
        }

        const user = await userModel.findById(req.user._id);

        const match = await bcrypt.compare(
            currentPassword,
            user.password
        );

        if (!match) {
            req.flash("error", "Current password is incorrect");
            return res.redirect("/account");
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;

        await user.save();

        req.flash("success", "Password updated successfully");

        res.redirect("/account");

    } catch (err) {

        console.log(err);

        req.flash("error", "Something went wrong");

        res.redirect("/account");

    }
};