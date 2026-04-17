-- AlterTable
ALTER TABLE "Order" ADD COLUMN "shopifyOrderId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Order_shopifyOrderId_key" ON "Order"("shopifyOrderId");
CREATE INDEX "Order_shopifyOrderId_idx" ON "Order"("shopifyOrderId");

-- CreateTable
CREATE TABLE "ProcessedShopifyEvent" (
    "id" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProcessedShopifyEvent_pkey" PRIMARY KEY ("id")
);
