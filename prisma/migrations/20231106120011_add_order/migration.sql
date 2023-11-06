-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('FINISHED', 'PROCESSING', 'NEW');

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "petName" TEXT NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'NEW',

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderImage" (
    "orderId" INTEGER NOT NULL,
    "data" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "OrderImage_orderId_key" ON "OrderImage"("orderId");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_username_fkey" FOREIGN KEY ("username") REFERENCES "User"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderImage" ADD CONSTRAINT "OrderImage_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
