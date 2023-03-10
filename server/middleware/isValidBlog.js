const { blogSchema } = require("../schemas");

const validateBlog = (req, res, next) => {
  try {
    const { error } = blogSchema.validate(req.body);
    if (error) {
      console.log(error);
      throw new Error("Invalid schema");
    } else {
      next();
    }
  } catch (e) {
    // console.log(e);
    return res.status(405).send({status: 'error', msg: "Invalid Blog Schema"});
  }
};

module.exports = validateBlog;
