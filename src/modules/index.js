const express = require("express")
const router = express.Router()
const { AUTH } = require('../middleware/auth')
const FileUpload = require('../middleware/multer')

const Categories = require('./categories/categories')
const Post = require('./posts/posts')
const Pills = require('./pills/pills')

router
    .get('/categories', Categories.GET_CATEGORIES)
    .post('/addCategory', AUTH, FileUpload.single('photo'), Categories.POST_CATEGORY)
    .put('/updateCategory', AUTH, FileUpload.single('photo'), Categories.PUT_CATEGORY)
    .delete('/deleteCategory', AUTH, Categories.DELETE_CATEGORY)

    .get('/posts', Post.GET_POSTS)
    .post('/addPost', AUTH, FileUpload.single('photo'), Post.ADD_POST)
    .put('/updatePost', AUTH, FileUpload.single('photo'), Post.PUT_POST)
    .delete('/deletePost', AUTH, Post.DELETE_POST)
    .put('updateCount', Post.UPDATE_COUNT)
    
    .get('/pills', Pills.GET)
    .post('/addPill', AUTH, Pills.POST)
    .put('/putPill', AUTH, Pills.PUT)
    .delete('/deletePill', AUTH, Pills.DELETE);

module.exports = router