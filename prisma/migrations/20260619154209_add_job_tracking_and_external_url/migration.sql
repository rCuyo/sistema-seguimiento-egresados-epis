-- AlterEnum
ALTER TYPE "JobType" ADD VALUE 'PROFESSIONAL_INTERNSHIP';

-- AlterTable
ALTER TABLE "JobOffer" ADD COLUMN     "externalUrl" TEXT,
ADD COLUMN     "modality" TEXT,
ADD COLUMN     "viewCount" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "JobClick" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "userId" TEXT,
    "clickedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JobClick_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "JobClick_jobId_idx" ON "JobClick"("jobId");

-- CreateIndex
CREATE INDEX "JobClick_clickedAt_idx" ON "JobClick"("clickedAt");

-- AddForeignKey
ALTER TABLE "JobClick" ADD CONSTRAINT "JobClick_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "JobOffer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
