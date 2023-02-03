const { fetch } = require("../../lib/postgres");

const BY_KEY_2 = `
    SELECT
        *, to_char(app_create_date at time zone 'Asia/Tashkent', 'HH24:MM/MM.DD.YYYY')
    FROM
        apps
    WHERE
        app_key = $1
    ORDER BY
        app_id DESC;
`;

const getAppbyKeyAppAuth = (key) => fetch(BY_KEY_2, key)

module.exports = {
    getAppbyKeyAppAuth
}