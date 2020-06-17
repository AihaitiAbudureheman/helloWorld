const mongoose = require('mongoose');

const Post = require("../models/Post");

module.exports = app => {
   /**
   * '/addText'   ---Route for adding text
   */
  app.post("/addText", (req, res) => {
    let newPost = new Post();
    newPost.text = req.body.text;
    newPost.save((err) => {
      if (err) {
          console.log('Error', err);
      }
      res.send({ message: "Post Added!" });
    });
  });

  /**
   * '/all'
   */
  app.get("/all", (req, res) => {
    Post.find({}, (err, posts) => {
        if (err) {
            console.log('Error', err);
          }
        res.send(posts);  
      });
  });

}
