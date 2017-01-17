-- phpMyAdmin SQL Dump
-- version phpStudy 2014
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2017 年 01 月 17 日 18:19
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
) ENGINE=MyISAM  DEFAULT CHARSET=gbk;

--
-- 转存表中的数据 `administrators`
--

INSERT INTO `administrators` (`loginname`, `level`, `name`, `password`, `pseudonym`, `faceurl`, `eamil`, `logintime`) VALUES
('admin', 1, '张三', 'admin', '吹牛', '/view/admin/image/userface.jpg', '', 1482912791767),
('rootaa', 2, '李四', 'rootaa', '发生大', '', '', 1482910130458),
('eefasfsd', 1, '', 'fffff', 'ffff', 'C:UsersAdministratorDesktopproject\node-express-mysql/upload/userface/2017-01-04 14-43-47_9.jpg', '', 1483512227143),
('rrrrr', 1, '', 'fffffff', 'dfsafdasf', '', '', 1483951903871),
('feaeewfas', 3, '', 'ffffff', 'fffff', '', '', 1483951926426),
('fdsafdas', 4, '', 'fffff', 'fffff', '', '', 1483951946454),
('gfdsgdfgdfsg', 1, 'ffffdsa', 'ffffff', 'gg', 'C:UsersAdministratorDesktopproject\node-express-mysql/upload/userface/2017-01-17 17-37-09_2.jpg', '', 1484645829773),
('fdsafdsfdsaf', 1, '', 'fffff', 'ffffff', 'C:UsersAdministratorDesktopproject\node-express-mysql/upload/userface/2017-01-17 17-39-19_1.jpg', '', 1484645959430),
('grdfgdsfg', 1, '', 'ffffff', 'gfggggg', 'C:UsersAdministratorDesktopproject\node-express-mysql/upload/userface/2017-01-17 17-51-46_1.jpg', '', 1484646706462),
('fsdafsdaf', 1, 'ffffffff', 'ffffff', 'ffffff', 'C:UsersAdministratorDesktopproject\node-express-mysql/upload/userface/2017-01-17 17-56-27_6.jpg', '', 1484646987883),
('fdasfsdafasd', 1, '', 'ffffff', 'ffffff', 'C:UsersAdministratorDesktopproject\node-express-mysql/upload/userface/2017-01-17 17-56-58_1.jpg', '', 1484647018435);

-- --------------------------------------------------------

--
-- 表的结构 `article`
--

CREATE TABLE IF NOT EXISTS `article` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `title` text NOT NULL,
  `diy` varchar(100) NOT NULL,
  `tag` varchar(100) NOT NULL,
  `weight` int(100) NOT NULL DEFAULT '0',
  `writer` varchar(100) NOT NULL,
  `type` varchar(100) NOT NULL,
  `keywords` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `content` text NOT NULL,
  `needwatermark` int(2) NOT NULL,
  `notpost` int(2) NOT NULL,
  `click` int(11) NOT NULL,
  `date` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=gbk AUTO_INCREMENT=118 ;

--
-- 转存表中的数据 `article`
--

INSERT INTO `article` (`id`, `title`, `diy`, `tag`, `weight`, `writer`, `type`, `keywords`, `description`, `content`, `needwatermark`, `notpost`, `click`, `date`) VALUES
(115, 'rgsdfsgfsdgsd', '', '', 0, '', '0', '', '', 'pig', 0, 0, 0, '2017-01-17 16:02:53'),
(116, 'rgsdfsgfsdgsd', '', '', 0, '', '0', '', '', 'pig<img src="/upload/article/20170117160602758.png" alt="" title="5.jpg" style="max-width: 100%;">', 0, 0, 0, '2017-01-17 16:04:23'),
(117, 'fdsafasdfsdf', '', '', 0, '', '0', '', '', '<img src="/upload/article/20170117180119275.png" alt="" title="3.jpg" style="max-width: 100%;"><img src="/upload/article/20170117180145176.png" alt="" title="9.jpg" style="max-width: 100%;">', 0, 0, 0, '2017-01-17 18:01:19'),
(114, 'efaefasfdasf', '', '', 0, '', '0', '', '', 'pig', 0, 0, 0, '2017-01-17 16:02:24'),
(113, 'efaefasfdasf', '', '', 0, '', '0', '', '', '<img src="/upload/article/20170117160217191.png" alt="" title="6.jpg" style="max-width: 100%;"><img src="/upload/article/2017011716021737.png" alt="" title="9.jpg" style="max-width: 100%;"><img src="/upload/article/20170117160217108.png" alt="" title="KU]$24KIJC}ODY]LE[{_6WD.jpg" style="max-width: 100%;">', 0, 0, 0, '2017-01-17 16:02:17'),
(111, '坑货的世界啊', '', '', 0, '', '0', '', '', 'pig', 0, 0, 0, '2017-01-16 18:12:58'),
(112, 'efaefasfdasf', '', '', 0, '', '0', '', '', '<img src="/upload/article/20170117160141221.png" alt="" title="6.jpg" style="max-width: 100%;"><img src="/upload/article/20170117160141237.png" alt="" title="9.jpg" style="max-width: 100%;"><img src="/upload/article/20170117160141142.png" alt="" title="KU]$24KIJC}ODY]LE[{_6WD.jpg" style="max-width: 100%;">', 0, 0, 0, '2017-01-17 16:01:41'),
(110, '我有一只小毛驴', '', '', 0, '', '0', '', '', '<div align="center"><b>别坑我可以不</b><br><br><img src="/upload/article/20170116101021826.png" alt="" title="6.jpg" style="" width="300" height="200"></div>', 0, 0, 0, '2017-01-16 10:10:21'),
(109, '测试测试测试', '', '', 0, '', '0', '', '', 'pig<img src="/upload/article/20170116100511342.png" alt="" title="1.jpg" style="" width="266" height="200"><img src="/upload/article/20170116100511525.png" alt="" title="4.jpg" style="" width="266" height="200"><img src="/upload/article/20170116100511299.png" alt="" title="7.jpg" style="" width="320" height="200"><img src="/upload/article/20170116100511192.png" alt="" title="KU]$24KIJC}ODY]LE[{_6WD.jpg" style="" width="266" height="200">', 0, 0, 0, '2017-01-16 10:04:45');

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
('http://localhosft.com', 'undefined', 'undefined', '我的网站', 'undefined', 0, 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', '2017-01-17 16:09:10');

-- --------------------------------------------------------

--
-- 表的结构 `web_column`
--

CREATE TABLE IF NOT EXISTS `web_column` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `colname` varchar(100) NOT NULL,
  `hide` int(1) NOT NULL,
  `rank` int(100) NOT NULL,
  `sort` int(100) NOT NULL,
  `ttid` varchar(100) NOT NULL,
  `parentid` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `colname` (`colname`),
  KEY `colname_2` (`colname`),
  KEY `colname_3` (`colname`),
  KEY `id_2` (`id`),
  KEY `id_3` (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=gbk AUTO_INCREMENT=8 ;

--
-- 转存表中的数据 `web_column`
--

INSERT INTO `web_column` (`id`, `colname`, `hide`, `rank`, `sort`, `ttid`, `parentid`) VALUES
(2, '这好坑的啊', 1, 1, 1, '1', '0'),
(3, '呀呀呀的最爱', 1, 50, 2, '2', '1'),
(4, '我是一只小小老', 1, 0, 50, '1-2', '1'),
(5, '范德萨发大水', 0, 0, 0, '1-1', '1'),
(6, '范德萨发大水', 0, 0, 50, '23', '1'),
(7, '范德萨发大水', 0, 0, 0, '6', '1');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
