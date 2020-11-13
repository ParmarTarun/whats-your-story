const mongoose = require("mongoose");

const StorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title for story cannot be empty"],
    unique: true,
    trim: true,
    maxlength: [40, "Title for story cannot be more than 40 characters."],
  },
  content: {
    type: String,
    required: true,
    maxlength: [200, "Story is too long, keep it shorter than 200 characters."],
  },
});

module.exports = mongoose.models.Story || mongoose.model("Story", StorySchema);
