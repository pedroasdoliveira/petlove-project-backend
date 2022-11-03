-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "profile_picture" TEXT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "team" TEXT,
    "chapter" TEXT,
    "role" TEXT,
    "resetToken" TEXT,
    "is_admin" BOOLEAN,
    "is_verified" BOOLEAN DEFAULT false,
    "email_notification" TEXT DEFAULT 'all',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN DEFAULT false,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tests" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "system" TEXT[],
    "computationalFundamentals" TEXT[],
    "person" TEXT[],
    "process" TEXT[],
    "test" TEXT[],
    "design" TEXT[],
    "toolshop" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "specialties" (
    "id" TEXT NOT NULL,
    "performance" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "system" INTEGER NOT NULL,
    "person" INTEGER NOT NULL,
    "technology" INTEGER NOT NULL,
    "process" INTEGER NOT NULL,
    "influence" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "specialties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "results" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "next_role" TEXT,
    "system" INTEGER,
    "person" INTEGER,
    "process" INTEGER,
    "technology" INTEGER,
    "influence" INTEGER,
    "is_valided" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "results_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tests_title_key" ON "tests"("title");

-- CreateIndex
CREATE UNIQUE INDEX "specialties_performance_key" ON "specialties"("performance");

-- AddForeignKey
ALTER TABLE "results" ADD CONSTRAINT "results_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
