-- phpMyAdmin SQL Dump
-- version phpStudy 2014
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2017 年 01 月 26 日 11:41
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
('eefasfsd', 1, '', 'fffff', 'ffff', 'C:UsersAdministratorDesktopproject\node-express-mysql/upload/userface/2017-01-04 14-43-47_9.jpg', '', 1483512227143),
('rrrrr', 1, '', 'fffffff', 'dfsafdasf', '', '', 1483951903871),
('fkasdjfklasd ', 5, '', 'admin', 'fdas', 'C:UsersAdministratorDesktopproject\node-express-mysql/upload/userface/2017-01-22 15-57-45_2017-01-18 ', '', 1485071865701),
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
  `themeimg` text NOT NULL,
  `content` text NOT NULL,
  `needwatermark` int(2) NOT NULL,
  `notpost` int(2) NOT NULL,
  `click` int(11) NOT NULL,
  `date` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=gbk AUTO_INCREMENT=123 ;

--
-- 转存表中的数据 `article`
--

INSERT INTO `article` (`id`, `title`, `diy`, `tag`, `weight`, `writer`, `type`, `keywords`, `description`, `themeimg`, `content`, `needwatermark`, `notpost`, `click`, `date`) VALUES
(118, '我的世界ba ', '', '', 0, '', '0', '', '只是想试试而已', '/upload/article/theme/2017-01-23 09-58-14_YT6`CJIUDV1{XURFG8@(NQH.gif', '<img src="/upload/article/images/20170123095814690.png" alt="" title="1.jpg" style="max-width: 100%;">', 0, 0, 0, '2017-01-23 09:58:14'),
(119, 'fdsaffdas', '', '', 0, '', '0', '', '', '/upload/article/theme/2017-01-23 09-58-46_7.jpg', '', 0, 0, 0, '2017-01-23 09:58:46'),
(120, 'eeeeeeeeeeeeeee', '', '', 0, '', '0', '', '', '/upload/article/theme/2017-01-23 09-59-04_9.jpg', '<img src="/upload/article/images/20170123095904639.png" alt="" title="4.jpg" style="max-width: 100%;">', 0, 0, 0, '2017-01-23 09:59:04'),
(121, '猴子的世界你懂么', '', '', 0, '', '0', '', '', '', '<img src="/upload/article/images/20170123095931719.png" alt="" title="9.jpg" style="max-width: 100%;"><img src="/upload/article/images/20170123095931239.png" alt="" title="1.jpg" style="max-width: 100%;">', 0, 0, 0, '2017-01-23 09:59:31'),
(122, 'jgjfg jgh j', '', '是嘛,大哥,你好', 0, '', '0', '', '', '/upload/article/theme/2017-01-23 10-00-16_3.jpg', '<img src="/upload/article/images/2017012314420086.png" alt="" title="1.jpg" style="max-width: 100%;">', 0, 0, 0, '2017-01-23 10:00:16');

-- --------------------------------------------------------

--
-- 表的结构 `nav`
--

CREATE TABLE IF NOT EXISTS `nav` (
  `id` int(2) NOT NULL AUTO_INCREMENT,
  `navname` varchar(100) NOT NULL,
  `navlink` varchar(100) NOT NULL DEFAULT '#',
  `navsort` int(10) NOT NULL,
  `navshow` int(2) NOT NULL DEFAULT '1',
  `navwindow` int(2) NOT NULL DEFAULT '0',
  `navpos` int(10) NOT NULL,
  `navcolid` int(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=gbk AUTO_INCREMENT=9 ;

--
-- 转存表中的数据 `nav`
--

INSERT INTO `nav` (`id`, `navname`, `navlink`, `navsort`, `navshow`, `navwindow`, `navpos`, `navcolid`) VALUES
(8, '9uuu', '/cat?id=38', 50, 0, 0, 0, 38),
(7, '2进口量放大', '/cat?id=16', 50, 1, 0, 0, 16);

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
  `date` datetime NOT NULL,
  `banner` text NOT NULL,
  `company` text NOT NULL,
  `telephone` varchar(100) NOT NULL,
  `fax` varchar(100) NOT NULL,
  `address` text NOT NULL,
  `logo` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=gbk;

--
-- 转存表中的数据 `web_cfg`
--

INSERT INTO `web_cfg` (`basehost`, `mainhost`, `hostname`, `webname`, `imgurl`, `docurl`, `docstyle`, `copyright`, `keywords`, `webdsc`, `beian`, `date`, `banner`, `company`, `telephone`, `fax`, `address`, `logo`) VALUES
('http://localhosft.com', '127', 'ko', '很无语', 'undefined', 0, 'default', 'ko', '看好你i哦', '狂拽炫', '050', '2017-01-23 09:50:52', '/upload/banner/2017-01-22 16-59-14_2017-01-18 23-41-36_slide.jpg,/upload/banner/2017-01-22 16-59-21_2017-01-18 23-43-06_slide-2.jpg,/upload/banner/2017-01-22 16-59-28_2017-01-18 23-43-15_slide-3.jpg', '成都乾隆科技有限公司', '02802802', 'ko', '东大街', '/upload/logo/2017-01-23 09-50-52_YT6`CJIUDV1{XURFG8@(NQH.gif');

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
  `link` text NOT NULL,
  `parentid` int(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `colname` (`colname`),
  KEY `colname_2` (`colname`),
  KEY `colname_3` (`colname`),
  KEY `id_2` (`id`),
  KEY `id_3` (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=gbk AUTO_INCREMENT=43 ;

--
-- 转存表中的数据 `web_column`
--

INSERT INTO `web_column` (`id`, `colname`, `hide`, `rank`, `sort`, `link`, `parentid`) VALUES
(22, '高的法规十多个', 1, 0, 50, '', 19),
(11, '你好', 1, 0, 50, '', 10),
(13, '德玛西亚之力', 1, 0, 10, '', 22),
(14, '德玛西亚之力', 1, 0, 10, '', 0),
(15, '德玛西亚之力', 1, 0, 10, '', 0),
(16, '进口量放大', 1, 0, 50, '', 0),
(17, '进口量放大', 1, 0, 50, '', 0),
(18, '进口量放大', 1, 0, 50, '', 0),
(19, 'fdafdasfasd', 1, 0, 50, '', 0),
(20, 'fdafdasfasd', 1, 0, 50, '', 0),
(23, '高都发生过', 1, 0, 50, '', 19),
(24, '发生大幅', 1, 0, 50, '', 0),
(25, '发达所发生的的发生发大水', 1, 0, 50, '', 22),
(26, '范德萨发生大发生', 1, 0, 50, '', 0),
(27, '点点点', 1, 0, 50, '', 25),
(28, '淡淡的谔谔', 1, 0, 50, '', 0),
(29, '额鹅鹅鹅', 1, 0, 50, '', 25),
(30, '改改改', 1, 0, 50, '', 0),
(31, 'qqqqqq', 1, 0, 50, '', 25),
(32, 'QQ群', 1, 0, 50, '', 25),
(33, '去去去去', 1, 0, 50, '', 0),
(34, 'WWW', 1, 0, 50, '', 33),
(35, 'WWW', 1, 0, 50, '', 33),
(36, 'WWW', 1, 0, 50, '', 33),
(37, '日日日', 1, 0, 50, '', 13),
(38, 'uuu', 1, 0, 50, '', 13),
(39, '柔柔弱弱', 1, 0, 50, '', 13),
(40, '柔柔弱弱', 1, 0, 50, '', 13),
(41, 'oooooo', 1, 0, 50, '', 13),
(42, 'pppppp', 1, 0, 50, '', 13);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
