# springboot-sample-app

## Requirements
create table DESM_MENU
(
menu_seq          NUMBER not null,
menu_name_ko      VARCHAR2(100) not null,
menu_name_en      VARCHAR2(100) not null,
menu_up_seq       NUMBER not null,
menu_path         VARCHAR2(100),
menu_order        NUMBER,
delegate_flag     VARCHAR2(1) default 'N',
created_by        VARCHAR2(100) not null,
creation_date     DATE not null,
last_updated_by   VARCHAR2(100) not null,
last_update_date  DATE not null,
trans_yn          VARCHAR2(1) default 'N' not null,
defail_project_yn VARCHAR2(1) default 'N' not null,
mobile_yn         VARCHAR2(1) default 'N'
)
create table DESM_MENU_AUTH
(
auth_seq         NUMBER not null,
menu_seq         NUMBER not null,
auth_code        VARCHAR2(100) not null,
auth_name        VARCHAR2(100) not null,
created_by       VARCHAR2(100) not null,
creation_date    DATE not null,
last_updated_by  VARCHAR2(100) not null,
last_update_date DATE not null
)
create table DESM_USER
(
user_ad          VARCHAR2(100) not null,
user_name        VARCHAR2(100) not null,
delegate_flag    VARCHAR2(1) default 'N',
created_by       VARCHAR2(100) not null,
creation_date    DATE not null,
last_updated_by  VARCHAR2(100) not null,
last_update_date DATE not null,
user_pw          VARCHAR2(300),
dept_name        VARCHAR2(720),
user_pw_salt     VARCHAR2(300),
mail             VARCHAR2(100),
expire_flag      VARCHAR2(1) default 'N',
idcs_yn          VARCHAR2(50) default 'N',
federated_yn     VARCHAR2(1),
lang             VARCHAR2(10)
)
create table DESM_USER_ROLE
(
user_ad          VARCHAR2(100) not null,
role_seq         NUMBER not null,
created_by       VARCHAR2(100) not null,
creation_date    DATE not null,
last_updated_by  VARCHAR2(100) not null,
last_update_date DATE not null
)
create table DESM_ROLE
(
role_seq         NUMBER not null,
role_name        VARCHAR2(100) not null,
delegate_flag    VARCHAR2(1) default 'N',
created_by       VARCHAR2(100) not null,
creation_date    DATE not null,
last_updated_by  VARCHAR2(100) not null,
last_update_date DATE not null,
site_yn          VARCHAR2(1) default 'N' not null
)
create table DESM_ROLE_MENU
(
role_seq         NUMBER not null,
menu_seq         NUMBER not null,
created_by       VARCHAR2(100) not null,
creation_date    DATE not null,
last_updated_by  VARCHAR2(100) not null,
last_update_date DATE not null
)
create table DESM_ROLE_MENU_AUTH
(
role_seq         NUMBER not null,
menu_seq         NUMBER not null,
auth_code        VARCHAR2(100),
created_by       VARCHAR2(100) not null,
creation_date    DATE not null,
last_updated_by  VARCHAR2(100) not null,
last_update_date DATE not null
)
create table DESM_SCHEDULER
(
sche_no          NUMBER not null,
sche_name        VARCHAR2(50) not null,
sche_type        VARCHAR2(10) not null,
sche_value       VARCHAR2(20) not null,
sche_status      VARCHAR2(1) not null,
sche_status_name VARCHAR2(10) not null,
job_class        VARCHAR2(50) not null,
created_by       VARCHAR2(100),
creation_date    DATE,
last_updated_by  VARCHAR2(100),
last_update_date DATE,
is_use           VARCHAR2(1)
)
create table DESM_SCHEDULE_HISTORY
(
hist_no           NUMBER not null,
sche_no           NUMBER,
job_key           VARCHAR2(50),
job_firetime      TIMESTAMP(6),
job_runtime       INTEGER,
job_next_firetime TIMESTAMP(6),
job_status        VARCHAR2(10),
error_message     VARCHAR2(300)
)

## Copyright

Released under the Apache License 2.0. See the [LICENSE](https://github.com/codecentric/springboot-sample-app/blob/master/LICENSE) file.