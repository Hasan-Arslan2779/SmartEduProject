const mongoose = require('mongoose');
const { default: slugify } = require('slugify');

const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  name: {
    type: String,
    unique: true,
    require: true,
  },
  description: {
    type: String,
    trim: true,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  slug: {
    type: String,
    unique: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
});

CourseSchema.pre('save', function (next) {
  this.slug = slugify(this.name, {
    lower: true,
    strict: true,
  });
  next();
});

const Course = mongoose.model('Course', CourseSchema);
module.exports = Course;
