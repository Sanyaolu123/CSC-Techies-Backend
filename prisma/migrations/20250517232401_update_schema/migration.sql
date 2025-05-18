/*
  Warnings:

  - The values [NOTES,VIDEOS] on the enum `MaterialType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "MaterialType_new" AS ENUM ('ASSIGMENT', 'RECORDING', 'DOCUMENT', 'NOTE', 'VIDEO', 'WEBSITE');
ALTER TABLE "materials" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "materials" ALTER COLUMN "type" TYPE "MaterialType_new" USING ("type"::text::"MaterialType_new");
ALTER TYPE "MaterialType" RENAME TO "MaterialType_old";
ALTER TYPE "MaterialType_new" RENAME TO "MaterialType";
DROP TYPE "MaterialType_old";
ALTER TABLE "materials" ALTER COLUMN "type" SET DEFAULT 'DOCUMENT';
COMMIT;
