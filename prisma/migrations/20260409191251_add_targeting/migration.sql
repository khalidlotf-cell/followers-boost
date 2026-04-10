-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Service" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "rate" REAL NOT NULL,
    "ourRate" REAL NOT NULL,
    "min" INTEGER NOT NULL,
    "max" INTEGER NOT NULL,
    "refill" BOOLEAN NOT NULL,
    "cancel" BOOLEAN NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "targeting" TEXT NOT NULL DEFAULT 'world'
);
INSERT INTO "new_Service" ("active", "cancel", "category", "id", "max", "min", "name", "ourRate", "rate", "refill", "type") SELECT "active", "cancel", "category", "id", "max", "min", "name", "ourRate", "rate", "refill", "type" FROM "Service";
DROP TABLE "Service";
ALTER TABLE "new_Service" RENAME TO "Service";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
