const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        Profile_pic: [{ type: String, required: true }],

    },
    {
        varsionKey: false,
        timestamps: true,
    }
);


module.exports = model("users", userSchema)
