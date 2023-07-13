/*
  Warnings:

  - Added the required column `translation` to the `Word` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Word" ADD COLUMN     "translation" TEXT NOT NULL;
