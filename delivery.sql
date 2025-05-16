-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 16, 2025 at 05:51 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `delivery`
--

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `id` int(11) NOT NULL,
  `total` decimal(10,0) NOT NULL,
  `status` enum('pending','delivered') NOT NULL DEFAULT 'pending',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order`
--

INSERT INTO `order` (`id`, `total`, `status`, `createdAt`, `userId`) VALUES
(1, 95000, 'pending', '2025-05-15 15:47:35', 1),
(2, 95000, 'pending', '2025-05-15 15:51:44', 1),
(3, 95000, 'pending', '2025-05-15 18:15:08', 1),
(4, 95000, 'pending', '2025-05-15 18:30:23', 1),
(5, 120000, 'pending', '2025-05-15 18:34:38', 1),
(6, 215000, 'pending', '2025-05-15 18:35:25', 1),
(7, 335000, 'pending', '2025-05-15 18:37:29', 1),
(8, 310000, 'pending', '2025-05-16 02:46:12', 5);

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `orderId` int(11) DEFAULT NULL,
  `productId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `quantity`, `price`, `created_at`, `orderId`, `productId`) VALUES
(1, 1, 95000.00, '2025-05-16 01:15:08.368961', 3, 11),
(2, 1, 95000.00, '2025-05-16 01:30:23.871093', 4, 11),
(3, 1, 120000.00, '2025-05-16 01:34:38.225255', 5, 10),
(4, 1, 120000.00, '2025-05-16 01:35:25.754162', 6, 10),
(5, 1, 95000.00, '2025-05-16 01:35:25.764692', 6, 11),
(6, 2, 120000.00, '2025-05-16 01:37:29.458107', 7, 10),
(7, 1, 95000.00, '2025-05-16 01:37:29.487366', 7, 11),
(8, 2, 95000.00, '2025-05-16 09:46:12.799406', 8, 11),
(9, 1, 120000.00, '2025-05-16 09:46:12.806871', 8, 10);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `imageUrl` varchar(255) NOT NULL,
  `category` varchar(255) DEFAULT NULL,
  `quantity` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `name`, `price`, `imageUrl`, `category`, `quantity`) VALUES
(8, 'Bánh kem dâu', 50000, 'cake (2).jpg', 'Cupcake', 100),
(9, 'Bánh socola', 60000, 'cake.jpg', 'Cupcake', 100),
(10, 'Hải sản sốt cay', 120000, 'seafood.jpg', 'Sea Food', 95),
(11, 'Tôm hấp', 95000, 'seafood.jpg', 'Sea Food', 92),
(12, 'Nước cam', 25000, 'orangejuice.jpg', 'Juice', 100),
(13, 'Coca Cola', 20000, 'fries.jpg', 'Coca', 100),
(14, 'Nước cam ép', 30000, 'orangejuice.jpg', 'Orange Juice', 100),
(15, 'Thịt bò nướng', 150000, 'meat.jpg', 'Meat', 100),
(16, 'Khoai tây chiên', 20000, 'fries.jpg', 'Fries', 100);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `password`, `role`) VALUES
(1, 'Trịnh Lê Huy', '3122410252@sv.sgu.edu.vn', '$2b$10$DUelffVY6G.x.h207v8CO.LTgG/eoslplIkm92JqeuPThHvMFa.SG', 'user'),
(3, 'admin', 'admin@example.com', '$2b$10$DUelffVY6G.x.h207v8CO.LTgG/eoslplIkm92JqeuPThHvMFa.SG', 'admin'),
(4, 'picodengu', 'pinocoder@gmai.com', '$2b$10$AVzgJUSrkAMFpsjR6SPx9O5SZVLWrCKeINPD7Z9KbYkDvn7MO2Bw.', 'user'),
(5, 'john_doe', 'johndoe2@gmail.com', '$2b$10$rZAoENipzgLfN4Ce8T1E2.TrCG5hlnCwr5C0K/y37RpTB8XgekjLu', 'user'),
(7, 'admin2', 'johndoe1@gmail.com', '$2b$10$6GlmFdCtZT2NSN2nFu0DGOumGvPna111HnheHEPDmh9xSD8yJK/Me', 'admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_caabe91507b3379c7ba73637b84` (`userId`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_f1d359a55923bb45b057fbdab0d` (`orderId`),
  ADD KEY `FK_cdb99c05982d5191ac8465ac010` (`productId`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `FK_caabe91507b3379c7ba73637b84` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `FK_cdb99c05982d5191ac8465ac010` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_f1d359a55923bb45b057fbdab0d` FOREIGN KEY (`orderId`) REFERENCES `order` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
