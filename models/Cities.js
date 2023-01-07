const mongoose = require("mongoose");

const citiesSchema = {
    city: {
        type: String,
        required: true,
    },
    count: {
        type: Number,
    },
};

const Post = mongoose.model("Post", postsSchema);
module.exports = Post;