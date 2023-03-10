const Blog = require("../models/blogs");

const isBlogOwner = async (req, res, next) => {
  try {
    const user = req.user;
    const blog = await Blog.findById({ _id: req.params.blogID });
    if (user.uid === blog.author.toString()) {
      next();
    } else {
      throw Error("Owners do not match");
    }
  } catch (e) {
    return res.status(401).send({msg: "You're not the owner of the blog"});
  }
};

module.exports = isBlogOwner;
