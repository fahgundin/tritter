-- CreateTable
CREATE TABLE "notifications" (
    "notificationID" SERIAL NOT NULL,
    "content" VARCHAR(455) NOT NULL,
    "userid" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "read" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("notificationID")
);

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users"("userid") ON DELETE NO ACTION ON UPDATE NO ACTION;
