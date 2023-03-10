const Comment = require("../models/comment");

const isCommentOwner = async (req, res, next) => {
  try {
    const { cID } = req.params;
    const user = req.user;
    const comment = await Comment.findById(cID);
    if (comment.author.toString() === user.uid) {
      next();
    } else { 
        throw new Error("Owners do not match");
    }
  } catch (e) {
    return res.status(401).send({msg: "You're not the owner of the comment."});
  }
};

module.exports = isCommentOwner;
