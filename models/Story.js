const mongoose = require("mongoose");

const StorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Story without a title is not allowed."],
    unique: [true, "Make your story title unique"],
    trim: true,
    maxlength: [40, "Title for story cannot be more than 40 characters."],
  },
  content: {
    type: String,
    required: [true, "Empty story not allowed."],
    maxlength: [200, "Story is too long, keep it shorter than 200 characters."],
  },
  public: {
    type: Boolean,
  },
});

module.exports = mongoose.models.Story || mongoose.model("Story", StorySchema);
