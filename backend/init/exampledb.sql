-- Create DB
DROP SCHEMA IF EXISTS `wellness_real_valladolid_db` ;
CREATE SCHEMA IF NOT EXISTS `wellness_real_valladolid_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;

-- Create user
-- drop user if exists 'admin'@'%';
-- CREATE USER IF NOT EXISTS 'admin'@'%' IDENTIFIED BY 'admin';
-- GRANT ALL PRIVILEGES ON wellness_real_valladolid_db.* TO 'admin'@'%';

-- Create Tables
USE `wellness_real_valladolid_db` ;

-- -----------------------------------------------------
-- Table `wellness_real_valladolid_db`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wellness_real_valladolid_db`.`user` (
  `id_user` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(64) NOT NULL,
  `lastname` VARCHAR(64) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `salt` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE INDEX `email` (`email` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------
-- Table `wellness_real_valladolid_db`.`player`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wellness_real_valladolid_db`.`players` (
  `id_player` INT NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `img` varchar(255) NOT NULL,
  PRIMARY KEY (`id_player`)
)
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------
-- Table `wellness_real_valladolid_db`.`fatigue`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wellness_real_valladolid_db`.`fatigue` (
  `id_fatigue` INT NOT NULL AUTO_INCREMENT,
  `id_player` INT NOT NULL,
  `feeling` INT NOT NULL CHECK (feeling >= 1 AND feeling <= 5),
  `registry_date` DATE NOT NULL DEFAULT (CURRENT_DATE),
  PRIMARY KEY (`id_fatigue`),
  CONSTRAINT `user_fk_2`
    FOREIGN KEY (`id_player`)
    REFERENCES `wellness_real_valladolid_db`.`players` (`id_player`)
    ON DELETE CASCADE
)
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- Insert players
insert into players(firstname, lastname,img) values("Jordi", "Masip","https://statics-maker.llt-services.com/vll/images/2023/08/02/xlarge/39db6fad-9914-4cd9-a61a-7be001203a77.png");
insert into players(firstname, lastname,img) values("Luis", "Pérez","https://statics-maker.llt-services.com/vll/images/2023/08/02/xlarge/65f76cd1-15e7-4c93-80d0-46e32616f1f4.png");
insert into players(firstname, lastname,img) values("David", "Torres","https://statics-maker.llt-services.com/vll/images/2023/08/02/xlarge/24480849-5c15-48b2-a6b3-aef781a56b42.png");
insert into players(firstname, lastname,img) values("Javi", "Sánchez","https://statics-maker.llt-services.com/vll/images/2023/08/02/xlarge/7a086659-d7cf-4459-a176-6d9461b27a68.png");
insert into players(firstname, lastname,img) values("Boyomo", "Thiedort","https://statics-maker.llt-services.com/vll/images/2023/08/02/xlarge/c86940bf-e6eb-4594-b3d9-49635dd2d0fc.png");
insert into players(firstname, lastname,img) values("Gustavo", "Henrique","https://statics-maker.llt-services.com/vll/images/2023/08/22/xlarge/5833108f-5ce3-4618-8bb6-136b5d47a22b.png");


-- insert fatigue to players
insert into fatigue(id_player, feeling, registry_date) values((select id_player from players where firstname = "Jordi"), 1, DATE_SUB(NOW(), INTERVAL 4 DAY));
insert into fatigue(id_player, feeling, registry_date) values((select id_player from players where firstname = "Jordi"), 2, DATE_SUB(NOW(), INTERVAL 3 DAY));
insert into fatigue(id_player, feeling, registry_date) values((select id_player from players where firstname = "Jordi"), 3, DATE_SUB(NOW(), INTERVAL 2 DAY));
insert into fatigue(id_player, feeling, registry_date) values((select id_player from players where firstname = "Jordi"), 4, DATE_SUB(NOW(), INTERVAL 1 DAY));
insert into fatigue(id_player, feeling) values((select id_player from players where firstname = "Jordi"), 5);
insert into fatigue(id_player, feeling, registry_date) values((select id_player from players where firstname = "Luis"), 5, DATE_SUB(NOW(), INTERVAL 4 DAY));
insert into fatigue(id_player, feeling, registry_date) values((select id_player from players where firstname = "Luis"), 3, DATE_SUB(NOW(), INTERVAL 3 DAY));
insert into fatigue(id_player, feeling, registry_date) values((select id_player from players where firstname = "Luis"), 3, DATE_SUB(NOW(), INTERVAL 2 DAY));
insert into fatigue(id_player, feeling, registry_date) values((select id_player from players where firstname = "Luis"), 2, DATE_SUB(NOW(), INTERVAL 1 DAY));
insert into fatigue(id_player, feeling) values((select id_player from players where firstname = "Luis"), 1);