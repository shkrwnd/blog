const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const PostSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
      type: Date,
      default: Date.now
  }
}, {
  versionKey: false
});

PostSchema.plugin(mongoosePaginate);


module.exports = mongoose.model('Post', PostSchema);
