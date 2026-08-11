-- CreateTable
CREATE TABLE `sesija` (
    `sesija_id` INTEGER NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(255) NOT NULL,
    `korisnik_id` INTEGER NOT NULL,
    `istice` DATETIME(0) NOT NULL,

    UNIQUE INDEX `sesija_token_key`(`token`),
    INDEX `sesija_korisnik_id_idx`(`korisnik_id`),
    PRIMARY KEY (`sesija_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `sesija` ADD CONSTRAINT `sesija_korisnik_id_fkey` FOREIGN KEY (`korisnik_id`) REFERENCES `korisnik`(`korisnik_id`) ON DELETE CASCADE ON UPDATE NO ACTION;
