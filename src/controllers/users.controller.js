// const path = require("path");

const express = require('express');

const fs = require('fs');

const User = require("../models/users.model");

const upload = require("../middleware/upload");

const Gallery = require("../models/gallery.model");
const { Mongoose } = require('mongoose');

const router = express.Router();

router.post("/", upload.single("Profile_pic"), async (req, res) => {
    try {
        const user = await User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            Profile_pic: req.file.path,
        });

        return res.status(201).json({ user });

    }
    catch (e) {

        return res.status(500).json({ status: "failed", message: e.message });
    }
});

router.get("/", async (req, res) => {

    const user = await User.find().lean().exec()

    return res.send({ user });

})

router.patch("/:id", upload.single("Profile_pic"), async (req, res) => {

    const user = await User.findById(req.params.id);

    // console.log(user);

    await fs.unlink(`${user.Profile_pic}`, (err) => {
        console.log(`${user.Profile_pic}`, 'test user.profile_pic was deleted');

        if (err) throw err;
    })
    const updateUser = await User.findByIdAndUpdate(req.params.id, {
        Profile_pic: req.file.path
    })
    res.status(201).send(updateUser);
});


router.delete("/delete/:id", async (req, res) => {

    try {

        const user = await User.findByIdAndDelete(req.params.id).lean().exec()


        // console.log(user)

        const profile_path = user && user.Profile_pic[0];


        deleteFileFromSystem(profile_path);

        // deleteGalleryImages(req.params.id);

        // const userss = await Gallery.findByIdAndDelete({ user_id: req.params.id })



        Gallery.find({ 'user_id': req.params.id }, function (err, res) {

            const allImageUrls = res[0].image_urls;

            // console.log(allImageUrls);
            // deleteimageurls(allImageUrls)
            for (var i = 0; i < allImageUrls.length; i++) {
                var result = allImageUrls[i];
                if (fs.existsSync(result)) {
                    fs.unlink(result, (err) => {
                        if (err) {
                            console.log(err);
                        }
                        console.log('deleted');
                    })
                }
            }



        })


        return res.send({ user })
    }
    catch (e) {
        return res.status(500).json({ status: "failed", message: e.message });

    }

})

// function deleteimageurls(allImageUrls) {
//     for (var i = 0; i < allImageUrls.length; i++) {
//         var result = allImageUrls[i];
//         if (fs.existsSync(result)) {
//             fs.unlink(result, (err) => {
//                 if (err) {
//                     console.log(err);
//                 }
//                 console.log('deleted');
//             })
//         }
//     }
// }



function deleteFileFromSystem(profile_path) {
    if (fs.existsSync(profile_path)) {
        fs.unlink(profile_path, (err) => {
            if (err) {
                console.log(err);
            }
            console.log('deleted');
        })
    }
}


module.exports = router;