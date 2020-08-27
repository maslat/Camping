const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");
const middleware = require("../middleware")

//Index - Show all campgrounds
router.get("/", (req, res) => {

    Campground.find({}, (err, allCampgrounds) => {
        if (err) {
            console.log(err);
        } else {
            res.render("campground/index",{campgrounds:allCampgrounds, currentUser: req.user, page: "campgrounds"});
        }
    })
})

//Create - add new campground to DB
router.post("/", middleware.isLoggedIn, (req, res) => {
    let name = req.body.name;
    let price = req.body.price;
    let image = req.body.image;
    let desc = req.body.desc;
    let author = {
        id: req.user._id,
        username: req.user.username
    };
    let newCampground = {name: name, price:price, image: image, description: desc, author: author};
    Campground.create(newCampground, (err, newlyCreated) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    })
})

//New - show form to create new campground
router.get("/new", middleware.isLoggedIn, (req, res) => {
    res.render("campground/new");
})

//Show - shows more info about one campground 
router.get("/:id", (req, res) => {
    Campground.findById(req.params.id).populate("comments").exec( (err, foundCampgrounds) => {
        if (err) {
            console.log(err);
        } else {
            res.render("campground/show", { campground: foundCampgrounds });
        }
    })
})

// Edit Campground Route
router.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        res.render("campground/edit", {campground: foundCampground});
    });
});

// Update Campground Route
router.put("/:id",middleware.checkCampgroundOwnership , (req, res) => {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})

//Delete Campground
router.delete("/:id", middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            res.redirect("/campgrounds")
        } else {
            res.redirect("/campgrounds")
        }
    })
});

module.exports = router;