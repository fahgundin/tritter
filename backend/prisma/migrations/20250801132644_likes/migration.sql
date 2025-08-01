-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "usersLiked" TEXT[];

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "likedPosts" INTEGER[];
