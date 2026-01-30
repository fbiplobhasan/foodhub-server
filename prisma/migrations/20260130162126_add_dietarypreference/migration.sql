-- CreateEnum
CREATE TYPE "DietaryPreference" AS ENUM ('VEG', 'NON_VEG');

-- AlterTable
ALTER TABLE "Meal" ADD COLUMN     "dietaryType" "DietaryPreference" NOT NULL DEFAULT 'NON_VEG';
