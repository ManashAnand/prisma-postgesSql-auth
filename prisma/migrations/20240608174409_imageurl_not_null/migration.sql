/*
  Warnings:

  - Made the column `imageUrl` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "user" ALTER COLUMN "imageUrl" SET NOT NULL;
