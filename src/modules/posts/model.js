const { fetch, fetchALL } = require("../../lib/postgres");

const POSTS = `
    SELECT
        *, to_char(post_create_date, 'HH24:MI/DD.MM.YYYY')
    FROM
        posts
    ORDER BY
        post_id DESC;
`;

const POSTS_BY_ID = `
    SELECT
        *, to_char(post_create_date, 'HH24:MI/DD.MM.YYYY')
    FROM
        posts
    WHERE
        post_id = $1
    ORDER BY
        post_id DESC;
`;

const POSTS_BY_CATEGORY_ID = `
    SELECT
        *, to_char(post_create_date, 'HH24:MI/DD.MM.YYYY')
    FROM
        posts
    WHERE
        category_id = $1
    ORDER BY
        post_id DESC;
`;

const POSTS_BY_TITLE = `
    SELECT
        *, to_char(post_create_date, 'HH24:MI/DD.MM.YYYY')
    FROM
        posts
    WHERE
        post_title LIKE $1
    ORDER BY
        post_id DESC;
`;

const POSTS_BY_APP_KEY = `
    SELECT
        p.post_id,
        p.post_title,
        p.post_desc,
        p.post_img,
        p.post_img_name,
        p.like_count,
        p.dislike_count,
        p.view_count,
        to_char(p.post_create_date, 'HH24:MI/DD.MM.YYYY')
    FROM
        posts p
    INNER JOIN 
        categories c
    ON 
        c.category_id = p.category_id
    WHERE
        c.app_key = $1
    ORDER BY
        p.post_id DESC
   LIMIT 100;
`;

const ADD_POST = `
    INSERT INTO
        posts (
            post_title,
            post_desc,
            post_img,
            post_img_name,
            category_id
        )
    VALUES  
        (
            $1,
            $2,
            $3,
            $4,
            $5
    ) RETURNING *;
`

const UPADATE_POST = `
    UPDATE
        posts
    SET
        post_title = $2,
        post_desc = $3,
        post_img = $4,
        post_img_name = $5,
        category_id = $6
    WHERE
        post_id = $1 RETURNING * ;
`;

const DELETE_POST = `
    DELETE FROM
        posts
    WHERE
        post_id = $1
    RETURNING *;
`

const UPDATE_LIKE_COUNT = `
    UPDATE
        posts
    SET
        like_count = $2,
    WHERE
        post_id = $1 RETURNING * ;
`;

const UPDATE_DISLIKE_COUNT = `
    UPDATE
        posts
    SET
        dislike_count = $2,
    WHERE
        post_id = $1 RETURNING * ;
`;

const UPDATE_VIEW_COUNT = `
    UPDATE
        posts
    SET
        view_count = $2,
    WHERE
        post_id = $1 RETURNING * ;
`;

const POSTS_LIMIT_NEXT = `
    SELECT
        p.post_id,
        p.post_title,
        p.post_desc,
        p.post_img,
        p.post_img_name,
        p.like_count,
        p.dislike_count,
        p.view_count,
        to_char(p.post_create_date, 'HH24:MI/DD.MM.YYYY')
    FROM
        posts p
    INNER JOIN 
        categories c
    ON 
        c.category_id = p.category_id
    WHERE
        c.app_key = $1 and p.post_id < $2
    ORDER BY
        p.post_id DESC
   LIMIT 100;
`;

const POSTS_LIMIT_PREV = `
    SELECT
        p.post_id,
        p.post_title,
        p.post_desc,
        p.post_img,
        p.post_img_name,
        p.like_count,
        p.dislike_count,
        p.view_count,
        to_char(p.post_create_date, 'HH24:MI/DD.MM.YYYY')
    FROM
        posts p
    INNER JOIN 
        categories c
    ON 
        c.category_id = p.category_id
    WHERE
        c.app_key = $1 and p.post_id > $2
    ORDER BY
        p.post_id DESC
    LIMIT 100;
`;

const getpostsByCategortId = (categoryId) => fetchALL(POSTS_BY_CATEGORY_ID, categoryId)
const getpostsById = (id) => fetch(POSTS_BY_ID, id)
const getpostsByTitle = (title) => fetchALL(POSTS_BY_TITLE, title)
const getpostsByAppKey = (key) => fetchALL(POSTS_BY_APP_KEY, key)
const getAllPosts = () => fetchALL(POSTS)
const addPost = (title, desc, image_url, image_name, categoryId) => fetch(ADD_POST, title, desc, image_url, image_name, categoryId)
const updatePost = (id, title, desc, image_url, image_name, categoryId) => fetch(UPADATE_POST, id, title, desc, image_url, image_name, categoryId)
const deletePost = (id) => fetch(DELETE_POST, id)
const updateLike = (id, count) => fetch(UPDATE_LIKE_COUNT, id, count)
const updateDisike = (id, count) => fetch(UPDATE_DISLIKE_COUNT, id, count)
const updateView = (id, count) => fetch(UPDATE_VIEW_COUNT, id, count)
const getpostsByLimitNext = (key, id) => fetchALL(POSTS_LIMIT_NEXT, key, id)
const getpostsByLimitPrev = (key, id) => fetchALL(POSTS_LIMIT_PREV, key, id)

module.exports = {
    getpostsByCategortId,
    getpostsById,
    getpostsByTitle,
    getpostsByAppKey,
    getAllPosts,
    addPost,
    updatePost,
    deletePost,
    updateLike,
    updateDisike,
    updateView,
    getpostsByLimitNext,
    getpostsByLimitPrev
}