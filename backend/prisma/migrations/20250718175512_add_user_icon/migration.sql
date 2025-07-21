
CREATE TABLE "posts"(
    "postID" SERIAL PRIMARY KEY not null,
    "content" VARCHAR(455) not null, 
    "userid" INTEGER NOT NULL,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,


    FOREIGN KEY (userid) REFERENCES users(userid)

);