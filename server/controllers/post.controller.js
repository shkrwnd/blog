const Post = require('../models/post.model');
const Joi = require('joi');
const httpError = require('http-errors');

const postSchema = Joi.object({
    text: Joi.string().required(),
    authUser: Joi.object()
  })


async function index(queryParams) {
    let limit = queryParams.limit;
    let page = queryParams.page;
    let posts = await Post.paginate({}, {page: page, limit: limit});
    return posts;
}  

async function create(post) {
    post = await Joi.validate(post, postSchema, {abortEarly: false});
    return await new Post({text: post.text, user_id: post.authUser._id}).save();
}

async function show(postId, authUser) {
    let post =  await Post.findOne({_id: postId});
    if(!(post instanceof Post)) {
        return new httpError(404);
    }
    return post;
}

async function update(postId, postData, authUser) {
    postData = await Joi.validate(postData, postSchema, {abortEarly: false});
    let post =  await Post.findOne({_id: postId, user_id: authUser._id});
    if(!(post instanceof Post)){
        return new httpError(404);
    }

    post.text = postData.text;
    let response = await post.save();
    return post;
}   

async function destroy(postId, authUser) {

    let post = await Post.findOne({_id: postId, user_id: authUser._id});
    if(!(post instanceof Post)) {
        return new httpError(404);
    }
    let response = await post.remove();
    return post;
}

module.exports = {
    create, 
    index, 
    show,
    update, 
    destroy
};
