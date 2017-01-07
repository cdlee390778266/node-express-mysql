-- phpMyAdmin SQL Dump
-- version phpStudy 2014
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2017 年 01 月 07 日 13:27
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
  `loginname` varchar(100) NOT NULL COMMENT '管理员id',
  `level` int(11) NOT NULL,
  `name` varchar(100) NOT NULL COMMENT '管理员名字',
  `password` varchar(100) NOT NULL COMMENT '管理员密码',
  `pseudonym` varchar(100) NOT NULL COMMENT '笔名',
  `faceurl` varchar(100) NOT NULL,
  `eamil` varchar(100) NOT NULL,
  `logintime` bigint(255) NOT NULL,
  PRIMARY KEY (`loginname`),
  UNIQUE KEY `id` (`loginname`),
  KEY `id_2` (`loginname`)
) ENGINE=MyISAM DEFAULT CHARSET=gbk;

--
-- 转存表中的数据 `administrators`
--

INSERT INTO `administrators` (`loginname`, `level`, `name`, `password`, `pseudonym`, `faceurl`, `eamil`, `logintime`) VALUES
('admin', 1, '张三', 'admin', '吹牛', '/view/admin/image/userface.jpg', '', 1482912791767),
('eeeee', 1, '', 'qqqqq', 'eeeee', 'C:UsersAdministratorDesktopprojectproject/upload/2017-01-02 22-39-12_', '', 1483367952014),
('testid', 1, '', 'admin', '店小二', 'C:UsersAdministratorDesktopprojectproject/upload/2017-01-02 18-08-18_MYXJ_20160319143116_fast.jpg', '', 1483351698570),
('lalalla ', 4, '', 'aaaaa', 'kkkk', 'C:UsersAdministratorDesktopprojectproject/upload/2017-01-02 22-35-39_', '', 1483367739509),
('QQQQQ', 1, '', 'QQQQQQQ', 'QQ', 'C:UsersAdministratorDesktopprojectproject/upload/2017-01-02 22-40-27_', '', 1483368027097),
('aaaaa', 1, '', 'ffffff', 'ffff', '', '', 1483368260325),
('ddedd', 1, '', 'eeeee', 'ffffff', 'C:UsersAdministratorDesktopprojectproject/upload/2017-01-02 22-45-05_MYXJ_20160319143116_fast.jpg', '', 1483368305041),
('ggggg', 1, '', 'eeeee', 'eeeee', '', '', 1483368390587),
('eeeeee', 1, '', 'ffffff', 'eeeeee', '', '', 1483369212391),
('undefined', 0, 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 0),
('eeeeeee', 1, '', 'eeeeee', 'eeeee', '', '', 1483369973467),
('wwwww', 1, '', 'ffffff', 'wwwww', 'C:UsersAdministratorDesktopprojectproject/upload/2017-01-02 23-20-14_IMG_20160319_144238.jpg', '', 1483370414350),
('eeafdasf', 1, '', 'fffffffffff', 'fffff', '', '', 1483370472817),
('eeeeeeee', 1, '', 'fffff', 'fffff', 'C:UsersAdministratorDesktopprojectproject/upload/2017-01-02 23-22-01_IMG_20160319_131115.jpg', '', 1483370521602),
('wwwwww', 1, '', 'fffff', 'ffffff', '', '', 1483370547467),
('ffffff', 1, '', 'eeeee', 'eeeee', 'C:UsersAdministratorDesktopprojectproject/upload/2017-01-02 23-24-23_IMG_20160319_094719.jpg', '', 1483370662960),
('dfasfdsafdsa', 1, '', 'fffff', 'fffff', 'C:UsersAdministratorDesktopprojectproject/upload/2017-01-02 23-25-03_IMG_20160319_131115.jpg', '', 1483370702670),
('eeefsadfdsa', 1, '', 'ffffff', 'fffff', '', '', 1483370723709),
('ewarfawfdsa', 1, '', 'ffffff', 'ffffff', 'C:UsersAdministratorDesktopprojectproject/upload/2017-01-02 23-25-43_九九勇士002.jpg', '', 1483370743321);

-- --------------------------------------------------------

--
-- 表的结构 `article`
--

CREATE TABLE IF NOT EXISTS `article` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `diy` varchar(100) NOT NULL,
  `tag` varchar(100) NOT NULL,
  `weight` int(100) NOT NULL,
  `writer` varchar(100) NOT NULL,
  `type` varchar(100) NOT NULL,
  `keywords` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `content` text NOT NULL,
  `needwatermark` int(11) NOT NULL,
  `notpost` int(11) NOT NULL,
  `click` int(11) NOT NULL,
  `date` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=gbk AUTO_INCREMENT=24 ;

--
-- 转存表中的数据 `article`
--

INSERT INTO `article` (`id`, `title`, `diy`, `tag`, `weight`, `writer`, `type`, `keywords`, `description`, `content`, `needwatermark`, `notpost`, `click`, `date`) VALUES
(1, '', '', '', 0, '', '1', '', '', '<img src="undefined" alt="" title="MYXJ_20160319143116_fast.jpg" style="" width="149" height="200">', 0, 0, 0, ''),
(2, '', '', '', 0, '', '1', '', '', '<img src="C:UsersAdministratorDesktopprojectproject/upload/article/20170107113527410.png" alt="" title="MYXJ_20160319143116_fast.jpg" style="" width="149" height="200">', 0, 0, 0, ''),
(3, '', '', '', 0, '', '1', '', '', '<img src="undefined" alt="" title="MYXJ_20160319143116_fast.jpg" style="" width="149" height="200">', 0, 0, 0, ''),
(4, '', '', '', 0, '', '1', '', '', '<br>', 0, 0, 0, ''),
(5, '', '', '', 0, '', '1', '', '', '<br>', 0, 0, 0, ''),
(6, '', '', '', 0, '', '1', '', '', '<br>', 0, 0, 0, ''),
(7, '', '', '', 0, '', '1', '', '', '<br>', 0, 0, 0, ''),
(8, '', '', '', 0, '', '1', '', '', '<br>', 0, 0, 0, ''),
(9, '', '', '', 0, '', '1', '', '', '<br>', 0, 0, 0, ''),
(10, '', '', '', 0, '', '1', '', '', '<br>', 0, 0, 0, ''),
(11, '', '', '', 0, '', '1', '', '', '<br>', 0, 0, 0, ''),
(12, '', '', '', 0, '', '1', '', '', '<br>', 0, 0, 0, ''),
(13, '', '', '', 0, '', '1', '', '', '<br>', 0, 0, 0, ''),
(14, '', '', '', 0, '', '1', '', '', '<br>', 0, 0, 0, ''),
(15, '', '', '', 0, '', '1', '', '', '<br>', 0, 0, 0, ''),
(16, '', '', '', 0, '', '1', '', '', '<br>', 0, 0, 0, ''),
(17, '', '', '', 0, '', '1', '', '', '<br>', 0, 0, 0, ''),
(18, '', '', '', 0, '', '1', '', '', '<br>', 0, 0, 0, ''),
(19, '', '', '', 0, '', '1', '', '', '<br>', 0, 0, 0, ''),
(20, 'fasdfdsaf', '', '', 0, '', '1', '', '', '<br>', 0, 0, 0, ''),
(21, 'fdsafdsaf', '', '', 0, '', '1', '', '', '<br>', 0, 0, 0, ''),
(22, '的范德萨发大水发', '', '', 0, '', '1', '', '', '', 0, 0, 0, '2016-12-09 14:50:19'),
(23, '惹444 ', '', '', 0, '', '1', '', '', '', 0, 0, 0, '2017-01-07 12:56:42');

-- --------------------------------------------------------

--
-- 表的结构 `userlevel`
--

CREATE TABLE IF NOT EXISTS `userlevel` (
  `level` int(1) NOT NULL,
  `levelname` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=gbk;

--
-- 转存表中的数据 `userlevel`
--

INSERT INTO `userlevel` (`level`, `levelname`) VALUES
(1, '超级管理员'),
(2, '频道管理员'),
(3, '信息发布员');

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
  `docurl` int(2) NOT NULL,
  `docstyle` text NOT NULL,
  `copyright` text NOT NULL,
  `keywords` text NOT NULL,
  `webdsc` text NOT NULL,
  `beian` text NOT NULL,
  `date` datetime NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=gbk;

--
-- 转存表中的数据 `web_cfg`
--

INSERT INTO `web_cfg` (`basehost`, `mainhost`, `hostname`, `webname`, `imgurl`, `docurl`, `docstyle`, `copyright`, `keywords`, `webdsc`, `beian`, `date`) VALUES
('http://localhos.com', '/uploads', '主页', '这是一个模板网站', '/uploads', 1, 'default', 'LEE', '狂拽炫', '非主流', '250', '2017-01-02 20:09:27');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
