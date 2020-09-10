const express = require('express');
const asyncHandler = require('express-async-handler');
const passport = require('passport');
const userCtrl = require('../controllers/user.controller');
const authCtrl = require('../controllers/auth.controller');
const commentCtrl = require('../controllers/comment.controller');
const config = require('../config/config');
const httpError = require('http-errors');


const router = express.Router({mergeParams: true});
module.exports = router;



router.get('/' , index );
router.post('/' , passport.authenticate('jwt', {session: false}), create );
router.get('/:commentId' ,  show );
router.patch('/:commentId' , passport.authenticate('jwt', {session: false}), update );
router.delete('/:commentId' , passport.authenticate('jwt', {session: false}), destroy );

router.get('/' , index );
router.post('/:commentId/comments/', passport.authenticate('jwt', {session: false}), createRecursive);
router.patch('/:commentId/comments/', passport.authenticate('jwt', {session: false}), updateRecursive);
router.patch('/:commentId/comments/', passport.authenticate('jwt', {session: false}), updateRecursive);


async function index(req, res) {
    let posts = await commentCtrl.index(req.query, req.params.postId);
    res.json({data: posts});
}

async function create(req, res) {
    // console.log(req.params.postId);
    let meta = {} ;
    if(req.params.commentId) {
        meta.parentType = 'comment';
        meta.id = req.params.commentId;
    }
    else {
        meta.parentType = 'post';
        meta.id = req.params.postId;
    }

    let post = await commentCtrl.create({meta: meta, text: req.body.text }, req.params.postId, req.user);
    res.json(post);
}

async function show(req, res) {
    let postId = req.params.postId;
    let commentId = req.params.commentId;
    let post = await commentCtrl.show(postId, commentId,  req.user);
    res.json(post);
}

async function update(req, res) {
    let postId = req.params.postId;
    let commentId = req.params.commentId;
    let post = await commentCtrl.update(commentId, postId,  req.body, req.user);
    res.json(post);
}

async function destroy(req, res) {
    let postId = req.params.postId;
    let commentId = req.params.commentId;
    let post = await commentCtrl.destroy(commentId, req.user);
    res.json(post);
}


async function createRecursive(req, res) {
   let  parentComment = req.
}
