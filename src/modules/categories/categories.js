const model = require('./model');
const path = require('path')
const FS = require('../../lib/fs')

module.exports = {
    GET_CATEGORIES: async (req, res) => {
        try {
            const { id, title, key } = req.query

            if (id) {
                const categoryByid = await model.getCategoryByid(id)

                if (categoryByid) {
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: categoryByid
                    })
                } else {
                    return res.json({
                        status: 404,
                        message: "Not found"
                    })
                }

            } else if (title) {
                const categoryBytitle = await model.getCategoryBytitle(`%${title}%`)

                if (categoryBytitle) {
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: categoryBytitle
                    })
                } else {
                    return res.json({
                        status: 404,
                        message: "Not found"
                    })
                }
            } else if (key) {
                const categoryByAppKey = await model.getCategoryByAppKey(key)

                if (categoryByAppKey) {
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: categoryByAppKey
                    })
                } else {
                    return res.json({
                        status: 404,
                        message: "Not found"
                    })
                }
            } else {
                const categories = await model.getCategories()

                if (categories) {
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: categories
                    })
                } else {
                    return res.json({
                        status: 404,
                        message: "Not found"
                    })
                }
            }

        } catch (error) {
            console.log(error);
            res.json({
                status: 500,
                message: "Internal Server Error"
            })
        }
    },

    POST_CATEGORY: async (req, res) => {
        try {
            const uploadPhoto = req.file;
            const { name, app_key } = req.body

            const image_name = uploadPhoto.filename;
            const image_url = `https://posts.behad.uz/public/images/${uploadPhoto.filename}`;

            const addCategory = model.addCategory(name, image_url, image_name, app_key)

            if (addCategory) {
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

        } catch (error) {
            console.log(error);
            res.json({
                status: 500,
                message: "Internal Server Error"
            })
        }
    },

    PUT_CATEGORY: async (req, res) => {
        try {
            const uploadPhoto = req.file;
            const { id, name, app_key } = req.body
            const categoryByid = await model.getCategoryByid(id)

            let image_name = "";
            let image_url = "";

            if (categoryByid) {
                const deleteOldLogo = await new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'images', `${categoryByid?.category_img_name}`))

                if (uploadPhoto) {
                    deleteOldLogo.delete()
                    image_name = uploadPhoto.filename
                    image_url = `https://posts.behad.uz/public/images/${uploadPhoto.filename}`
                } else {
                    image_url = categoryByid?.category_img
                    image_name = categoryByid?.category_img_name
                }

                const updateCategory = await model.updateCategory(id, name, image_name, image_url, app_key)

                if (updateCategory) {
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

    DELETE_CATEGORY: async (req, res) => {
        try {
            const { id } = req.body
            const categoryByid = await model.getCategoryByid(id)
            const deleteOldLogo = await new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'images', `${categoryByid?.category_img_name}`))
            const deleteCategory = await model.deleteCategory(id)

            if (deleteCategory) {
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
    }
}