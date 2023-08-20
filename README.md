# springboot-sample-app

## Requirements
create table JS_MENU
(
menu_seq          int(11) not null AUTO_INCREMENT,
menu_id      VARCHAR(100) not null,
menu_name_ko      VARCHAR(100) not null,
menu_name_en      VARCHAR(100) not null,
menu_up_seq       int(11) not null,
menu_path         VARCHAR(100),
menu_order        int(11),
delegate_flag     VARCHAR(1) default 'N',
trans_yn          VARCHAR(1) default 'N' not null,
defail_project_yn VARCHAR(1) default 'N' not null,
reg_id        VARCHAR(100) not null,
reg_dt     DATE not null,
upd_id   VARCHAR(100) not null,
upd_dt  DATE not null,
mobile_yn         VARCHAR(1) default 'N',
  PRIMARY KEY (menu_seq)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
create table JS_MENU_AUTH
(
auth_seq         int(11) not null,
menu_seq         int(11) not null,
auth_code        VARCHAR(100) not null,
auth_name        VARCHAR(100) not null,
reg_id       VARCHAR(100) not null,
reg_dt    DATE not null,
upd_id  VARCHAR(100) not null,
upd_dt DATE not null,
  PRIMARY KEY (auth_seq, menu_seq)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
create table JS_USER
(
user_id          VARCHAR(100) not null,
user_name        VARCHAR(100) not null,
TEL_NO varchar(20) DEFAULT NULL ,
EMAIL varchar(128) DEFAULT NULL,
user_pw          VARCHAR(300),
dept_name        VARCHAR(720),
user_pw_salt     VARCHAR(300),
mail             VARCHAR(100),
client_id varchar(20) DEFAULT NULL,
USER_STAT_CD varchar(10) DEFAULT NULL COMMENT '사용자상태(10:활성,20:잠김,30:보류,90:삭제)',
delegate_flag    VARCHAR(1) default 'N',
expire_flag      VARCHAR(1) default 'N',
DEVI_ID varchar(50) DEFAULT NULL COMMENT '디바이스',
DEVI_TP_CD varchar(10) DEFAULT NULL COMMENT '단말기타입',
DEVI_OS_VER varchar(10) DEFAULT NULL COMMENT '단말OS버전',
APP_REG varchar(250) DEFAULT NULL COMMENT '앱레지스트값',
APP_VER varchar(10) DEFAULT NULL COMMENT 'APP버전',
reg_id       VARCHAR(100) not null,
reg_dt    DATE not null,
upd_id  VARCHAR(100) not null,
upd_dt DATE not null,
  PRIMARY KEY (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
create table JS_USER_ROLE
(
user_id          VARCHAR(100) not null,
role_seq         int(11) not null,
reg_id       VARCHAR(100) not null,
reg_dt    DATE not null,
upd_id  VARCHAR(100) not null,
upd_dt DATE not null,
  PRIMARY KEY (user_id. role_seq)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
create table JS_ROLE
(
role_seq         int(11) not null AUTO_INCREMENT,
role_name        VARCHAR(100) not null,
delegate_flag    VARCHAR(1) default 'N',
reg_id       VARCHAR(100) not null,
reg_dt    DATE not null,
upd_id  VARCHAR(100) not null,
upd_dt DATE not null,
site_yn          VARCHAR(1) default 'N' not null,
  PRIMARY KEY (role_seq)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
create table JS_ROLE_MENU
(
role_seq         int(11) not null,
menu_seq         int(11) not null,
reg_id       VARCHAR(100) not null,
reg_dt    DATE not null,
upd_id  VARCHAR(100) not null,
upd_dt DATE not null,
  PRIMARY KEY (role_seq, menu_seq)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
create table JS_ROLE_MENU_AUTH
(
role_seq         int(11) not null,
menu_seq         int(11) not null,
auth_code        VARCHAR(100),
reg_id       VARCHAR(100) not null,
reg_dt    DATE not null,
upd_id  VARCHAR(100) not null,
upd_dt DATE not null,
  PRIMARY KEY (role_seq, menu_seq, auth_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
create table JS_SCHEDULE
(
sche_no          int(11) not null AUTO_INCREMENT,
sche_name        VARCHAR(50) not null,
sche_type        VARCHAR(10) not null,
sche_value       VARCHAR(20) not null,
sche_status      VARCHAR(1) not null,
sche_status_name VARCHAR(10) not null,
job_class        VARCHAR(50) not null,
is_use           VARCHAR(1),
reg_id       VARCHAR(100),
reg_dt    DATE,
upd_id  VARCHAR(100),
upd_dt DATE,
  PRIMARY KEY (sche_no)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
create table JS_SCHEDULE_HISTORY
(
hist_no           int(11) not null AUTO_INCREMENT,
sche_no           int(11),
job_key           VARCHAR(50),
job_firetime      TIMESTAMP(6),
job_runtime       INTEGER,
job_next_firetime TIMESTAMP(6),
job_status        VARCHAR(10),
error_message     VARCHAR(300),
  PRIMARY KEY (hist_no)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

## Copyright

Released under the Apache License 2.0. See the [LICENSE](https://github.com/codecentric/springboot-sample-app/blob/master/LICENSE) file.