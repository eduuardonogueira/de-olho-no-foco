-- DropForeignKey
ALTER TABLE "public"."Point" DROP CONSTRAINT "Point_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserNotificationStatus" DROP CONSTRAINT "UserNotificationStatus_userId_fkey";

-- AlterTable
ALTER TABLE "public"."Point" ALTER COLUMN "user_id" SET DEFAULT 'deleted_user';

-- AddForeignKey
ALTER TABLE "public"."UserNotificationStatus" ADD CONSTRAINT "UserNotificationStatus_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Point" ADD CONSTRAINT "Point_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;
