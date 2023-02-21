const model = require('./model');

module.exports = {
    GET: async (req, res) => {
        try {
            const { position, name, id } = req.query

            if (name) {
                const pillByName = await model.pillByName(`%${name}%`)

                if (pillByName) {
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: pillByName
                    })
                } else {
                    return res.json({
                        status: 400,
                        message: "Bad request"
                    })
                }

            } else if (position == 'next' && id) {
                const pillLimitNext = await model.pillLimitNext(id)

                if (pillLimitNext) {
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: pillLimitNext
                    })
                } else {
                    return res.json({
                        status: 400,
                        message: "Bad request"
                    })
                }

            } else if (position == 'prev' && id) {
                const pillLimitPrev = await model.pillLimitPrev(id)

                if (pillLimitPrev) {
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: pillLimitPrev
                    })
                } else {
                    return res.json({
                        status: 400,
                        message: "Bad request"
                    })
                }
            } else if (id) {
                const pillById = await model.pillById(id)

                if (pillById) {
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: pillById
                    })
                } else {
                    return res.json({
                        status: 404,
                        message: "Not found"
                    })
                }

            } else {
                const allPill = await model.allPill()
                const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

                console.log(ip);

                if (allPill) {
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: allPill
                    })
                } else {
                    return res.json({
                        status: 400,
                        message: "Bad request"
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

    POST: async (req, res) => {
        try {
            const { name, type, producer, instruction, ingredient, category } = req.body

            console.log(req.connection.remoteAddress.split(':').slice(-1)[0]);

            if (name && type && producer && instruction && ingredient && category) {
                const addPill = await model.addPill(name, type, producer, instruction, ingredient, category)

                if (addPill) {
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

    PUT: async (req, res) => {
        try {
            const { id, name, type, producer, instruction, ingredient, category } = req.body
            const updatePill = await model.updatePill(id, name, type, producer, instruction, ingredient, category)

            if (updatePill) {
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

    DELETE: async (req, res) => {
        try {
            const { id } = req.body

            if (id) {
                const deletePill = await model.deletePill(id)

                if (deletePill) {
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

};