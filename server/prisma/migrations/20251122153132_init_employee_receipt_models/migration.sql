/*
  Warnings:

  - You are about to drop the column `amount` on the `Receipt` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `Receipt` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Receipt` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Receipt` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Receipt` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[employeeId]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `employeeId` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ocr_amount` to the `Receipt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ocr_date` to the `Receipt` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Receipt_date_idx";

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "employeeId" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'EMPLOYEE';

-- AlterTable
ALTER TABLE "Receipt" DROP COLUMN "amount",
DROP COLUMN "category",
DROP COLUMN "date",
DROP COLUMN "description",
DROP COLUMN "imageUrl",
ADD COLUMN     "image_storage_url" TEXT,
ADD COLUMN     "is_manual_entry" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "ocr_amount" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "ocr_date" DATE NOT NULL,
ADD COLUMN     "raw_ocr_data" JSONB,
ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- CreateTable
CREATE TABLE "CardTransaction" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "card_number_mask" TEXT NOT NULL,
    "transaction_date" TIMESTAMP(3) NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "merchant_name" TEXT NOT NULL,
    "reconciliation_status" TEXT NOT NULL DEFAULT 'MISSING_RECEIPT',
    "receiptId" INTEGER,

    CONSTRAINT "CardTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CardTransaction_receiptId_key" ON "CardTransaction"("receiptId");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_employeeId_key" ON "Employee"("employeeId");

-- CreateIndex
CREATE INDEX "Receipt_ocr_date_idx" ON "Receipt"("ocr_date");

-- AddForeignKey
ALTER TABLE "CardTransaction" ADD CONSTRAINT "CardTransaction_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardTransaction" ADD CONSTRAINT "CardTransaction_receiptId_fkey" FOREIGN KEY ("receiptId") REFERENCES "Receipt"("id") ON DELETE SET NULL ON UPDATE CASCADE;
