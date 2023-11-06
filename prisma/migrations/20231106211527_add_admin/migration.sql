-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isAdmin" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "ProcessedOrderImage" (
    "orderId" INTEGER NOT NULL,
    "data" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ProcessedOrderImage_orderId_key" ON "ProcessedOrderImage"("orderId");

-- AddForeignKey
ALTER TABLE "ProcessedOrderImage" ADD CONSTRAINT "ProcessedOrderImage_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
