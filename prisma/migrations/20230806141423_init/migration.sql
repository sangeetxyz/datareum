-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "org" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "fireUid" TEXT NOT NULL,
    "isContributor" BOOLEAN NOT NULL,
    "isTac" BOOLEAN NOT NULL,
    "isVerified" BOOLEAN,
    "token" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_phone_key" ON "user"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "user_fireUid_key" ON "user"("fireUid");

-- CreateIndex
CREATE UNIQUE INDEX "user_token_key" ON "user"("token");
