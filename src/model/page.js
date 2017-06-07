const mongoose = require('mongoose');
const uniquePlugin = require('mongoose-unique-validator');

const contentGrabber = require('./../lib/content-grabber').grab;

const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

const urlValidator = { validator: (url) => urlRegex.test(url), message: '{VALUE} is not a valid URL' };
const urlRequired = [true, 'field is required'];

const LinkSchema = new mongoose.Schema({
  text: String,
  href: String
})

const PageContentSchema = new mongoose.Schema({
  h1: String,
  h3: [String],
  a : [LinkSchema]
})

const PageSchema = new mongoose.Schema({
  url    : { type: String, unique: true, required: urlRequired, validate: urlValidator },
  content: { type: PageContentSchema }
}, { versionKey: false });

const pageGrabContent = (page, next) => {
  contentGrabber(page.url)((err, content) => {
    if (err) {
      next(new Error('content couldn\'t be grabbed'));
    } else {
      page.content = content;
      next();
    }
  })
};

PageSchema.plugin(uniquePlugin);
PageSchema.post('validate', pageGrabContent)

module.exports = mongoose.model('Page', PageSchema);