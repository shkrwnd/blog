const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const CommentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true,
    },
    meta: {
        parentType: {
            type: String,
            enum: ['post', 'comment'],
        },
        id:
        {
            type: mongoose.Types.ObjectId,
            required: false
        },

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

CommentSchema.plugin(mongoosePaginate);


module.exports = mongoose.model('Comment', CommentSchema);
