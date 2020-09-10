const express = require('express');
const asyncHandler = require('express-async-handler')
const passport = require('passport');
const userCtrl = require('../controllers/user.controller');
const authCtrl = require('../controllers/auth.controller');
const postCtrl = require('../controllers/post.controller');
const config = require('../config/config');
const httpError = require('http-errors');
const commentRoutes = require('./comment.routes');

const router = express.Router();
module.exports = router;


router.get('/' , index );
router.post('/' , passport.authenticate('jwt', {session: false}), create );
router.get('/:postId/' , passport.authenticate('jwt', {session: false}), show );
router.patch('/:postId' , passport.authenticate('jwt', {session: false}), update );
router.delete('/:postId' , passport.authenticate('jwt', {session: false}), destroy );

router.use('/:postId/comments', commentRoutes);


async function index(req, res) {
    let posts = await postCtrl.index(req.query);
    res.json({data: posts});
}

async function create(req, res) {
    let authUser = req.user;
    req.body.authUser = authUser;
    let post = await postCtrl.create(req.body);
    res.json(post);
}

async function show(req, res) {
    let postId = req.params.postId;
    let post = await postCtrl.show(postId, req.user);
    res.json(post);
}

async function update(req, res) {
    let postId = req.params.postId;
    let post = await postCtrl.update(postId , req.body, req.user);
    res.json(post);
}

async function destroy(req, res) {
    let postId = req.params.postId;
    let post = await postCtrl.destroy(postId, req.user);
    // console.log(post);
    res.json(post);
} 

