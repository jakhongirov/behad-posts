const { fetch, fetchALL } = require("../../lib/postgres");

const CATEGORIES = `
    SELECT
        *, to_char(category_create_date, 'HH24:MM/MM.DD.YYYY')
    FROM
        categories
    ORDER BY
        category_id DESC;
`;

const CATEGORIES_BY_ID = `
    SELECT
        *, to_char(category_create_date, 'HH24:MM/MM.DD.YYYY')
    FROM
        categories
    WHERE
        category_id = $1
    ORDER BY
        category_id DESC;
`;

const CATEGORIES_BY_TITLE = `
    SELECT
        *, to_char(category_create_date, 'HH24:MM/MM.DD.YYYY')
    FROM
        categories
    WHERE
        category_name LIKE $1
    ORDER BY
        category_id DESC;
`;

const CATEGORIES_BY_APP_KEY = `
    SELECT
        *, to_char(category_create_date, 'HH24:MM/MM.DD.YYYY')
    FROM
        categories
    WHERE
        app_key = $1
    ORDER BY
        category_id DESC;
`;

const ADD_CATEGORY = `
    INSERT INTO
        categories (
            category_name,
            category_img,
            category_img_name,
            app_key
        )
    VALUES  
        (
            $1,
            $2,
            $3,
            $4
    ) RETURNING *;
`

const UPADATE_CATEGORY = `
    UPDATE
        categories
    SET
        category_name = $2,
        category_img = $3,
        category_img_name = $4,
        app_key = $5
    WHERE
        category_id = $1 RETURNING * ;
`;

const DELETE_CATEGORY = `
    DELETE FROM
        categories
    WHERE
        category_id = $1
    RETURNING *;
`

const CATEGORIES_BY_LIMIT_NEXT = `
    SELECT
        *, to_char(category_create_date, 'HH24:MM/MM.DD.YYYY')
    FROM
        categories
    WHERE
        app_key = $1 and category_id < $2
    ORDER BY
        category_id DESC;
`;

const CATEGORIES_BY_LIMIT_PREV = `
    SELECT
        *, to_char(category_create_date, 'HH24:MM/MM.DD.YYYY')
    FROM
        categories
    WHERE
        app_key = $1 and category_id > $2
    ORDER BY
        category_id DESC;
`;

const getCategories = () => fetchALL(CATEGORIES);
const getCategoryByid = (id) => fetch(CATEGORIES_BY_ID, id);
const getCategoryBytitle = (title) => fetchALL(CATEGORIES_BY_TITLE, title);
const getCategoryByAppKey = (key) => fetchALL(CATEGORIES_BY_APP_KEY, key)
const addCategory = (name, image_url, image_name, app_key) => fetch(ADD_CATEGORY, name, image_url, image_name, app_key)
const updateCategory = (id, name, image_name, image_url, app_key) => fetch(UPADATE_CATEGORY, id, name, image_url, image_name, app_key)
const deleteCategory = (id) => fetch(DELETE_CATEGORY, id)
const getCategoriesByLimitNext = (key, id) => fetchALL(CATEGORIES_BY_LIMIT_NEXT, key, id)
const getCategoriesByLimitPrev = (key, id) => fetchALL(CATEGORIES_BY_LIMIT_PREV, key, id)

module.exports = {
    getCategories,
    getCategoryByid,
    getCategoryBytitle,
    getCategoryByAppKey,
    addCategory,
    updateCategory,
    deleteCategory,
    getCategoriesByLimitNext,
    getCategoriesByLimitPrev
}