-- CreateTable
CREATE TABLE "patient" (
    "id" SERIAL NOT NULL,
    "identifier" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "patient_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "patient_identifier_key" ON "patient"("identifier");
