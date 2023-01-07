const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const multer = require('multer');
const cors = require('cors');
const axios = require('axios');
const app = express();
const FormData = require('form-data');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const PostModel = require("./models/Post");
const CityModel = require("./models/Cities");
const UserModel = require("./models/User");
const fs = require('fs');
require('dotenv').config();
app.use(cors());
const storage = multer.diskStorage({
    //destination for files
    destination: function (request, file, callback) {
      callback(null, './uploads/images');
    },
  
    //add back the extension
    filename: function (request, file, callback) {
      callback(null, Date.now() + file.originalname);
    },
  });
  
  //upload parameters for multer
  const upload = multer({storage})

app.use(express.json());
const mongo_url = "mongodb://localhost/crudblog";
mongoose.connect(
    mongo_url, 
    {
        useNewUrlParser: true,
    }
);



app.post("/upload", upload.single("image"), async(request, response) => {
  const title = request.body.title;
  const file = request.file;
  const description = request.body.description;

  const post = new PostModel({
    title: title,
    description: description, 
    image: {
      data: file.filename,
      contentType: 'image/png'
    }
  });
  try{
    await post.save();
    console.log("Successfully uploaded image and text.");
  } catch(err){
    console.log(err);
  }

  
  
  // Save the text and image to a database or filesystem here
  response.json({ message: "Successfully uploaded image and text." });
});

app.get('/read', async (req, res) => {
    PostModel.find({}, (err,result)=>{
        if (err) {
            res.send(err);
        }

        res.send(result);
    });    
});

// app.put("/update",async(req, res)=>{
//     const newFoodName = req.body.newFoodName;
//     const id = req.body.id;

//     try{
//         await FoodModel.findById(id, (err, updatedFood)=>{
//             updatedFood.foodName = newFoodName;
//             updatedFood.save();
//             res.send("update")
//         });
//     } catch(err){
//         console.log(err);
//     }
// });

// app.delete("/delete/:id", async(req, res)=>{
//     const id = req.params.id;
//     await FoodModel.findByIdAndRemove(id).exec();
//     res.send('deleted');
// });

app.listen(5000, () => {
    console.log("Server running on port 5000.");
});