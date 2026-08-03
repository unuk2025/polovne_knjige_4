-- CreateTable
CREATE TABLE `autor` (
    `autor_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ime_autora` VARCHAR(50) NOT NULL,
    `prezime_autora` VARCHAR(50) NULL,
    `zemlja_autora` VARCHAR(50) NULL,

    PRIMARY KEY (`autor_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dodata` (
    `isbn` VARCHAR(13) NOT NULL,
    `broj_racuna` INTEGER NOT NULL,
    `kolicina` INTEGER NOT NULL DEFAULT 1,

    INDEX `broj_racuna`(`broj_racuna`),
    PRIMARY KEY (`isbn`, `broj_racuna`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `izdavac` (
    `izdavac_id` INTEGER NOT NULL AUTO_INCREMENT,
    `naziv_izdavaca` VARCHAR(100) NOT NULL,
    `grad` VARCHAR(50) NULL,

    PRIMARY KEY (`izdavac_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `knjiga` (
    `isbn` VARCHAR(13) NOT NULL,
    `naslov` VARCHAR(255) NOT NULL,
    `naslov_originala` VARCHAR(255) NULL,
    `godina_izdavanja_originala` INTEGER NULL,
    `godina_izdavanja` INTEGER NULL,
    `cena` DECIMAL(10, 2) NOT NULL,
    `povez` VARCHAR(20) NULL,
    `pismo` VARCHAR(20) NULL,
    `slika_korice` VARCHAR(255) NULL,
    `broj_strana` INTEGER NULL,
    `opis` TEXT NULL,
    `autor_id` INTEGER NOT NULL,
    `zanr_id` INTEGER NOT NULL,
    `izdavac_id` INTEGER NOT NULL,

    INDEX `autor_id`(`autor_id`),
    INDEX `izdavac_id`(`izdavac_id`),
    INDEX `zanr_id`(`zanr_id`),
    PRIMARY KEY (`isbn`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `korisnik` (
    `korisnik_id` INTEGER NOT NULL AUTO_INCREMENT,
    `korisnicko_ime` VARCHAR(50) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `lozinka` VARCHAR(255) NOT NULL,
    `uloga` ENUM('kupac', 'prodavac', 'administrator') NULL DEFAULT 'kupac',

    UNIQUE INDEX `korisnicko_ime`(`korisnicko_ime`),
    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`korisnik_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `porudzbina` (
    `broj_racuna` INTEGER NOT NULL AUTO_INCREMENT,
    `datum` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `iznos` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    `korisnik_id` INTEGER NOT NULL,

    INDEX `korisnik_id`(`korisnik_id`),
    PRIMARY KEY (`broj_racuna`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `slika_uzorak` (
    `slika_id` INTEGER NOT NULL AUTO_INCREMENT,
    `naziv_slike` VARCHAR(100) NULL,
    `link_slike` VARCHAR(255) NOT NULL,
    `isbn` VARCHAR(13) NOT NULL,

    INDEX `isbn`(`isbn`),
    PRIMARY KEY (`slika_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `zanr` (
    `zanr_id` INTEGER NOT NULL AUTO_INCREMENT,
    `naziv_zanra` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `naziv_zanra`(`naziv_zanra`),
    PRIMARY KEY (`zanr_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `dodata` ADD CONSTRAINT `dodata_ibfk_1` FOREIGN KEY (`isbn`) REFERENCES `knjiga`(`isbn`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `dodata` ADD CONSTRAINT `dodata_ibfk_2` FOREIGN KEY (`broj_racuna`) REFERENCES `porudzbina`(`broj_racuna`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `knjiga` ADD CONSTRAINT `knjiga_ibfk_1` FOREIGN KEY (`autor_id`) REFERENCES `autor`(`autor_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `knjiga` ADD CONSTRAINT `knjiga_ibfk_2` FOREIGN KEY (`zanr_id`) REFERENCES `zanr`(`zanr_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `knjiga` ADD CONSTRAINT `knjiga_ibfk_3` FOREIGN KEY (`izdavac_id`) REFERENCES `izdavac`(`izdavac_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `porudzbina` ADD CONSTRAINT `porudzbina_ibfk_1` FOREIGN KEY (`korisnik_id`) REFERENCES `korisnik`(`korisnik_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `slika_uzorak` ADD CONSTRAINT `slika_uzorak_ibfk_1` FOREIGN KEY (`isbn`) REFERENCES `knjiga`(`isbn`) ON DELETE CASCADE ON UPDATE NO ACTION;
