-- Create database
CREATE DATABASE IF NOT EXISTS signup;
USE signup;

-- Set SQL mode and timezone
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

-- Set character set and collation
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- Create 'admine' table
CREATE TABLE IF NOT EXISTS `admine` (
  `id` varchar(69) NOT NULL DEFAULT 'admine',
  `Emaile` varchar(60) NOT NULL,
  `passsworde` varchar(60) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Insert initial data into 'admine' table
INSERT INTO `admine` (`id`, `Emaile`, `passsworde`) VALUES
('admine', 'Admine@gmaile.com', 'yasserde2003');

-- Create 'chambres' table
CREATE TABLE IF NOT EXISTS `chambres` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `prix` int NOT NULL,
  `status` varchar(100) DEFAULT 'Disponible',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Insert initial data into 'chambres' table
INSERT INTO `chambres` (`name`, `image_url`, `prix`, `status`) VALUES
('Chambre Deluxe Vue Mer ER', 'caption.jpg', 120232, 'Disponible'),
('Suite Présidentielle', 'leonardo-349775-158431301-540064.jpg', 350, 'Disponible'),
('Chambre Standard', '426631555.jpg', 80, 'Disponible'),
('Suite Junior', '426631594.jpg', 200, 'Disponible'),
('Chambre Familiale', '434269669.jpg', 150, 'Disponible'),
('Chambre Simple', '456037436.jpg', 60, 'Disponible'),
('Suite Lune de Miel', '426631547.jpg', 250, 'Disponible'),
('Chambre Double Luxe', 'kam-idris-kyt0PkBSCNQ-unsplash.jpg', 180, 'Disponible'),
('Chambre Triple', 'OneOnly-1.jpg', 130, 'Disponible'),
('Chambre Economique', 'unnamed.jpg', 50, 'Disponible'),
('Chambre avec Balcon', 'Sh-Colon-Valencia-Hotel-Exterior (1).jpg', 140, 'Disponible'),
('Chambre Accessible', 'caption.jpg', 100, 'Disponible');

-- Create 'reservations' table
CREATE TABLE IF NOT EXISTS `reservations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Nbr_of_Presonne` int DEFAULT NULL,
  `date_arrivee` date DEFAULT NULL,
  `date_depart` date DEFAULT NULL,
  `user_id` int NOT NULL,
  `chambre_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `chambre_id` (`chambre_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Insert initial data into 'reservations' table
INSERT INTO `reservations` (`Nbr_of_Presonne`, `date_arrivee`, `date_depart`, `user_id`, `chambre_id`) VALUES
(2, '2024-05-07', '2024-05-30', 1, 1);

-- Create 'sign' table
CREATE TABLE IF NOT EXISTS `sign` (
  `id` int NOT NULL AUTO_INCREMENT,
  `prenom` char(30) NOT NULL,
  `Nom` char(30) NOT NULL,
  `Emaile` varchar(30) NOT NULL,
  `passworde` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Insert initial data into 'sign' table
INSERT INTO `sign` (`prenom`, `Nom`, `Emaile`, `passworde`) VALUES
('yasser', 'Derbale', 'yasser@gmaile.com', 'yasser');

-- Set auto_increment values for the tables
ALTER TABLE `chambres` AUTO_INCREMENT = 14;
ALTER TABLE `reservations` AUTO_INCREMENT = 4;
ALTER TABLE `sign` AUTO_INCREMENT = 2;

-- Commit the transaction
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
