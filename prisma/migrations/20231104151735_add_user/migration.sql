-- CreateTable
CREATE TABLE "User" (
    "username" VARCHAR(32) NOT NULL,
    "email" TEXT,
    "givenName" VARCHAR(128) NOT NULL,
    "familyName" VARCHAR(128) NOT NULL,
    "middleName" VARCHAR(128) NOT NULL,
    "passwordHash" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("username")
);

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");
