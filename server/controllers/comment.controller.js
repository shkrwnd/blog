const Comment = require('../models/comment.model');
const Joi = require('joi');
const httpError = require('http-errors');
const constants = require('../config/constants');
const Post = require('../models/post.model');
const mongoose = require('mongoose');

const commentSchema = Joi.object({
    text: Joi.string().required(),
    authUser: Joi.object(),
    meta: {
        parentType: Joi.string(),
        id: Joi.string()
    }
})


async function index(queryParams, postId) {
    let limit = queryParams.limit ? queryParams.limit : constants.limit  ;
    let page = queryParams.page ? queryParams.page : 1;

    let post = await Post.findOne({_id: postId});
    if(!(post instanceof Post)) {
        return new httpError(404);
    }

    let comments = await Comment.paginate({meta: {parentType: "post", id: mongoose.Types.ObjectId(postId)}}, {page: page, limit: limit});
    return comments;
}

async function create(commentBody, postId,  authUser) {
    commentBody = await Joi.validate(commentBody, commentSchema, {abortEarly: false});
    commentBody.user_id = mongoose.Types.ObjectId(authUser._id);

    let post = await Post.findOne({_id: postId});
    if(!(post instanceof Post)) {
        return new httpError(404);
    }
    let comment =  await new Comment(commentBody).save();
    return await comment;
}

async function show(postId, commentId, user) {

    let post = await Post.findOne({_id: postId});
    if(!(post instanceof Post)) {
        return new httpError(404);
    }

    let comment =  await Comment.findOne({_id: commentId});

    if(!(comment instanceof Comment)) {
        return new httpError(404);
    }
    return comment;
}

async function update(commentId, postId,  commentData, authUser) {

    commentData = await Joi.validate(commentData, commentSchema, {abortEarly: false});

    let post = await Post.findOne({_id: postId});
    if(!(post instanceof Post)) {
        return new httpError(404);
    }

    let comment =  await Comment.findOne({_id: commentId, user_id: authUser._id});
    if(!(comment instanceof Comment)){
        return new httpError(404);
    }

    comment.text = commentData.text;
    comment.createdAt = Date.now();

    return  await comment.save();
}

async function destroy(commentId, authUser) {

    let comment = await Comment.findOne({_id: commentId});
    console.log(comment);
    if(!(comment instanceof Comment)) {
        return new httpError(404);
    }
    let response = await comment.remove();
    return comment;
}

module.exports = {
    create,
    index,
    show,
    update,
    destroy
};
