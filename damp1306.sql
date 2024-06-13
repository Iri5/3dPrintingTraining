CREATE DATABASE  IF NOT EXISTS `mydb` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `mydb`;
-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: mydb
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `component`
--

DROP TABLE IF EXISTS `component`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `component` (
  `id` smallint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `designation` varchar(45) NOT NULL,
  `units` varchar(45) DEFAULT NULL,
  `type` int unsigned NOT NULL,
  `max` double DEFAULT NULL,
  `min` double DEFAULT NULL,
  `rec` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `component`
--

LOCK TABLES `component` WRITE;
/*!40000 ALTER TABLE `component` DISABLE KEYS */;
INSERT INTO `component` VALUES (1,'Температура экструзии','Te','°C',1,280,220,260),(2,'Процент заполнения','Pf','%',1,80,20,65),(3,'Удельная масса','m','кг/м³·10⁶ ',0,NULL,NULL,NULL),(4,'Предел прочности на сжатие','F','МПа',0,NULL,NULL,NULL);
/*!40000 ALTER TABLE `component` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course` (
  `id` smallint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `description` varchar(255) NOT NULL,
  `start` date DEFAULT NULL,
  `end` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES (1,'Знакомство','Описание знакомства','2024-04-04','2024-04-24'),(4,'Материалы для FDM',' Приводится описание свойств основных филаментов для печати',NULL,NULL),(5,'UP! 3D Printer mini',' Описание основных характеристик принтера UP! 3D Printer mini',NULL,NULL);
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `education`
--

DROP TABLE IF EXISTS `education`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `education` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `start` datetime DEFAULT NULL,
  `test_score` decimal(5,2) unsigned DEFAULT NULL,
  `pract_score` decimal(5,2) unsigned DEFAULT NULL,
  `practical_id` int unsigned DEFAULT NULL,
  `course_id` smallint unsigned DEFAULT NULL,
  `user_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `user_id_idx` (`user_id`),
  KEY `practical_id_idx` (`practical_id`),
  KEY `course_id_idx` (`course_id`),
  CONSTRAINT `ecourse_id` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`) ON DELETE CASCADE,
  CONSTRAINT `practical_id` FOREIGN KEY (`practical_id`) REFERENCES `practical_answer` (`id`) ON DELETE SET NULL,
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `education`
--

LOCK TABLES `education` WRITE;
/*!40000 ALTER TABLE `education` DISABLE KEYS */;
INSERT INTO `education` VALUES (1,NULL,NULL,1.00,1,1,1),(43,NULL,80.00,1.00,9,1,4),(44,NULL,NULL,NULL,10,4,4),(49,NULL,NULL,NULL,13,4,7);
/*!40000 ALTER TABLE `education` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `filament`
--

DROP TABLE IF EXISTS `filament`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `filament` (
  `id` smallint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `melting_point` double DEFAULT NULL,
  `extrusion_temp` double DEFAULT NULL,
  `shrinkage` double DEFAULT NULL,
  `density` double DEFAULT NULL,
  `flexural_strength` double DEFAULT NULL,
  `tensile_strength` double DEFAULT NULL,
  `elasticity` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `filament`
--

LOCK TABLES `filament` WRITE;
/*!40000 ALTER TABLE `filament` DISABLE KEYS */;
INSERT INTO `filament` VALUES (1,'ABS',210,220,0.8,1.05,41,22,1627),(2,'PLA',173,200,0,1.23,55.3,57.8,3300);
/*!40000 ALTER TABLE `filament` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `material`
--

DROP TABLE IF EXISTS `material`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `material` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(45) NOT NULL,
  `text` mediumtext,
  `link` varchar(255) DEFAULT NULL,
  `course_id` smallint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `course_id_idx` (`course_id`),
  CONSTRAINT `course_id` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `material`
--

LOCK TABLES `material` WRITE;
/*!40000 ALTER TABLE `material` DISABLE KEYS */;
INSERT INTO `material` VALUES (1,'HTML',NULL,'1.ejs',1),(2,'HTML',NULL,'4.ejs',4),(3,'HTML',NULL,'5.ejs',5);
/*!40000 ALTER TABLE `material` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `model`
--

DROP TABLE IF EXISTS `model`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `model` (
  `id` smallint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `equation` varchar(255) NOT NULL,
  `filament_id` smallint unsigned NOT NULL,
  `printer_id` smallint unsigned NOT NULL,
  `first_factor_id` smallint unsigned NOT NULL,
  `second_factor_id` smallint unsigned NOT NULL,
  `response_id` smallint unsigned NOT NULL,
  `r2` double DEFAULT NULL,
  `f` double DEFAULT NULL,
  `sd` double DEFAULT NULL,
  `ft` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `filament_id_idx` (`filament_id`),
  KEY `printer_id_idx` (`printer_id`),
  KEY `first_factor_id_idx` (`first_factor_id`),
  KEY `second_factor_id_idx` (`second_factor_id`),
  KEY `response_id_idx` (`response_id`),
  CONSTRAINT `filament_id` FOREIGN KEY (`filament_id`) REFERENCES `filament` (`id`) ON DELETE CASCADE,
  CONSTRAINT `first_factor_id` FOREIGN KEY (`first_factor_id`) REFERENCES `component` (`id`) ON DELETE CASCADE,
  CONSTRAINT `printer_id` FOREIGN KEY (`printer_id`) REFERENCES `printer` (`id`) ON DELETE CASCADE,
  CONSTRAINT `response_id` FOREIGN KEY (`response_id`) REFERENCES `component` (`id`) ON DELETE CASCADE,
  CONSTRAINT `second_factor_id` FOREIGN KEY (`second_factor_id`) REFERENCES `component` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `model`
--

LOCK TABLES `model` WRITE;
/*!40000 ALTER TABLE `model` DISABLE KEYS */;
INSERT INTO `model` VALUES (1,'Зависимость массы от температуры экструзии и процента заполнения для UP! 3D printer mini и филамента ABS','m = 1.55133071 - 0.005955625 * Te - 0.01030506173 * Pf + 0.000007458333333 * Te * Pf + 0.00001064583333 * Te^2 + 0.000114339506173 * Pf^2',1,1,1,2,3,0.98707,229.02,0.07,4.1),(2,'Зависимость предела прочности на сжатие от температуры экструзии и процента заполнения для UP! 3D printer mini и филамента ABS','F=-369.258176+3.060168788*Te+13.26954693*Pf-0.106074922*Te*Pf-0.005919893*Te^2-0.184800565*Pf^2+0.000204224*Te^2*Pf+0.001495456*Te*Pf^2-0.0000028851*Te^2*Pf^2',1,1,1,2,4,0.99361,466.48,0.06,4.1);
/*!40000 ALTER TABLE `model` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `practical_answer`
--

DROP TABLE IF EXISTS `practical_answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `practical_answer` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `answer` json DEFAULT NULL,
  `practical_task_id` smallint unsigned NOT NULL,
  `protocol` json DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `task_id_idx` (`practical_task_id`),
  CONSTRAINT `task_id` FOREIGN KEY (`practical_task_id`) REFERENCES `practical_task` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `practical_answer`
--

LOCK TABLES `practical_answer` WRITE;
/*!40000 ALTER TABLE `practical_answer` DISABLE KEYS */;
INSERT INTO `practical_answer` VALUES (1,'{\"firstfactor\": \"273\", \"secondfactor\": \"80\"}',1,NULL),(3,NULL,1,NULL),(5,NULL,2,NULL),(6,NULL,2,NULL),(7,NULL,2,NULL),(8,NULL,1,NULL),(9,'{\"firstfactor\": \"232\", \"secondfactor\": \"29\"}',2,'[{\"date\": \"11.6.2024\", \"time\": \"21:37:59\", \"message\": \"Нажатие на кнопку \\\"Показать 3D график\\\"\"}, {\"date\": \"11.6.2024\", \"time\": \"21:38:1\", \"message\": \"Изменение в трэкбаре Te на 263\"}, {\"date\": \"11.6.2024\", \"time\": \"21:38:1\", \"message\": \" Произведен расчет\\nTe: 263\\nPf: 50\\nm: 0.59003574286422\\n\"}, {\"date\": \"11.6.2024\", \"time\": \"21:38:2\", \"message\": \"Изменение в трэкбаре Pf на 29\"}, {\"date\": \"11.6.2024\", \"time\": \"21:38:2\", \"message\": \" Произведен расчет\\nTe: 263\\nPf: 29\\nm: 0.5755604234550541\\n\"}, {\"date\": \"11.6.2024\", \"time\": \"21:38:3\", \"message\": \"Нажатие на кнопку \\\"Показать 2D график\\\"\"}, {\"date\": \"11.6.2024\", \"time\": \"21:38:24\", \"message\": \"\\n    Построение 2D-графиков:\\n        1) Te фиксированно 240,\\n            Pf от 25 до 26 с шагом 2;\\n        2) Pf фиксированно 28,\\n            Te от 2 до 3 с шагом 5;    \\n    \"}, {\"date\": \"11.6.2024\", \"time\": \"21:38:28\", \"message\": \"Нажатие на кнопку \\\"Построение таблицы\\\"\"}, {\"date\": \"11.6.2024\", \"time\": \"21:38:41\", \"message\": \"Построение таблицы:\\n    Te: от 25 до 92 с шагом 1\\n    Pf: от 25 до 88 с шагом 3\\n    \"}, {\"date\": \"11.6.2024\", \"time\": \"21:38:46\", \"message\": \"Изменение в трэкбаре Te на 232\"}, {\"date\": \"11.6.2024\", \"time\": \"21:38:46\", \"message\": \" Произведен расчет\\nTe: 232\\nPf: 29\\nm: 0.5901194443398371\\n\"}]'),(10,NULL,2,NULL),(13,NULL,1,NULL);
/*!40000 ALTER TABLE `practical_answer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `practical_task`
--

DROP TABLE IF EXISTS `practical_task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `practical_task` (
  `id` smallint unsigned NOT NULL AUTO_INCREMENT,
  `text` varchar(255) NOT NULL,
  `number` int unsigned NOT NULL,
  `answers` json NOT NULL,
  `model_id` smallint unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `number_UNIQUE` (`number`),
  KEY `model_id_idx` (`model_id`),
  CONSTRAINT `model_id` FOREIGN KEY (`model_id`) REFERENCES `model` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `practical_task`
--

LOCK TABLES `practical_task` WRITE;
/*!40000 ALTER TABLE `practical_task` DISABLE KEYS */;
INSERT INTO `practical_task` VALUES (1,'Найти температуру экструзии и процент заполнения для изделия, выдерживающего нагрузку на сжатие 38 МПа +- 2МПа для филамента ABS и принтера UP! 3D Printer mini',1,'{\"firstfactor\": {\"max\": \"280\", \"min\": \"120\"}, \"secondfactor\": {\"max\": \"80\", \"min\": \"10\"}}',2),(2,'Найти температуру экструзии и процент заполнения для изделия, выдерживающего нагрузку на сжатие 36 МПа +- 2МПа для филамента ABS и принтера UP! 3D Printer mini',2,'{\"firstfactor\": {\"max\": \"280\", \"min\": \"120\"}, \"secondfactor\": {\"max\": \"80\", \"min\": \"10\"}}',2);
/*!40000 ALTER TABLE `practical_task` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `printer`
--

DROP TABLE IF EXISTS `printer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `printer` (
  `id` smallint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `extruder_heating_temp` varchar(45) DEFAULT NULL,
  `table_heating_temp` varchar(45) DEFAULT NULL,
  `print_speed` varchar(45) DEFAULT NULL,
  `power` int DEFAULT NULL,
  `size` varchar(45) DEFAULT NULL,
  `materials` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `printer`
--

LOCK TABLES `printer` WRITE;
/*!40000 ALTER TABLE `printer` DISABLE KEYS */;
INSERT INTO `printer` VALUES (1,'UP! 3D Printer mini','180-260','0-60','90-140',600,'240*355*240','ABS, PLA'),(2,'Hage 3Dp-A2','170-450','0-80','90-150',1000,'840*650*560','ABS, PLA, PVA, ASA, PET-G');
/*!40000 ALTER TABLE `printer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `type` char(1) NOT NULL,
  `question` json DEFAULT NULL,
  `test_id` smallint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `qtest_id_idx` (`test_id`),
  CONSTRAINT `qtest_id` FOREIGN KEY (`test_id`) REFERENCES `test` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question`
--

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
INSERT INTO `question` VALUES (2,'1','{\"ans\": [{\"text\": \"5\", \"right\": \"0\"}, {\"text\": \"4\", \"right\": \"1\"}, {\"text\": \"6\", \"right\": \"0\"}], \"type\": \"1\", \"score\": \"1\", \"que_text\": \"2+2=\", \"count_var\": \"3\"}',1),(3,'2','{\"ans\": [{\"text\": \"5\", \"right\": \"0\"}, {\"text\": \"2+2\", \"right\": \"1\"}, {\"text\": \"2*2\", \"right\": \"1\"}], \"type\": \"2\", \"score\": \"1\", \"que_text\": \"4=\", \"count_var\": \"3\"}',1),(4,'3','{\"ans\": [{\"text\": \"5\", \"right\": \"1\"}], \"type\": \"3\", \"score\": \"1\", \"que_text\": \"3+2=\", \"count_var\": \"1\"}',1),(11,'2','{\"id\": \"11\", \"ans\": [{\"text\": \"1+2\", \"right\": 1}, {\"text\": \"2+1\", \"right\": 1}, {\"text\": \"2+2\", \"right\": 0}], \"type\": \"2\", \"score\": \"1\", \"que_text\": \"3=\", \"count_var\": 3}',1),(12,'3','{\"id\": \"12\", \"ans\": [{\"text\": \"красный\", \"right\": 1}], \"type\": \"3\", \"score\": \"1\", \"que_text\": \"Первый цвет радуги\", \"count_var\": 1}',1),(14,'1','{\"id\": \"14\", \"ans\": [{\"text\": \"Прочность, жидкость, цвет\", \"right\": 0}, {\"text\": \"Эластичность, вилка температуры печати, усадка\", \"right\": 1}, {\"text\": \"Эластичность, усадка, цвет\", \"right\": 0}], \"type\": \"1\", \"score\": \"1\", \"que_text\": \"Основные свойства пластика для FDM-печати\", \"count_var\": 3}',8),(15,'3','{\"id\": \"15\", \"ans\": [{\"text\": \"ABS\", \"right\": 1}], \"type\": \"3\", \"score\": \"1\", \"que_text\": \"Самый популярный филамент для FDM-печати\", \"count_var\": 1}',8),(16,'2','{\"id\": \"16\", \"ans\": [{\"text\": \"Отрывает отпечатки от рабочего стола\", \"right\": 1}, {\"text\": \"Искривляет слои\", \"right\": 1}, {\"text\": \"Изменяет цвет\", \"right\": 0}, {\"text\": \"Уменьшает прочность изделия\", \"right\": 1}], \"type\": \"2\", \"score\": \"\", \"que_text\": \"К чему ведет сильная усадка?\", \"count_var\": 4}',8),(17,'2',NULL,9);
/*!40000 ALTER TABLE `question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `score_test`
--

DROP TABLE IF EXISTS `score_test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `score_test` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `score` decimal(5,2) unsigned NOT NULL,
  `user_id` int unsigned NOT NULL,
  `test_course_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `test_course_id_idx` (`test_course_id`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `suser_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `test_course_id` FOREIGN KEY (`test_course_id`) REFERENCES `test_course` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `score_test`
--

LOCK TABLES `score_test` WRITE;
/*!40000 ALTER TABLE `score_test` DISABLE KEYS */;
/*!40000 ALTER TABLE `score_test` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test`
--

DROP TABLE IF EXISTS `test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `test` (
  `id` smallint unsigned NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  `title` varchar(100) NOT NULL,
  `start` date NOT NULL,
  `end` date NOT NULL,
  `duration` smallint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test`
--

LOCK TABLES `test` WRITE;
/*!40000 ALTER TABLE `test` DISABLE KEYS */;
INSERT INTO `test` VALUES (1,'Тестовый пример','Пример','2024-02-01','2024-02-03',30),(2,'Описание нового теста ','Новый тест','2024-04-19','2024-04-20',30),(3,'Описание ','Новый','2025-02-20','2025-03-20',15),(4,' Описание','Новый новый','2024-04-18','2024-04-19',15),(5,'Новое Описание','Новый новый2','2024-01-04','2024-01-05',15),(7,' hohoho','hohoho','2024-04-13','2024-04-21',15),(8,'Тест для курса материалы для FDM-печати','Материалы для FDM','2024-05-11','2024-07-27',10),(9,' Тест для курса: \"UP! 3D Printer mini\"','UP! 3D Printer mini','2024-06-05','2024-08-24',10);
/*!40000 ALTER TABLE `test` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test_course`
--

DROP TABLE IF EXISTS `test_course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `test_course` (
  `course_id` smallint unsigned NOT NULL,
  `test_id` smallint unsigned NOT NULL,
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `course_id_idx` (`course_id`),
  KEY `test_id_idx` (`test_id`),
  CONSTRAINT `tcourse_id` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`) ON DELETE CASCADE,
  CONSTRAINT `test_id` FOREIGN KEY (`test_id`) REFERENCES `test` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_course`
--

LOCK TABLES `test_course` WRITE;
/*!40000 ALTER TABLE `test_course` DISABLE KEYS */;
INSERT INTO `test_course` VALUES (1,1,1),(4,8,8),(5,9,9);
/*!40000 ALTER TABLE `test_course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `fio` varchar(70) NOT NULL,
  `email` varchar(30) DEFAULT NULL,
  `login` varchar(30) NOT NULL,
  `pass` varchar(100) NOT NULL,
  `gr` varchar(10) DEFAULT NULL,
  `role` char(1) NOT NULL,
  `bday` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Петров Петр Петрович','petr@mail.ru','petr','$2b$10$cH9VZJeuCBulqPlhmddEQe2O4ZJMqJhO3AU46qMwiD4SqGETU5PNu','101','1',NULL),(2,'Иванов Иван Иванович','ivan@mail.ru','teacher','$2b$10$qnyUd47DCXiW8SnFqeTrV.3T7VJNKC8sqFGisK4mb4n1kH4oWuRnm',NULL,'2',NULL),(3,'Михайлов Михаил Михайлович','michail@mail.ru','admin','$2b$10$Aap8IHnDEghdYjA.jMo9c.dtw4EjBc5ePilvEao2d8Wd3AYDoGRPS',NULL,'3',NULL),(4,'Сидоров Николай Валерьевич','sidor@mail.ru','sidor','$2b$10$cl0L9epcegQKmyGBwQvBeOwN4Rv57mf6aB/olvnVnDnJCg4hrd02.','101','1',NULL),(5,'Николаенко Павел Павлович','nikol@mail.ru','nikol','$2b$10$cwO8jUD3efOohm7KIPwk/OCwG9YVRbjBtqwkYGHQDCS2ltgIGmTiy',NULL,'3',NULL),(6,'Павлюченко Павел Романович','pavl@mail.ru','pavl','$2b$10$/yxaS5c1F8E4Tdyc.c4TR.ERvdE4iS4rLa.PwQ233Rq/nYtygBv1.',NULL,'2',NULL),(7,'Осипенко Степан Викторович','osip@mail.ru','osip','$2b$10$WmdZjq2/zGdDT5u2WW.kQe4Mrcccqn1QNbrwEsrKkIg8/0PWxz3Ae','105','1',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_answer`
--

DROP TABLE IF EXISTS `user_answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_answer` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `answer` json NOT NULL,
  `score` decimal(5,2) unsigned DEFAULT NULL,
  `question_id` int unsigned NOT NULL,
  `education_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `question_id_idx` (`question_id`),
  KEY `education_id_idx` (`education_id`),
  CONSTRAINT `education_id` FOREIGN KEY (`education_id`) REFERENCES `education` (`id`) ON DELETE CASCADE,
  CONSTRAINT `question_id` FOREIGN KEY (`question_id`) REFERENCES `question` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_answer`
--

LOCK TABLES `user_answer` WRITE;
/*!40000 ALTER TABLE `user_answer` DISABLE KEYS */;
INSERT INTO `user_answer` VALUES (31,'{\"id\": \"2\", \"ans\": [{\"text\": \"5\", \"right\": 0}, {\"text\": \"4\", \"right\": 1}, {\"text\": \"6\", \"right\": 0}], \"type\": \"1\"}',1.00,2,43),(32,'{\"id\": \"3\", \"ans\": [{\"text\": \"5\", \"right\": 0}, {\"text\": \"2+2\", \"right\": 1}, {\"text\": \"2*2\", \"right\": 1}], \"type\": \"2\"}',1.00,3,43),(33,'{\"id\": \"4\", \"ans\": [{\"text\": \"6\", \"right\": 1}], \"type\": \"3\"}',0.00,4,43),(34,'{\"id\": \"11\", \"ans\": [{\"text\": \"1+2\", \"right\": 1}, {\"text\": \"2+1\", \"right\": 1}, {\"text\": \"2+2\", \"right\": 0}], \"type\": \"2\"}',1.00,11,43),(35,'{\"id\": \"12\", \"ans\": [{\"text\": \"красный\", \"right\": 1}], \"type\": \"3\"}',1.00,12,43);
/*!40000 ALTER TABLE `user_answer` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-13  9:22:46
