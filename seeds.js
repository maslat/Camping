const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment")

const seeds = [
    {
        name: "Vancouver Camp",
        image:"https://farm9.staticflickr.com/8605/16573646931_22fc928bf9_o.jpg",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean egestas neque non justo imperdiet, vitae sodales erat vestibulum. Donec tempus nibh in vestibulum aliquet. Nulla vestibulum ligula ut odio molestie, id gravida ipsum sagittis. Vestibulum tempus nulla id lectus accumsan, et ullamcorper nisl fermentum."
    },
    {
        name: "Cloud's Peak",
        image:"https://q-cf.bstatic.com/xdata/images/hotel/max500/215916788.jpg?k=fdeb2e2063e4629f8aeadbcc92ef7696d54b368923576265096990eba57de8ce&o=",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean egestas neque non justo imperdiet, vitae sodales erat vestibulum. Donec tempus nibh in vestibulum aliquet. Nulla vestibulum ligula ut odio molestie, id gravida ipsum sagittis. Vestibulum tempus nulla id lectus accumsan, et ullamcorper nisl fermentum."
    },
    {
        name: "Canyon Floor",
        image:"https://www.nps.gov/shen/planyourvisit/images/20170712_A7A9022_nl_Campsites_BMCG_960.jpg?maxwidth=1200&maxheight=1200&autorotate=false",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean egestas neque non justo imperdiet, vitae sodales erat vestibulum. Donec tempus nibh in vestibulum aliquet. Nulla vestibulum ligula ut odio molestie, id gravida ipsum sagittis. Vestibulum tempus nulla id lectus accumsan, et ullamcorper nisl fermentum."
    }
]

async function seedDB() {
    try {
        // Remove Campground
        await Campground.deleteMany({});
        console.log("Campground removed");

        //Remove Comment
        await Comment.deleteMany({});
        console.log("Comment removed");

        // for(const seed of seeds) {
        //     //Create campground
        //     let campground = await Campground.create(seed);
        //     console.log("Campground created");

        //     //Create comment
        //     let comment = await Comment.create({
        //         text:"Vivamus tempus sodales lobortis. Nunc vulputate hendrerit sem at eleifend. Nunc a tincidunt purus. Curabitur egestas gravida lectus et eleifend.",
        //         author:"J. Haley"
        //     });
        //     console.log("Comment created");

        //     //Add Comment
        //     campground.comments.push(comment);
        //     campground.save();
        //     console.log("Added comment to campground");
        // }
    } catch (err) {
        console.log(err);
    }
}
module.exports = seedDB;