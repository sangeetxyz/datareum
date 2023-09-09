/*
  Warnings:

  - You are about to drop the column `email` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[emailId]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `emailId` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "user_email_key";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "email",
ADD COLUMN     "emailId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_emailId_key" ON "user"("emailId");
