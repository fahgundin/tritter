/*
  Warnings:

  - You are about to drop the column `biography` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `user_icon` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "biography",
DROP COLUMN "user_icon";
