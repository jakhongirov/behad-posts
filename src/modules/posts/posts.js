const model = require('./model');
const path = require('path')
const FS = require('../../lib/fs')

module.exports = {
    GET_POSTS: async (req, res) => {
        try {
            const { categoryId, title, id } = req.query

            if (categoryId) {
                const postsByCategortId = await model.getpostsByCategortId(categoryId)

                if (postsByCategortId) {
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: postsByCategortId
                    })
                } else {
                    return res.json({
                        status: 404,
                        message: "Not found"
                    })
                }

            } else if (id) {
                const postsById = await model.getpostsById(id)

                if (postsById) {
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: postsById
                    })
                } else {
                    return res.json({
                        status: 404,
                        message: "Not found"
                    })
                }
            } else if (title) {
                const postsByTitle = await model.getpostsByTitle(`%${title}%`)

                if (postsByTitle) {
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: postsByTitle
                    })
                } else {
                    return res.json({
                        status: 404,
                        message: "Not found"
                    })
                }
            } else {
                const allPosts = await model.getAllPosts()

                return res.json({
                    status: 200,
                    message: "Success",
                    data: allPosts
                })
            }

        } catch (error) {
            console.log(error);
            res.json({
                status: 500,
                message: "Internal Server Error"
            })
        }
    },

    ADD_POST: async (req, res) => {
        try {
            const uploadPhoto = req.file;
            const { categoryId, title, desc } = req.body
            const image_name = uploadPhoto.filename;
            const image_url = `https://posts.behad.uz/public/images/${uploadPhoto.filename}`;

            const addPost = await model.addPost(title, desc, image_url, image_name, categoryId)

            if (addPost) {
                return res.json({
                    status: 200,
                    message: "Success",
                    data: addPost
                })
            } else {
                return res.json({
                    status: 400,
                    message: "Bad request"
                })
            }

        } catch (error) {
            console.log(error);
            res.json({
                status: 500,
                message: "Internal Server Error"
            })
        }
    },

    PUT_POST: async (req, res) => {
        try {
            const uploadPhoto = req.file;
            const { id, categoryId, title, desc } = req.body
            const postsById = await model.getpostsById(id)

            let image_name = "";
            let image_url = "";

            if (postsById) {
                const deleteOldLogo = new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'images', `${postsById?.post_img_name}`))

                if (uploadPhoto) {
                    deleteOldLogo.delete()
                    image_name = uploadPhoto.filename
                    image_url = `https://posts.behad.uz/public/images/${uploadPhoto.filename}`
                } else {
                    image_url = postsById?.post_img
                    image_name = postsById?.post_img_name
                }

                const updatePost = await model.updatePost(id, title, desc, image_url, image_name, categoryId,)

                if (updatePost) {
                    return res.json({
                        status: 200,
                        message: "Success"
                    })
                } else {
                    return res.json({
                        status: 400,
                        message: "Bad request"
                    })
                }
            } else {
                return res.json({
                    status: 404,
                    message: "Not found"
                })
            }

        } catch (error) {
            console.log(error);
            res.json({
                status: 500,
                message: "Internal Server Error"
            })
        }
    },

    DELETE_POST: async (req, res) => {
        try {
            const { id } = req.body
            const postsById = await model.getpostsById(id)
            const deleteOldLogo = new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'images', `${postsById?.post_img_name}`))
            const deletePost = await model.deletePost(id)

            if (deletePost) {
                deleteOldLogo.delete()
                return res.json({
                    status: 200,
                    message: "Success"
                })
            } else {
                return res.json({
                    status: 400,
                    message: "Baq request"
                })
            }
        } catch (error) {
            console.log(error);
            res.json({
                status: 500,
                message: "Internal Server Error"
            })
        }
    },

    UPDATE_COUNT: async (req, res) => {
        try {
            const { url } = req.params

            if (url == "like") {
                const { id } = req.body
                const postsById = await model.getpostsById(id)

                if (postsById) {
                    let count = ++postsById.like_count
                    const updateLike = await model.updateLike(id, count)

                    if (updateLike) {
                        res.json({
                            status: 200,
                            message: "Success"
                        })
                    } else {
                        return res.json({
                            status: 400,
                            message: "Bad request"
                        })
                    }
                } else {
                    return res.json({
                        status: 404,
                        message: "Not found"
                    })
                }
            } else if (url == "dislike") {
                const { id } = req.body
                const postsById = await model.getpostsById(id)

                if (postsById) {
                    let count = ++postsById.dislike_count
                    const updateDisike = await model.updateDisike(id, count)

                    if (updateDisike) {
                        res.json({
                            status: 200,
                            message: "Success"
                        })
                    } else {
                        return res.json({
                            status: 400,
                            message: "Bad request"
                        })
                    }
                } else {
                    return res.json({
                        status: 404,
                        message: "Not found"
                    })
                }

            } else if (url == "view") {
                const { id } = req.body
                const postsById = await model.getpostsById(id)

                if (postsById) {
                    let count = ++postsById.view_count
                    const updateView = await model.updateView(id, count)

                    if (updateView) {
                        res.json({
                            status: 200,
                            message: "Success"
                        })
                    } else {
                        return res.json({
                            status: 400,
                            message: "Bad request"
                        })
                    }
                } else {
                    return res.json({
                        status: 404,
                        message: "Not found"
                    })
                }
            } else {
                return res.json({
                    status: 400,
                    message: "Bad request"
                })
            }

        } catch (error) {
            console.log(error);
            res.json({
                status: 500,
                message: "Internal Server Error"
            })
        }
    }
}