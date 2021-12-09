const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({

    image_urls: [{ type: String, required: true }],
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true }

},
    {
        varsionKey: false,
        timestamps: true,
    }
);

module.exports = mongoose.model("gallery", gallerySchema)