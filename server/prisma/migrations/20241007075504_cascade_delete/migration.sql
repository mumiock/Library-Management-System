-- DropForeignKey
ALTER TABLE "Borrowing" DROP CONSTRAINT "Borrowing_bookId_fkey";

-- DropForeignKey
ALTER TABLE "Borrowing" DROP CONSTRAINT "Borrowing_userId_fkey";

-- AddForeignKey
ALTER TABLE "Borrowing" ADD CONSTRAINT "Borrowing_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Borrowing" ADD CONSTRAINT "Borrowing_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;
