
const express = require('express');

const fs = require('fs');

const Gallery = require("../models/gallery.model");

// const User = require("../models/users.model");

const upload = require("../middleware/upload")

const router = express.Router();


router.post("/multiple", upload.array("image_urls", 5), async (req, res) => {

    const filePaths = req.files.map(file => file.path);


    try {
        // const user = await User.find({ '_id': req.body.user_id });

        // if (!user) {
        //     return res.json({ 'message': 'user not exist' });
        // }

        const gallery = await Gallery.create({
            user_id: req.body.user_id,
            image_urls: filePaths,
        });
        return res.status(201).json({ gallery });
    }
    catch (e) {
        return res.status(500).json({ status: "failed", message: e.message });
    }
});

router.get("/", async (req, res) => {

    const gallery = await Gallery.find().populate("user_id").lean().exec();


    res.send({ gallery })

})

// router.delete("/gdelete/:id", async (req, res) => {

//     // console.log(Gallery, "ldsjaofjoosndih")

//     const user = await Gallery.findByIdAndDelete(req.params.id).lean().exec()


//     // console.log(user)

//     const profile_path = user.image_urls;
//     for (var i = 0; i < profile_path.length; i++) {
//         var result = profile_path[i];
//         if (fs.existsSync(result)) {
//             fs.unlink(result, (err) => {
//                 if (err) {
//                     console.log(err);
//                 }
//                 console.log('deleted');
//             })
//         }
//     }

//     return res.send({ user })

// })

module.exports = router;