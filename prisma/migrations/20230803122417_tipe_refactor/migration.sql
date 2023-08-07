-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('REG', 'ADMIN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userStatus" "UserStatus" NOT NULL DEFAULT 'REG';
