const Joi = require("joi"); // TODO : ADD HTML-SANITIZE TO THIS

module.exports.blogSchema = Joi.object({
  title: Joi.string().required(),
  titleImage: Joi.string(),
  content: Joi.string().required(),
  likes: Joi.number(),
  author: Joi.string(),
  comments: Joi.array(),
  token: Joi.string().required(),
});

module.exports.commentSchema = Joi.object({
  content: Joi.string().required(),
  token: Joi.string().required(),
});
