-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost
-- Thời gian đã tạo: Th4 18, 2025 lúc 12:46 PM
-- Phiên bản máy phục vụ: 8.0.36
-- Phiên bản PHP: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `asm2_nodejs`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `categories`
--

CREATE TABLE `categories` (
  `id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `image` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

--
-- Đang đổ dữ liệu cho bảng `categories`
--

INSERT INTO `categories` (`id`, `name`, `createdAt`, `updatedAt`, `image`, `status`, `description`) VALUES
(65, 'Xe tay ga', '2025-04-18 12:10:54', '2025-04-18 12:10:54', 'https://res.cloudinary.com/dggdcorgr/image/upload/v1744978251/ho7mhsfpopwyrfwxn3yd.webp', '1', NULL),
(66, 'Xe số ', '2025-04-18 12:11:17', '2025-04-18 12:11:17', 'https://res.cloudinary.com/dggdcorgr/image/upload/v1744978272/ea4viybnyf2l4zezmts5.webp', '1', NULL),
(67, 'Xe côn tay', '2025-04-18 12:12:05', '2025-04-18 12:12:05', 'https://res.cloudinary.com/dggdcorgr/image/upload/v1744978323/pxetilkugkigh9dk0ccu.webp', '0', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `id` int NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `images` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `price` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `salePrice` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `longDescription` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `status` int NOT NULL DEFAULT '0',
  `category_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`id`, `title`, `description`, `images`, `price`, `createdAt`, `updatedAt`, `salePrice`, `longDescription`, `status`, `category_id`) VALUES
(95, 'Honda Winner X', 'Xe côn tay thể thao, mạnh mẽ, phù hợp đi phượt và đường dài.', '1740511978430-den_tc_9314fda5e2cb485c9d27834e4602c7ba_grande.webp', '50000000', '2025-02-26 02:27:40', '2025-02-25 19:34:57', '47000000', 'Honda Winner X 2023 với thiết kế thể thao, động cơ 150cc mạnh mẽ, hệ thống phanh ABS an toàn.', 1, 1),
(97, 'Suzuki Raider 150', 'Xe côn tay dáng underbone, phù hợp cho giới trẻ yêu thích tốc độ.', '1740511844827-01-Do-Den-Moi-BG.jpg', '49000000', '2025-02-26 02:27:40', '2025-02-25 19:35:05', '46000000', 'Suzuki Raider 150 Fi sở hữu động cơ DOHC 150cc mạnh mẽ, hộp số 6 cấp, thiết kế khí động học.', 1, 1),
(98, 'Honda SH 150i', 'Mẫu xe tay ga cao cấp, sang trọng và mạnh mẽ.', '1740511865680-images (1).jpeg', '90000000', '2025-02-26 02:27:40', '2025-02-25 19:31:05', '87000000', 'Honda SH 150i phiên bản mới với hệ thống khóa thông minh SmartKey, phanh ABS, động cơ eSP+ tiết kiệm nhiên liệu.', 1, 3),
(99, 'Yamaha NVX 155', 'Xe tay ga thể thao dành cho giới trẻ.', '1740511909724-vn-11134207-7ras8-m2tja6yhq7lyc5.jpeg', '56000000', '2025-02-26 02:27:40', '2025-02-25 19:31:49', '53000000', 'Yamaha NVX 155 với động cơ Blue Core, thiết kế khí động học, phanh ABS và công nghệ Smart Key.', 1, 3),
(100, 'Piaggio Vespa Sprint', 'Mẫu xe tay ga thời trang, mang phong cách châu Âu.', '1740511937491-2-copy-00790afe-c55a-4678-a219-29eebc1ee860.webp', '78000000', '2025-02-26 02:27:40', '2025-02-25 19:35:18', '75000000', 'Vespa Sprint với thiết kế sang trọng, động cơ iGet 150cc, hệ thống phanh ABS, khung xe thép nguyên khối.', 1, 3),
(101, 'Honda Air Blade 125', 'Xe tay ga phổ thông, tiết kiệm nhiên liệu.', '1740511989800-images.jpeg', '43000000', '2025-02-26 02:27:40', '2025-02-25 19:35:27', '41000000', 'Honda Air Blade 125 với động cơ eSP+, khóa thông minh SmartKey, và thiết kế thể thao mạnh mẽ.', 1, 3),
(102, 'SYM Star SR 170', 'Xe côn tay phong cách thể thao, phù hợp cho người mới tập lái.', '1740512013600-star_sr_blue_170.jpg', '39000000', '2025-02-26 02:27:40', '2025-02-25 21:32:31', '37000000', 'SYM Star SR 170 trang bị động cơ 170cc mạnh mẽ, phanh ABS, hệ thống đèn LED hiện đại.', 1, 2),
(103, 'Honda Future 125', 'Xe số cao cấp, bền bỉ và tiết kiệm xăng.', '1740512043395-xanh_den_cc_74ea2fc7414c4c9dbaa161e4b69ed846_master.webp', '32000000', '2025-02-26 02:27:40', '2025-03-05 10:40:58', '30000000', 'Honda Future 125 với động cơ 125cc FI, thiết kế sang trọng, hệ thống đèn LED, vận hành êm ái.', 1, 2),
(105, 'fewfwef', '222222', 'default.jpg', '-3333', '2025-03-05 12:12:05', '2025-03-05 12:12:05', '2222', '222', 0, 3);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `role` tinyint DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `role`, `password`, `createdAt`, `updatedAt`) VALUES
(1, 'dao', 'daoln2@fpt.edu.vn', 1, '$2b$10$FwYy3nnUUlH5Z9a12fheiuBvpZmsG.mTE.37e0GUhV8/0TrgJYoz6', '2025-04-09 07:43:41', '2025-04-09 07:48:42');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=106;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
