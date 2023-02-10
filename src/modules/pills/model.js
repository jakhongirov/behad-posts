const { fetch, fetchALL } = require("../../lib/postgres");

const PILLS = `
    SELECT
        pill_id, pill_name, pill_category, to_char(pill_create_date, 'HH24:MI/DD.MM.YYYY')
    FROM
        pills
    ORDER BY
        pill_id DESC
    LIMIT 100;
`;

const PILL_BY_ID = `
    SELECT
        *, to_char(pill_create_date, 'HH24:MI/DD.MM.YYYY')
    FROM
        pills
    WHERE
        pill_id = $1;
`;

const PILL_BY_NAME = `
    SELECT
        *, to_char(pill_create_date, 'HH24:MI/DD.MM.YYYY')
    FROM
        pills
    WHERE
        pill_name ilike $1;
`;

const PILLS_LIMIT_NEXT = `
    SELECT
        pill_id, pill_name, pill_category, to_char(pill_create_date, 'HH24:MI/DD.MM.YYYY')
    FROM
        pills
    WHERE
        pill_id < $1
    ORDER BY
        pill_id DESC
    LIMIT 100;
`;

const PILLS_LIMIT_PREV = `
    SELECT
        pill_id, pill_name, pill_category, to_char(pill_create_date, 'HH24:MI/DD.MM.YYYY')
    FROM
        pills
    WHERE
        pill_id > $1
    ORDER BY
        pill_id DESC
    LIMIT 100;
`;

const ADD_PILL = `
    INSERT INTO
        pills (
            pill_name,
            pill_type,
            pill_producer,
            pill_instruction,
            pill_active_ingredient,
            pill_category
        )
    VALUES (
            $1,        
            $2,        
            $3,        
            $4,        
            $5,        
            $6        
    ) RETURNING *;
`;

const UPDATE_PILL = `
    UPDATE
        pills
    SET
        pill_name = $2,
        pill_type = $3,
        pill_producer = $4,
        pill_instruction = $5,
        pill_active_ingredient = $6,
        pill_category = $7,
    WHERE
        pill_id = $1
    RETURNING *;
`;

const DELTETE_PILL = `
    DELETE FROM
        pills
    WHERE
        pill_id = $1
    RETURNING *;
`; 

const allPill = () => fetchALL(PILLS)
const pillById = (id) => fetchALL(PILL_BY_ID, id)
const pillByName = (name) => fetch(PILL_BY_NAME, name)
const pillLimitNext = (id) => fetchALL(PILLS_LIMIT_NEXT, id)
const pillLimitPrev = (id) => fetchALL(PILLS_LIMIT_PREV, id)
const addPill = (name, type, producer, instruction, ingredient, category) => fetch(ADD_PILL, name, type, producer, instruction, ingredient, category)
const updatePill = (id, name, type, producer, instruction, ingredient, category) => fetch(UPDATE_PILL, id, name, type, producer, instruction, ingredient, category)
const deletePill = (id) => fetch(DELTETE_PILL, id)

module.exports = {
    allPill,
    pillById,
    pillByName,
    pillLimitNext,
    pillLimitPrev,
    addPill,
    updatePill,
    deletePill
}