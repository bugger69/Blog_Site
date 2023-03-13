const baseJoi = require("joi"); // TODO : ADD HTML-SANITIZE TO THIS
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
  type: 'string',
  base: joi.string(),
  messages: {
      'string.escapeHTML' : '{{#label}} must not include HTML!'
  },
  rules: {
      escapeHTML: {
          validate(value, helpers) {
              const clean = sanitizeHtml(value, {
                  allowedTags: [],
                  allowedAttributes: {}
              });
              if(clean !== value) return helpers.error('string.escapeHTML', { value })
              return clean;
          }
      }
  }
});

const Joi = baseJoi.extend(extension);

module.exports.blogSchema = Joi.object({
  title: Joi.string().required().escapeHTML(),
  titleImage: Joi.string().escapeHTML(),
  content: Joi.string().required().escapeHTML(),
  likes: Joi.number(),
  author: Joi.string().escapeHTML(),
  comments: Joi.array(),
  token: Joi.string().required().escapeHTML(),
});

module.exports.commentSchema = Joi.object({
  content: Joi.string().required().escapeHTML(),
  token: Joi.string().required().escapeHTML(),
});
