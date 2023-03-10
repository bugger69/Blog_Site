const express = require("express");
const cloudinary = require("cloudinary").v2;
const axios = require("axios");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

const Blog = require("../models/blogs");
const isLoggedIn = require("../middleware/isLoggedIn");
const isBlogOwner = require("../middleware/isBlogOwner");
const isValidBlog = require("../middleware/isValidBlog");

const router = express.Router();

// CRUD

//CREATE

// router.get('/new', (req, res) => {
//     res.send("new blog form");
// });

router.post(
  "/",
  upload.single("titleImage"),
  isLoggedIn,
  isValidBlog,
  async (req, res) => {
    console.log(req.body);
    const { title, content } = req.body;
    if (req.file) {
      const blog = {
        title: title,
        titleImage: req.file.path,
        content: content,
        author: req.user.uid,
      };
      console.log(blog);
      await Blog.create(blog)
        .then((b) => res.status(201).json(b))
        .catch((err) =>
          res.status(400).json({ msg: "Unable to add blog.", error: { err } })
        );
    } else {
      return res.status(400).json({ msg: "Image file not recieved" });
    }
  }
);

// READ

router.get("/pages", async (req, res, next) => {
  const { pageNo = 1, limit = 10 } = req.query;
  await Blog.find({})
    .populate("author", "username")
    .sort({ createdAt: -1 })
    .skip((pageNo - 1) * limit)
    .limit(limit)
    .then((blogs) => res.status(200).json(blogs))
    .catch((e) => res.status(404).json({ msg: "No Blogs found.", err: e }));
});

// Get one blog
router.get("/:blogID", async (req, res) => {
  const { blogID } = req.params;

  // console.log(blogID);

  await Blog.findById(blogID)
    .populate("author")
    .populate("comments")
    .populate({ path: "comments", populate: { path: "author" } })
    .then(async (blog) => {
      // console.log(blog);
      try {
        return res.status(200).json({
          title: blog.title,
          ImageURL: blog.titleImage,
          content: blog.content,
          likes: blog.likes,
          comments: blog.comments,
          createdAt: blog.createdAt,
          updatedAt: blog.updatedAt,
          author: blog.author._id,
          author_username: blog.author.username,
        });
      } catch (e) {
        console.log(e);
        throw new Error("Owner not found");
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({ msg: "Blog or owner not found" });
    });
});

// Get all blogs
router.get("/", async (req, res) => {
  await Blog.find({})
    .populate("author")
    .then(async (blogs) => {
      try {
        console.log(blogs);
        return res.status(200).json(blogs);
      } catch (e) {
        throw new Error("Owner not found");
      }
    })
    .catch((err) => res.status(404).json({ msg: "No Blogs found." }));
});

//UPDATE

// router.get('/new/:blogID', (req, res) => {
//     res.send(`Form to edit blog with blogID ${req.params.blogID}`);
// });

//update one blog using blogid
router.put(
  "/:blogID",
  upload.single("titleImage"),
  isLoggedIn,
  isBlogOwner,
  isValidBlog,
  async (req, res) => {
    const { blogID } = req.params;
    const { title, titleImage, content } = req.body;
    console.log(req.body);
    const NewBlog = {};
    if (title) {
      NewBlog.title = title;
    }
    if (req.file && titleImage !== "undefined") {
      NewBlog.titleImage = req.file.path;
    }
    if (content) {
      NewBlog.content = content;
    }
    console.log(NewBlog);
    await Blog.findByIdAndUpdate(blogID, NewBlog)
      .then((blog) => res.status(200).json({ msg: "Successfully Updated." }))
      .catch((err) => {
        console.log(err);
        res.status(400).json({ msg: "Unable to update." });
      });
  }
);

//DELETE

// delete one blog using blogid
router.delete("/:blogID", isLoggedIn, isBlogOwner, async (req, res) => {
  const { blogID } = req.params;
  const blog = await Blog.findById(blogID);
  // console.log(blog);
  const imageURL = blog.titleImage;
  if (imageURL.split("/")[2].split(".")[1] === 'cloudinary') {
    const publicId = imageURL.split("/").pop().split(".").shift();
    const url = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/delete_by_token`;
    console.log(publicId);
    // await axios.post(url, {
    //   public_id: publicId,
    //   api_key: process.env.CLOUDINARY_KEY,
    //   timestamp: Date.now() / 1000 | 0,
    //   // signature: signatureHash
    // }).then((res) => {console.log(res)}).catch((e) => {console.log(e)});
    await cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) {
        console.error(error);
      } else {
        console.log(result);
        console.log(`Image ${imageURL} deleted from Cloudinary.`);
      }
    });
  }

  await Blog.findByIdAndDelete(blogID)
    .then((blog) => res.status(200).json({ msg: "Successfully Deleted." }))
    .catch((err) => {
      console.log(err);
      res.status(400).json({ msg: "Unable to update." });
    });
});

module.exports = router;
