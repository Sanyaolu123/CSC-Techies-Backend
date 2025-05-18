/*
  Warnings:

  - Added the required column `units` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recurringType` to the `timetable` table without a default value. This is not possible if the table is not empty.
  - Made the column `recurring` on table `timetable` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "RecurrenceType" AS ENUM ('DAILY', 'WEEKLY', 'MONTHLY');

-- CreateEnum
CREATE TYPE "WeekDay" AS ENUM ('SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY');

-- AlterEnum
ALTER TYPE "MaterialType" ADD VALUE 'NOTES';

-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "units" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "timetable" ADD COLUMN     "recurringType" "RecurrenceType" NOT NULL,
ALTER COLUMN "recurring" SET NOT NULL;

-- CreateTable
CREATE TABLE "timetable_sessions" (
    "id" TEXT NOT NULL,
    "timetable_id" TEXT NOT NULL,
    "dayOfWeek" "WeekDay" NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "timetable_sessions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "timetable_sessions" ADD CONSTRAINT "timetable_sessions_timetable_id_fkey" FOREIGN KEY ("timetable_id") REFERENCES "timetable"("id") ON DELETE CASCADE ON UPDATE CASCADE;
