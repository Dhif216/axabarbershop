-- CreateTable
CREATE TABLE "ReservedSlot" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE INDEX "ReservedSlot_expiresAt_idx" ON "ReservedSlot"("expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "ReservedSlot_date_time_key" ON "ReservedSlot"("date", "time");
