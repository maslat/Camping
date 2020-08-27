const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user")

//Root Route
router.get("/", (req, res) => {
    res.render('landing');
});
 
// Show Register Form
router.get("/register", (req, res) => {
    res.render("register", {page: "register"});
});

// Handle Sign Up Logic
router.post("/register", (req, res) => {
    let newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            return res.render("register", {error: err.message});
        } else {
            passport.authenticate("local")(req, res, () => {
                req.flash("success", "Welcome to Yelpcamp " + user.username);
                res.redirect("/campgrounds");
            })
        }
    })
});

//Show Login Form
router.get("/login", (req, res) => {
    res.render("login", {page: "login"});
})

//Handle Login Logic
router.post("/login", passport.authenticate("local",
    {
         successRedirect: "/campgrounds",
         failureRedirect: "/login"
    }), (req, res) => {
        
    
})

//Logout Route
router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success", "Successfully Logout");
    res.redirect("/campgrounds");
})

module.exports = router;