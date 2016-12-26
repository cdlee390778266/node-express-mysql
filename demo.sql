-- phpMyAdmin SQL Dump
-- version phpStudy 2014
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2016 年 12 月 26 日 18:38
-- 服务器版本: 5.5.40
-- PHP 版本: 5.3.29

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `demo`
--

-- --------------------------------------------------------

--
-- 表的结构 `administrators`
--

CREATE TABLE IF NOT EXISTS `administrators` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '管理员id',
  `level` int(11) NOT NULL,
  `name` text NOT NULL COMMENT '管理员名字',
  `password` text NOT NULL COMMENT '管理员密码',
  PRIMARY KEY (`level`),
  UNIQUE KEY `id` (`id`),
  KEY `id_2` (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=gbk AUTO_INCREMENT=3 ;

--
-- 转存表中的数据 `administrators`
--

INSERT INTO `administrators` (`id`, `level`, `name`, `password`) VALUES
(1, 1, 'admin', 'admin'),
(2, 2, 'root', 'root\r\n');

-- --------------------------------------------------------

--
-- 表的结构 `web_cfg`
--

CREATE TABLE IF NOT EXISTS `web_cfg` (
  `basehost` text NOT NULL,
  `mainhost` text NOT NULL,
  `hostname` text NOT NULL,
  `webname` text NOT NULL,
  `imgurl` text NOT NULL,
  `docurl` text NOT NULL,
  `docstyle` text NOT NULL,
  `copyright` text NOT NULL,
  `keywords` text NOT NULL,
  `webdsc` text NOT NULL,
  `beian` text NOT NULL,
  `date` date NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=gbk;

--
-- 转存表中的数据 `web_cfg`
--

INSERT INTO `web_cfg` (`basehost`, `mainhost`, `hostname`, `webname`, `imgurl`, `docurl`, `docstyle`, `copyright`, `keywords`, `webdsc`, `beian`, `date`) VALUES
('http://localhost', '/uploads', '主页', '我的网站', '/uploads', 'undefined', 'default', '', '', '', '', '2016-12-26'),
('http://localhost', '/uploads', '主页', '我的网站', '/uploads', 'undefined', 'default', '', '', '', '', '2016-12-26'),
('http://localhost', '/uploads', '主页', '我的网站', '/uploads', 'undefined', 'default', '', '', '', '', '2016-12-26'),
('http://localhost', '/uploads', '主页', '我的网站', '/uploads', 'undefined', 'default', '', '', '', '', '2016-12-26'),
('http://localhost', '/uploads', '主页', '我的网站', '/uploads', 'undefined', 'default', '', '', '', '', '2016-12-26'),
('http://localhost', '/uploads', '主页', '我的网站', '/uploads', 'undefined', 'default', '', '', '', '', '2016-12-26'),
('http://localhost', '/uploads', '主页', '我的网站', '/uploads', 'undefined', 'default', '', '', '', '', '2016-12-26'),
('http://localhost', '/uploads', '主页', '我的网站', '/uploads', 'undefined', 'default', '', '', '', '', '2016-12-26');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
