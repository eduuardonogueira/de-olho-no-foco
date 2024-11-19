-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profile_image" TEXT;

-- CreateTable
CREATE TABLE "UserNotificationStatus" (
    "id" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "notificationId" TEXT NOT NULL,

    CONSTRAINT "UserNotificationStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GlobalNotification" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "message" VARCHAR(200) NOT NULL,
    "typeId" TEXT NOT NULL,
    "expires_at" TIMESTAMP,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "GlobalNotification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotificationType" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "image_url" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "NotificationType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserNotificationStatus_userId_notificationId_key" ON "UserNotificationStatus"("userId", "notificationId");

-- CreateIndex
CREATE UNIQUE INDEX "GlobalNotification_typeId_key" ON "GlobalNotification"("typeId");

-- AddForeignKey
ALTER TABLE "UserNotificationStatus" ADD CONSTRAINT "UserNotificationStatus_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserNotificationStatus" ADD CONSTRAINT "UserNotificationStatus_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES "GlobalNotification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GlobalNotification" ADD CONSTRAINT "GlobalNotification_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "NotificationType"("id") ON DELETE CASCADE ON UPDATE CASCADE;
