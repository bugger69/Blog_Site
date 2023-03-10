const { commentSchema } = require("../schemas");

const validateComment = (req, res, next) => {
  try {
    const { error } = commentSchema.validate(req.body);
    if (error) {
      console.log(error);
      throw new Error("Invalid schema");
    } else {
      next();
    }
  } catch (e) {
    return res.status(405).send({ status: "error", msg: "Invalid Comment Schema" });
  }
};

module.exports = validateComment;
