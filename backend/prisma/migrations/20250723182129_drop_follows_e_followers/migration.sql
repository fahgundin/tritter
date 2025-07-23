/*
  Warnings:

  - You are about to drop the column `followers` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `follows` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "followers",
DROP COLUMN "follows";
