BEGIN TRANSACTION;
CREATE TABLE `user` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `firstName` VARCHAR(255), `lastName` VARCHAR(255), `email` VARCHAR(255) UNIQUE, `password` VARCHAR(255), `hashcode` VARCHAR(255) UNIQUE, `since` DATETIME, `bio` VARCHAR(255), `major` VARCHAR(255), `image` VARCHAR(255), `filename` VARCHAR(255), `linkedin` VARCHAR(255), `twitter` VARCHAR(255), `facebook` VARCHAR(255), `tags` VARCHAR(255), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, UNIQUE (email), UNIQUE (hashcode));
INSERT INTO `user` (id,firstName,lastName,email,password,hashcode,since,bio,major,image,filename,linkedin,twitter,facebook,tags,createdAt,updatedAt) VALUES (1,'Seyedamirhossein','Hesamian','hesamian@uwm.edu','0ffda192f975ce2b646acdf22a290a132436ce98','6a42fe46267df31e5040ba393d291158925a1d81','2016-11-13 01:35:45.271 +00:00','From Iran, naturalized U.S. citizen.','Computer Science','1','6a42fe46267df31e5040ba393d291158925a1d81.jpg','https://www.linkedin.com/in/hesamian','https://www.linkedin.com/in/twitter','https://www.linkedin.com/in/facebook',';git;vim;java;javascript;python;node;REST','2016-11-13 01:35:45.271 +00:00','2016-11-13 02:58:42.702 +00:00');
CREATE TABLE `rate` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `hashcode` VARCHAR(255), `value` DECIMAL DEFAULT 0, `target` VARCHAR(255), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL);
CREATE TABLE `information` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `hashcode` VARCHAR(255), `type` VARCHAR(255), `title` VARCHAR(255), `start` VARCHAR(255), `end` VARCHAR(255), `details` TEXT, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL);
INSERT INTO `information` (id,hashcode,type,title,start,end,details,createdAt,updatedAt) VALUES (1,'6a42fe46267df31e5040ba393d291158925a1d81','education','Master of Science: Computer Science ','2015','2016','<p style="line-height: 1;"><span id="docs-internal-guid-361b93dd-5b55-0c1b-808c-d5b8b287535e"><span style="vertical-align: baseline; font-size: 12px;"><b>University of Wisconsin-Milwaukee, Milwaukee, WI</b></span></span></p><p style="line-height: 1;"><span style="font-size: 12px;">Focusing on Lattice cryptography (post quantum crypto) and LWE for master thesis</span><br></p>','2016-11-13 01:38:55.402 +00:00','2016-11-13 01:47:48.179 +00:00');
INSERT INTO `information` (id,hashcode,type,title,start,end,details,createdAt,updatedAt) VALUES (2,'6a42fe46267df31e5040ba393d291158925a1d81','education',' Bachelor of Science: Computer Science','2011','2015','<p style="line-height: 1;"><span id="docs-internal-guid-361b93dd-5b57-4e44-c963-2350acf3dbf9"><span style="vertical-align: baseline; font-size: 12px;"><b>University of Wisconsin-Milwaukee, Milwaukee, WI</b></span></span></p><p style="line-height: 1;"><span style="font-size: 12px;">with Honors, GPA: 3.71</span></p>','2016-11-13 01:40:20.690 +00:00','2016-11-13 01:47:40.537 +00:00');
INSERT INTO `information` (id,hashcode,type,title,start,end,details,createdAt,updatedAt) VALUES (3,'6a42fe46267df31e5040ba393d291158925a1d81','experience','Graduate Teaching Assistant','2015','2016','<span id="docs-internal-guid-361b93dd-5b5a-3939-33e6-671bf4344e82"><p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt;"><span style="vertical-align: baseline; font-size: 12px;"><b>UW-Milwaukee Department of Computer Science, Milwaukee, WI</b></span></p><p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt;"><span style="font-size: 12px;">TA for CS-315 (Assembly language programming - MIPS). Duties and responsibilities:</span></p><ul><li style="line-height: 1.2; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 12px;">Conduct discussion and lab sessions</span></li><li style="line-height: 1.2; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 12px;">Write and grade questions for programming sections of the exams</span></li><li style="line-height: 1.2; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 12px;">Write and grade weekly programming homework</span></li><li style="line-height: 1.2; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 12px;">Write lecture notes for students and other TAs responsible for this class</span></li></ul></span> ','2016-11-13 01:44:13.437 +00:00','2016-11-13 01:47:25.881 +00:00');
INSERT INTO `information` (id,hashcode,type,title,start,end,details,createdAt,updatedAt) VALUES (4,'6a42fe46267df31e5040ba393d291158925a1d81','experience','Intern Internet Application Developer','2015','2015','<span id="docs-internal-guid-8d56e7e6-5b5c-44f3-34a4-48b1c1f4d790"><p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt;"><span style="vertical-align: baseline; font-size: 12px;"><b>Northwestern Mutual, Enterprise Projects Department, Milwaukee, WI</b></span></p><p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt;"><span style="vertical-align: baseline; font-size: 12px;">OBA Project (Scrum Team)</span></p><ul style="margin-top:0pt;margin-bottom:0pt;"><li dir="ltr" style="list-style-type: disc; vertical-align: baseline;"><p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt;"><span style="vertical-align: baseline; font-size: 12px;">Worked mostly with Underscore.js, Backbone.js, and Backbone-forms module for front-end of “outside business activity wizard” web application (OBA wizard), and also Node.js / Express.js for proof of concept work</span></p></li><li dir="ltr" style="list-style-type: disc; vertical-align: baseline;"><p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt;"><span style="vertical-align: baseline; font-size: 12px;">Added grunt and bower to build the project''s dependencies, Minify JavaScript files and perform package management and versioning</span></p></li><li dir="ltr" style="list-style-type: disc; vertical-align: baseline;"><p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt;"><span style="vertical-align: baseline; font-size: 12px;">Converted all of the outside business activity disclosure forms to the relational database format (IBM DB2 and SQLite), in addition to design wizard steps and paths to allow wizard application fetch data and create forms &nbsp;</span></p></li><li dir="ltr" style="list-style-type: disc; vertical-align: baseline;"><p dir="ltr" style="line-height: 1.2; margin-top: 0pt; margin-bottom: 0pt;"><span style="vertical-align: baseline; font-size: 12px;">Worked briefly with Java EE and WebSphere for back-end (WebUI and Web Services)</span></p></li></ul></span> ','2016-11-13 01:45:47.756 +00:00','2016-11-13 01:47:20.383 +00:00');
INSERT INTO `information` (id,hashcode,type,title,start,end,details,createdAt,updatedAt) VALUES (5,'6a42fe46267df31e5040ba393d291158925a1d81','experience','Undergraduate Researcher','2015','2016','<span id="docs-internal-guid-8d56e7e6-5b5e-9534-169c-ded71b424993"><p dir="ltr" style="line-height: 1; margin-top: 0pt; margin-bottom: 0pt;"><span style="vertical-align: baseline; font-size: 12px;"><b>UW-Milwaukee Department of Material Science and Engineering, Milwaukee, WI</b></span></p><ul style="margin-top:0pt;margin-bottom:0pt;"><li dir="ltr" style="list-style-type: disc; vertical-align: baseline; line-height: 1;"><p dir="ltr" style="line-height: 1; margin-top: 0pt; margin-bottom: 0pt;"><span style="vertical-align: baseline; font-size: 12px;">Worked with Dr. Pradeep Rohatgi (Distinguished Professor) to implement MAGMA and SolidWorks software in order to simulate Solidification of different materials and teach graduate students how to use the software. Utilized knowledge in Computational Geometry and Differential Equations</span></p></li></ul></span> ','2016-11-13 01:48:30.238 +00:00','2016-11-13 01:49:12.409 +00:00');
INSERT INTO `information` (id,hashcode,type,title,start,end,details,createdAt,updatedAt) VALUES (6,'6a42fe46267df31e5040ba393d291158925a1d81','experience','IT Specialist','2011','2011','<span id="docs-internal-guid-8d56e7e6-5b60-2ee9-6a59-d0e18f9fb746"><p dir="ltr" style="line-height: 1; margin-top: 0pt; margin-bottom: 0pt;"><b><span style="vertical-align: baseline; font-size: 12px;">Swick Technologies, Wauwatosa, WI</span><span style="vertical-align: baseline;"><span class="Apple-tab-span" style="white-space: pre; font-size: 12px;">	</span></span><span style="vertical-align: baseline; font-size: 12px;"> </span></b></p><p dir="ltr" style="line-height: 1; margin-top: 0pt; margin-bottom: 0pt;"><span style="vertical-align: baseline; font-size: 12px;">IT Specialist, July 2011 - August 2011</span></p><ul style="margin-top:0pt;margin-bottom:0pt;"><li dir="ltr" style="list-style-type: disc; vertical-align: baseline; line-height: 1;"><span style="vertical-align: baseline; font-size: 12px;">Worked with Active Directory and Microsoft Deployment Services to deploy Windows-7 on High School computers</span></li></ul></span>','2016-11-13 01:50:09.111 +00:00','2016-11-13 01:50:09.111 +00:00');
INSERT INTO `information` (id,hashcode,type,title,start,end,details,createdAt,updatedAt) VALUES (7,'6a42fe46267df31e5040ba393d291158925a1d81','project','web developer','2015','2016','<span id="docs-internal-guid-8d56e7e6-5b61-d92d-2942-40e7f6c6424a"><p dir="ltr" style="line-height: 1; margin-top: 0pt; margin-bottom: 0pt;"><span style="vertical-align: baseline; font-size: 12px;"><b>Web Developer &amp; Network Specialist, 2009 – August 2010</b></span></p><ul style="margin-top:0pt;margin-bottom:0pt;"><li dir="ltr" style="list-style-type: disc; vertical-align: baseline; line-height: 1;"><p dir="ltr" style="line-height: 1; margin-top: 0pt; margin-bottom: 0pt;"><span style="vertical-align: baseline; font-size: 12px;">Developer of upload center website (</span><a href="http://uploadbaz.com/"><span style="vertical-align: baseline; font-size: 12px;">uploadbaz.com</span></a><span style="vertical-align: baseline; font-size: 12px;">) which is based on "XFileSharing Pro" script and has a global rank of ~5000 according to Alexa.com</span></p></li><li dir="ltr" style="list-style-type: disc; vertical-align: baseline; line-height: 1;"><p dir="ltr" style="line-height: 1; margin-top: 0pt; margin-bottom: 0pt;"><span style="vertical-align: baseline; font-size: 12px;">Developer of a Persian music portal/Website (</span><a href="http://www.2musicbaran.biz/"><span style="vertical-align: baseline; font-size: 12px;">musicbaran.com</span></a><span style="vertical-align: baseline; font-size: 12px;">) which uses custom theme based on "Php-Nuke" framework</span></p></li><li dir="ltr" style="list-style-type: disc; vertical-align: baseline; line-height: 1;"><p dir="ltr" style="line-height: 1; margin-top: 0pt; margin-bottom: 0pt;"><span style="vertical-align: baseline; font-size: 12px;">Developer of domain and hosting services website (</span><a href="http://itjavani.ir/"><span style="vertical-align: baseline; font-size: 12px;">ITjavani.ir</span></a><span style="vertical-align: baseline; font-size: 12px;">) which uses custom theme based on Drupal Framework</span></p></li><li dir="ltr" style="list-style-type: disc; vertical-align: baseline; line-height: 1;"><p dir="ltr" style="line-height: 1; margin-top: 0pt; margin-bottom: 0pt;"><span style="vertical-align: baseline; font-size: 12px;">Implemented Proxy and VPN Server (PPPoE-L2TP-Ipsec-OpenVPN) on Ubuntu and Windows Server to bypass filtered Internet</span></p></li></ul></span> ','2016-11-13 01:52:07.558 +00:00','2016-11-13 01:52:51.823 +00:00');
CREATE TABLE `Sessions` (`sid` VARCHAR(32) PRIMARY KEY, `expires` DATETIME, `data` TEXT, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL);
COMMIT;
