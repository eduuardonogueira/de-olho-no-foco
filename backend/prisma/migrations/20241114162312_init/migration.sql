-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "role" VARCHAR(20) NOT NULL,
    "phone" VARCHAR(20),
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Point" (
    "id" TEXT NOT NULL,
    "type" VARCHAR(50) NOT NULL,
    "description" VARCHAR(200),
    "position" VARCHAR(10),
    "coordinates_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "Point_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coordinates" (
    "id" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "alt" DOUBLE PRECISION,
    "rotation" DOUBLE PRECISION,

    CONSTRAINT "Coordinates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Point_coordinates_id_key" ON "Point"("coordinates_id");

-- CreateIndex
CREATE UNIQUE INDEX "Point_user_id_key" ON "Point"("user_id");

-- AddForeignKey
ALTER TABLE "Point" ADD CONSTRAINT "Point_coordinates_id_fkey" FOREIGN KEY ("coordinates_id") REFERENCES "Coordinates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Point" ADD CONSTRAINT "Point_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
