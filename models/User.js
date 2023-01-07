const mongoose = require("mongoose");

const usersSchema = {
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    count: {
        type: Number,
    }
};

const Post = mongoose.model("Post", postsSchema);
module.exports = Post;