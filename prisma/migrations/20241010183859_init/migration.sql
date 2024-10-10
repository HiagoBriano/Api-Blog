-- AlterTable
ALTER TABLE "posts" ALTER COLUMN "slug" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "email" DROP NOT NULL;
