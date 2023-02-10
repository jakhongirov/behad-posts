CREATE TABLE categories (
    category_id bigserial PRIMARY KEY,
    category_name text not null,
    category_img_name text not null,
    category_img text not null,
    app_key text not null REFERENCES apps(app_key) ON DELETE CASCADE,
    category_create_date timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
    post_id bigserial PRIMARY KEY,
    post_title text not null,
    post_desc text not null,
    post_img text not null,
    post_img_name text not null,
    category_id int not null REFERENCES categories(category_id) ON DELETE CASCADE,
    like_count int DEFAULT 0,
    dislike_count int DEFAULT 0,
    view_count int DEFAULT 0, 
    post_create_date timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pills (
    pill_id bigserial PRIMARY KEY,
    pill_name text not null,
    pill_type text not null,
    pill_producer text not null,
    pill_instruction text not null,
    pill_active_ingredient text not null,
    pill_category text not null,
    pill_create_date timestamptz DEFAULT CURRENT_TIMESTAMP
);