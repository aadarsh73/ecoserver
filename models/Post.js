const mongoose = require("mongoose");

const postsSchema = {
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        data: Buffer,
        contentType: String
    }
};

const Post = mongoose.model("Post", postsSchema);
module.exports = Post;