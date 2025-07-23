-- CreateTable
CREATE TABLE "users" (
    "userid" SERIAL NOT NULL,
    "username" VARCHAR(15) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "biography" VARCHAR(255),
    "user_icon" VARCHAR(255),

    CONSTRAINT "User_pkey" PRIMARY KEY ("userid")
);

-- CreateTable
CREATE TABLE "posts" (
    "postID" SERIAL NOT NULL,
    "content" VARCHAR(455) NOT NULL,
    "userid" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("postID")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users"("userid") ON DELETE NO ACTION ON UPDATE NO ACTION;
