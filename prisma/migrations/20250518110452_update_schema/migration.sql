-- CreateEnum
CREATE TYPE "ExamType" AS ENUM ('EXAM', 'TEST', 'PROJECT_DEFENSE');

-- AlterTable
ALTER TABLE "exam" ADD COLUMN     "type" "ExamType" NOT NULL DEFAULT 'EXAM';
