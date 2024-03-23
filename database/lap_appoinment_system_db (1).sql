-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 23, 2024 at 07:44 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lap_appoinment_system_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `center`
--

CREATE TABLE `center` (
  `id` int(11) UNSIGNED NOT NULL,
  `code` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `discount` float NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `center`
--

INSERT INTO `center` (`id`, `code`, `name`, `discount`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '12', 'Center 1', 20, '2024-03-13 07:32:17', '2024-03-13 07:36:14', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `doctors`
--

CREATE TABLE `doctors` (
  `id` int(10) UNSIGNED NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `specialist` varchar(50) NOT NULL,
  `phone_no` varchar(13) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `doctors`
--

INSERT INTO `doctors` (`id`, `first_name`, `last_name`, `specialist`, `phone_no`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Doctor', 'Rose', 'MBBS', '0789456123', '2024-03-13 06:21:20', '2024-03-13 06:21:20', NULL),
(2, 'Doctor', 'Thiiga', 'MBBS', '0789456123', '2024-03-13 06:22:39', '2024-03-13 06:23:02', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `invoices`
--

CREATE TABLE `invoices` (
  `id` int(10) UNSIGNED NOT NULL,
  `invoice_no` varchar(50) NOT NULL,
  `date` datetime NOT NULL,
  `patient_id` int(11) UNSIGNED NOT NULL,
  `doctor_id` int(11) UNSIGNED NOT NULL,
  `center_id` int(11) UNSIGNED NOT NULL,
  `discount` float DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `user_id` int(11) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `invoices`
--

INSERT INTO `invoices` (`id`, `invoice_no`, `date`, `patient_id`, `doctor_id`, `center_id`, `discount`, `status`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '2024315-2-1', '2024-03-15 17:26:04', 1, 1, 1, 20, 1, 2, '2024-03-15 11:56:28', '2024-03-16 07:12:15', NULL),
(2, '20240316-2-1', '2024-03-16 10:22:38', 1, 1, 1, 20, 0, 2, '2024-03-16 04:53:22', '2024-03-16 04:53:22', NULL),
(3, '20240316-2-2', '2024-03-16 12:00:07', 2, 2, 1, 20, 0, 2, '2024-03-16 06:30:27', '2024-03-16 06:30:27', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `invoices_tests`
--

CREATE TABLE `invoices_tests` (
  `id` int(10) UNSIGNED NOT NULL,
  `invoice_id` int(10) UNSIGNED NOT NULL,
  `test_cat_id` int(10) UNSIGNED NOT NULL,
  `specimen` int(10) UNSIGNED NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `comment` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `invoices_tests`
--

INSERT INTO `invoices_tests` (`id`, `invoice_id`, `test_cat_id`, `specimen`, `price`, `comment`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, 1, 1, '820.00', 'Nan', '2024-03-15 11:56:28', '2024-03-15 11:56:28', NULL),
(2, 1, 2, 1, '440.00', '', '2024-03-15 11:56:28', '2024-03-15 11:56:28', NULL),
(3, 2, 1, 1, '820.00', NULL, '2024-03-16 04:53:22', '2024-03-16 04:53:22', NULL),
(4, 3, 1, 1, '820.00', NULL, '2024-03-16 06:30:27', '2024-03-16 06:30:27', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `patients`
--

CREATE TABLE `patients` (
  `id` int(10) UNSIGNED NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `address` varchar(100) NOT NULL,
  `phone_no` varchar(13) NOT NULL,
  `email` varchar(50) NOT NULL,
  `gender` varchar(1) NOT NULL,
  `age` int(3) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `patients`
--

INSERT INTO `patients` (`id`, `first_name`, `last_name`, `address`, `phone_no`, `email`, `gender`, `age`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Patient', '1', 'JA', '0789456123', 'abx@gmail.com', 'M', 20, '2024-03-13 08:56:52', '2024-03-13 08:56:52', NULL),
(2, 'Patient', '2', 'JA, LK', '0789456123', 'abx@gmail.com', 'F', 28, '2024-03-13 08:57:25', '2024-03-13 08:59:00', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `id` int(10) UNSIGNED NOT NULL,
  `invoice_id` int(11) UNSIGNED NOT NULL,
  `date` datetime NOT NULL,
  `payment_method` int(50) UNSIGNED NOT NULL,
  `card_no` varchar(19) DEFAULT NULL,
  `amount` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`id`, `invoice_id`, `date`, `payment_method`, `card_no`, `amount`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 3, '2024-03-15 17:25:06', 1, NULL, '1008.00', '2024-03-15 11:55:06', '2024-03-18 12:00:11', NULL),
(2, 1, '2024-03-15 17:26:28', 1, NULL, '1008.00', '2024-03-15 11:56:28', '2024-03-18 12:00:34', NULL),
(3, 2, '2024-03-16 10:23:22', 1, NULL, '656.00', '2024-03-16 04:53:22', '2024-03-18 12:00:46', NULL),
(4, 3, '2024-03-16 12:00:27', 1, NULL, '656.00', '2024-03-16 06:30:27', '2024-03-18 12:01:00', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tests`
--

CREATE TABLE `tests` (
  `id` int(10) UNSIGNED NOT NULL,
  `test_name` varchar(50) NOT NULL,
  `cat_id` int(10) UNSIGNED NOT NULL,
  `unit` varchar(100) NOT NULL,
  `reference` varchar(100) DEFAULT NULL,
  `flag` varchar(5) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tests`
--

INSERT INTO `tests` (`id`, `test_name`, `cat_id`, `unit`, `reference`, `flag`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Test 1', 1, 'U/L', '< 50', '', '2024-03-14 05:28:02', '2024-03-14 06:42:14', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `test_categories`
--

CREATE TABLE `test_categories` (
  `id` int(10) UNSIGNED NOT NULL,
  `category_name` varchar(50) NOT NULL,
  `reference` varchar(50) NOT NULL,
  `comment` text NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `test_categories`
--

INSERT INTO `test_categories` (`id`, `category_name`, `reference`, `comment`, `amount`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'ALANINE AMINOTRANSFERACE ( ALT / SGPT )', '', '', '820.00', '2024-03-13 10:58:29', '2024-03-13 10:58:29', NULL),
(2, 'ALBUMIN', '', '', '440.00', '2024-03-13 10:59:15', '2024-03-13 11:06:46', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `test_results`
--

CREATE TABLE `test_results` (
  `id` int(10) UNSIGNED NOT NULL,
  `invoice_test_id` int(11) UNSIGNED NOT NULL,
  `test_id` int(11) UNSIGNED DEFAULT NULL,
  `result` text NOT NULL,
  `flag` varchar(1) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `test_results`
--

INSERT INTO `test_results` (`id`, `invoice_test_id`, `test_id`, `result`, `flag`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, 1, '51.00', 'H', '2024-03-17 11:29:07', '2024-03-17 11:29:07', NULL),
(2, 2, NULL, '10.00', '', '2024-03-18 05:14:37', '2024-03-18 05:14:37', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `phone_no` varchar(13) NOT NULL,
  `address` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `password` text NOT NULL,
  `role` int(11) UNSIGNED NOT NULL,
  `permission` text DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `token` text DEFAULT NULL,
  `image` text DEFAULT NULL,
  `status` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `phone_no`, `address`, `email`, `user_name`, `password`, `role`, `permission`, `last_login`, `token`, `image`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES
(2, 'Kirutthi', 'Sri', '0756440859', 'Vadddu,Jaffna', 'Kiru@mail.com', 'kirutthi', '123456', 1, '{\"users\":1,\"usersAdd\":1,\"usersUpdate\":1,\"usersDelete\":1,\"usersPermission\":1,\"patients\":0,\"patientsAdd\":0,\"patientsUpdate\":0,\"patientsDelete\":0,\"doctors\":0,\"doctorsAdd\":0,\"doctorsUpdate\":0,\"doctorsDelete\":0,\"testing\":0,\"testingAdd\":0,\"testingUpdate\":0,\"testingDelete\":0,\"invoice\":0,\"invoiceAdd\":0,\"invoiceUpdate\":0,\"invoiceDelete\":0,\"invoiceAddTests\":0,\"invoiceViewTests\":0,\"invoiceUpdateTests\":0,\"results\":0,\"resultsAdd\":0,\"resultsUpdate\":0,\"resultsDelete\":0,\"centers\":0,\"centersAdd\":0,\"centersUpdate\":0,\"centersDelete\":0,\"payments\":0,\"paymentsAdd\":0,\"paymentsUpdate\":0,\"paymentsDelete\":0,\"payType\":1,\"payMethod\":1}', NULL, NULL, NULL, 1, '2024-03-03 08:43:12', '2024-03-13 05:11:54', NULL),
(3, 'Brain', 'Adam', '0789456123', 'JA', 'adam@mail.com', 'adam', '123456', 1, '{\"users\":1,\"usersAdd\":1,\"usersUpdate\":1,\"usersDelete\":1,\"usersPermission\":1,\"patients\":1,\"patientsAdd\":1,\"patientsUpdate\":1,\"patientsDelete\":1,\"doctors\":1,\"doctorsAdd\":1,\"doctorsUpdate\":1,\"doctorsDelete\":1,\"testing\":1,\"testingAdd\":1,\"testingUpdate\":1,\"testingDelete\":1,\"invoice\":1,\"invoiceAdd\":1,\"invoiceUpdate\":1,\"invoiceDelete\":1,\"invoiceAddTests\":1,\"invoiceViewTests\":1,\"invoiceUpdateTests\":1,\"results\":1,\"resultsAdd\":1,\"resultsUpdate\":1,\"resultsDelete\":1,\"centers\":1,\"centersAdd\":1,\"centersUpdate\":1,\"centersDelete\":1,\"payments\":1,\"paymentsAdd\":1,\"paymentsUpdate\":1,\"paymentsDelete\":1,\"payType\":1,\"payMethod\":1}', NULL, NULL, NULL, 1, '2024-03-12 11:17:03', '2024-03-13 05:42:49', NULL),
(4, 'Rasa', 'V', '0789456123', 'Kondavil', 'abx@gmail.com', 'rasa', '123456', 1, NULL, NULL, NULL, NULL, 1, '2024-03-13 05:43:36', '2024-03-13 05:43:36', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_role`
--

CREATE TABLE `user_role` (
  `id` int(10) UNSIGNED NOT NULL,
  `role_name` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_role`
--

INSERT INTO `user_role` (`id`, `role_name`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Admin', '2024-03-02 09:50:36', '2024-03-02 09:50:36', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `center`
--
ALTER TABLE `center`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `doctors`
--
ALTER TABLE `doctors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_invoices_patient_id` (`patient_id`),
  ADD KEY `fk_invoices_doctor_id` (`doctor_id`),
  ADD KEY `fk_invoice_center_id` (`center_id`),
  ADD KEY `fk_invoices_user_id` (`user_id`);

--
-- Indexes for table `invoices_tests`
--
ALTER TABLE `invoices_tests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_invoice_tests_invoice_id` (`invoice_id`),
  ADD KEY `fk_invoice_tests_test_cat_id` (`test_cat_id`);

--
-- Indexes for table `patients`
--
ALTER TABLE `patients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_payments_invoice_id` (`invoice_id`);

--
-- Indexes for table `tests`
--
ALTER TABLE `tests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_tests_cat_id` (`cat_id`);

--
-- Indexes for table `test_categories`
--
ALTER TABLE `test_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `test_results`
--
ALTER TABLE `test_results`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_test_result_test_id` (`test_id`),
  ADD KEY `fk_test_result_invoice_test_id` (`invoice_test_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_users_role_id` (`role`);

--
-- Indexes for table `user_role`
--
ALTER TABLE `user_role`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `center`
--
ALTER TABLE `center`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `doctors`
--
ALTER TABLE `doctors`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `invoices`
--
ALTER TABLE `invoices`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `invoices_tests`
--
ALTER TABLE `invoices_tests`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `patients`
--
ALTER TABLE `patients`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tests`
--
ALTER TABLE `tests`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `test_categories`
--
ALTER TABLE `test_categories`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `test_results`
--
ALTER TABLE `test_results`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user_role`
--
ALTER TABLE `user_role`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `invoices`
--
ALTER TABLE `invoices`
  ADD CONSTRAINT `fk_invoice_center_id` FOREIGN KEY (`center_id`) REFERENCES `center` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_invoices_doctor_id` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_invoices_patient_id` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_invoices_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `invoices_tests`
--
ALTER TABLE `invoices_tests`
  ADD CONSTRAINT `fk_invoice_tests_invoice_id` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_invoice_tests_test_cat_id` FOREIGN KEY (`test_cat_id`) REFERENCES `test_categories` (`id`);

--
-- Constraints for table `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `fk_payments_invoice_id` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `tests`
--
ALTER TABLE `tests`
  ADD CONSTRAINT `fk_tests_cat_id` FOREIGN KEY (`cat_id`) REFERENCES `test_categories` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `test_results`
--
ALTER TABLE `test_results`
  ADD CONSTRAINT `fk_test_result_invoice_test_id` FOREIGN KEY (`invoice_test_id`) REFERENCES `invoices_tests` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_test_result_test_id` FOREIGN KEY (`test_id`) REFERENCES `tests` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_users_role_id` FOREIGN KEY (`role`) REFERENCES `user_role` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
