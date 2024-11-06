-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "assigneeId" TEXT,
ALTER COLUMN "desc" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
