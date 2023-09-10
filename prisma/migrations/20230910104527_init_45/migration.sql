/*
  Warnings:

  - Made the column `isEmailVerified` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `isOrgVerified` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `isPhoneVerified` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `canContribute` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `canDownload` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "user" ALTER COLUMN "isEmailVerified" SET NOT NULL,
ALTER COLUMN "isOrgVerified" SET NOT NULL,
ALTER COLUMN "isPhoneVerified" SET NOT NULL,
ALTER COLUMN "canContribute" SET NOT NULL,
ALTER COLUMN "canDownload" SET NOT NULL;
