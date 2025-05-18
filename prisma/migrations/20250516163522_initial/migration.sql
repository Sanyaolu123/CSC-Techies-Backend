-- CreateEnum
CREATE TYPE "MaterialType" AS ENUM ('ASSIGMENT', 'RECORDING', 'DOCUMENT', 'WEBSITE');

-- CreateEnum
CREATE TYPE "CourseType" AS ENUM ('COMPULSORY', 'ELECTIVE');

-- CreateEnum
CREATE TYPE "SemesterType" AS ENUM ('FIRST_SEMESTER', 'SECOND_SEMESTER');

-- CreateEnum
CREATE TYPE "RoleTypes" AS ENUM ('ADMIN', 'MANAGER');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "firstname" VARCHAR(100) NOT NULL,
    "lastname" VARCHAR(100) NOT NULL,
    "email" TEXT NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" "RoleTypes" NOT NULL DEFAULT 'ADMIN',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "materials" (
    "id" TEXT NOT NULL,
    "semester_id" TEXT NOT NULL,
    "type" "MaterialType" NOT NULL DEFAULT 'DOCUMENT',
    "title" VARCHAR(255) NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "available" BOOLEAN DEFAULT true,
    "course_id" TEXT NOT NULL,

    CONSTRAINT "materials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "courses" (
    "id" TEXT NOT NULL,
    "semester_id" TEXT NOT NULL,
    "courseCode" VARCHAR(100) NOT NULL,
    "courseTitle" VARCHAR(255) NOT NULL,
    "course_type" "CourseType" NOT NULL DEFAULT 'COMPULSORY',

    CONSTRAINT "courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timetable" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(100),
    "description" VARCHAR(255) NOT NULL,
    "venue" VARCHAR(255) NOT NULL,
    "directions" VARCHAR(255),
    "recurring" BOOLEAN DEFAULT true,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "semester_id" TEXT NOT NULL,
    "course_id" TEXT NOT NULL,

    CONSTRAINT "timetable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exam" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(100),
    "description" VARCHAR(255) NOT NULL,
    "venue" VARCHAR(255) NOT NULL,
    "directions" VARCHAR(255),
    "recurring" BOOLEAN DEFAULT false,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "semester_id" TEXT NOT NULL,
    "course_id" TEXT NOT NULL,

    CONSTRAINT "exam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(100),
    "description" VARCHAR(255) NOT NULL,
    "venue" VARCHAR(255) NOT NULL,
    "directions" VARCHAR(255),
    "recurring" BOOLEAN DEFAULT false,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "semester" (
    "id" TEXT NOT NULL,
    "session" VARCHAR(100) NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "expected_exam_start_date" TIMESTAMP(3) NOT NULL,
    "expected_exam_end_date" TIMESTAMP(3) NOT NULL,
    "semesterType" "SemesterType" NOT NULL,

    CONSTRAINT "semester_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "app_settings" (
    "id" TEXT NOT NULL,
    "current_semester_id" TEXT NOT NULL,
    "expected_graduation_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "app_settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "materials" ADD CONSTRAINT "materials_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "materials" ADD CONSTRAINT "materials_semester_id_fkey" FOREIGN KEY ("semester_id") REFERENCES "semester"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_semester_id_fkey" FOREIGN KEY ("semester_id") REFERENCES "semester"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timetable" ADD CONSTRAINT "timetable_semester_id_fkey" FOREIGN KEY ("semester_id") REFERENCES "semester"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timetable" ADD CONSTRAINT "timetable_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam" ADD CONSTRAINT "exam_semester_id_fkey" FOREIGN KEY ("semester_id") REFERENCES "semester"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam" ADD CONSTRAINT "exam_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
