// const jwt = require("jsonwebtoken");
// const userModel = require("../models/user-model");

// module.exports = async function (req, res, next) {
//   if (!req.cookies.token) {
//     req.flash("error", "you need to login first");
//     return res.redirect("/");
//   }

//   try {
//     let decoded =  jwt.verify(req.cookies.token, process.env.JWT_KEY);
//     let user =  await userModel
//       .findOne({ email: decoded.email })
//       .select("-password");
//     req.user = user;
//     next();
//   } catch (err) {
//     req.flash("error", "something went wrong.");
//     res.redirect("/");
//   }
// };

const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

module.exports = async (req, res, next) => {
    try {

        const token = req.cookies.token;

        if (!token) {
            res.locals.user = null;
            return next();
        }

        const decoded = jwt.verify(token, process.env.JWT_KEY);

        const user = await userModel.findById(decoded.id).select("-password");

        req.user = user;
        res.locals.user = user;

        next();

    } catch (err) {

        res.locals.user = null;
        next();

    }
};