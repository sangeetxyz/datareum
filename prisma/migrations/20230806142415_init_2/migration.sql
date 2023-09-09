/*
  Warnings:

  - You are about to drop the column `emailId` on the `user` table. All the data in the column will be lost.
  - Added the required column `email` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "user_emailId_key";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "emailId",
ADD COLUMN     "email" TEXT NOT NULL;
