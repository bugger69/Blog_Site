const express = require("express");
const mongoose = require("mongoose");

const Comment = require("../models/comment");
const Blog = require("../models/blogs");

const isLoggedIn = require("../middleware/isLoggedIn");
const isCommentOwner = require("../middleware/isCommentOwner");
const isValidComment = require("../middleware/isValidComment");

const router = express.Router();

router.post("/:blogID", isLoggedIn, isValidComment, async (req, res, next) => {
  const blogID = req.params.blogID;
  const user = req.user;
  const author = user.uid;
  const { content } = req.body;
  await Blog.findById(blogID)
    .then(async (blog) => {
      const comment = new Comment({ content: content, author: author });
      blog.comments.push(comment);
      await comment.save();
      await blog.save();
      res.status(200).send({ msg: "comment added" });
    })
    .catch((e) =>
      res.status(400).json({ msg: "Unable to add blog.", error: true })
    );
});

router.put(
  "/:blogID/:cID",
  isLoggedIn,
  isCommentOwner,
  isValidComment,
  async (req, res, next) => {
    const { content } = req.body;
    const { cID } = req.params;
    await Comment.findByIdAndUpdate(cID, { content: content })
      .then((comment) => {
        res.status(200).send({ msg: "comment updated" });
      })
      .catch((e) => {
        console.log(e);
        res.status(400).send({ msg: "unable to update" });
      });
  }
);

router.delete(
  "/:blogID/:cID",
  isLoggedIn,
  isCommentOwner,
  async (req, res, next) => {
    const { blogID, cID } = req.params;
    await Blog.findByIdAndUpdate(blogID, {
      $pull: { comments: mongoose.Types.ObjectId(cID) },
    })
      .then(async (blog) => {
        console.log(blog);
        await blog.save();
        return await Comment.findByIdAndDelete(cID);
      })
      .then((comment) => {
        res.status(200).send({ msg: "comment deleted" });
      })
      .catch((e) => {
        console.log(e);
        res.status(400).send({ msg: "Unable to delete" });
      });
  }
);

module.exports = router;
