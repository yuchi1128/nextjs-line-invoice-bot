-- CreateTable
CREATE TABLE "Invoice" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "recipient" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "message" TEXT NOT NULL,
    "sentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isPaid" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserIdMapping" (
    "id" SERIAL NOT NULL,
    "liffUserId" TEXT NOT NULL,
    "webhookUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserIdMapping_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserIdMapping_liffUserId_key" ON "UserIdMapping"("liffUserId");

-- CreateIndex
CREATE UNIQUE INDEX "UserIdMapping_webhookUserId_key" ON "UserIdMapping"("webhookUserId");
