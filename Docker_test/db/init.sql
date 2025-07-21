ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'root';
FLUSH PRIVILEGES;

CREATE DATABASE IF NOT EXISTS gsc CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;


USE gsc;


/**
  기준 정보 테이블 생성
 */

-- 2. 학년 테이블
CREATE TABLE grades (
    grade_id CHAR(5) PRIMARY KEY,
    name VARCHAR(20) NOT NULL
);

-- 3. 레벨 테이블
CREATE TABLE level (
    level_id CHAR(5) PRIMARY KEY,
    name VARCHAR(20) NOT NULL
);

-- 4. 국적 테이블
CREATE TABLE nationality (
    nationality_id CHAR(5) PRIMARY KEY,
    name VARCHAR(20) NOT NULL
);

-- 5. 레벨 클래스 (반) 테이블
CREATE TABLE level_class (
    class_id CHAR(5) PRIMARY KEY,
    level_id CHAR(5) NOT NULL,
    name VARCHAR(20) NOT NULL,
    FOREIGN KEY (level_id) REFERENCES level(level_id)
);

/**
  사용자 및 권한 관련 테이블
 */

-- 1. 공통 사용자 정보
CREATE TABLE user_account (
    user_id CHAR(10) PRIMARY KEY,
    google_id VARCHAR(255) UNIQUE,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20) UNIQUE,
    status ENUM('ACTIVE', 'INACTIVE') DEFAULT 'INACTIVE',
    refresh_token VARCHAR(200),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. 사용자 역할
CREATE TABLE user_role (
    role_type ENUM('STUDENT', 'PROFESSOR', 'ADMIN') NOT NULL,
    user_id CHAR(10),
    PRIMARY KEY (role_type, user_id),
    FOREIGN KEY (user_id) REFERENCES user_account(user_id) ON DELETE CASCADE
);

-- 3. 학생 정보
CREATE TABLE student_entity (
    user_id VARCHAR(10) PRIMARY KEY,
    grade_id CHAR(5),
    class_id CHAR(5),
    nationality_id CHAR(5),
    FOREIGN KEY (user_id) REFERENCES user_account(user_id),
    FOREIGN KEY (grade_id) REFERENCES grades(grade_id),
    FOREIGN KEY (class_id) REFERENCES level_class(class_id),
    FOREIGN KEY (nationality_id) REFERENCES nationality(nationality_id)
);

-- 4. 교수 정보
CREATE TABLE professor_entity (
    professor_id VARCHAR(10) PRIMARY KEY,
    user_id CHAR(10) NOT NULL UNIQUE,
    FOREIGN KEY (user_id) REFERENCES user_account(user_id)
);

-- 5. 관리자 정보
CREATE TABLE admin_entity (
    admin_id VARCHAR(10) PRIMARY KEY,
    user_id CHAR(10) NOT NULL UNIQUE,
    FOREIGN KEY (user_id) REFERENCES user_account(user_id)
);

/**
  강의 관련 테이블
 */

-- 1. section - 학기 단위 정보
CREATE TABLE section (
    sec_id CHAR(8) PRIMARY KEY,
    year YEAR NOT NULL,
    semester ENUM('1', '2', 'S', 'W') NOT NULL COMMENT '1: 1학기, 2: 2학기, S: 여름학기, W: 겨울학기'
);

-- 2. course 강의 정보
CREATE TABLE course (
    course_id CHAR(10) PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    is_special BOOLEAN DEFAULT FALSE,
    sec_id CHAR(8) NOT NULL,
    professor_id CHAR(10),
    FOREIGN KEY (sec_id) REFERENCES section(sec_id),
    FOREIGN KEY (professor_id) REFERENCES professor_entity(professor_id)
);

-- 3. course_target 강의 대상 필터 (학년/레벨 하나만 존재)
CREATE TABLE course_target (
    target_id CHAR(10) PRIMARY KEY,
    course_id CHAR(10) NOT NULL,
    grade_id CHAR(5) NOT NULL,
    level_id CHAR(5) NOT NULL,
    nationality_id CHAR(5) NOT NULL,
    FOREIGN KEY (course_id) REFERENCES course(course_id),
    FOREIGN KEY (grade_id) REFERENCES grades(grade_id),
    FOREIGN KEY (level_id) REFERENCES level(level_id),
    FOREIGN KEY (nationality_id) REFERENCES nationality(nationality_id)
);

-- 4. course_nationality 강의 수강 가능한 국적 (다대다)
CREATE TABLE course_nationality (
    course_id CHAR(10) NOT NULL,
    nationality_id CHAR(5) NOT NULL,
    PRIMARY KEY (course_id, nationality_id),
    FOREIGN KEY (course_id) REFERENCES course(course_id),
    FOREIGN KEY (nationality_id) REFERENCES nationality(nationality_id)
);

/**
    시간표 및 이벤트 관련 테이블
 */

-- 1. 시간 정보
CREATE TABLE time_slot (
    time_slot_id CHAR(6) PRIMARY KEY,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL
);

-- 2. 강의실 정보
CREATE TABLE classroom (
    classroom_id CHAR(6) PRIMARY KEY,
    building VARCHAR(50) NOT NULL,
    room_number VARCHAR(10) NOT NULL
);

-- 3. 시간표 정보
CREATE TABLE timetable (
    schedule_id CHAR(10) PRIMARY KEY,
    course_id CHAR(10) NOT NULL,
    day ENUM('MON', 'TUE', 'WED', 'THU', 'FRI') NOT NULL,
    time_slot_id CHAR(6) NOT NULL,
    classroom_id CHAR(6) NOT NULL,
    FOREIGN KEY (course_id) REFERENCES course(course_id),
    FOREIGN KEY (time_slot_id) REFERENCES time_slot(time_slot_id),
    FOREIGN KEY (classroom_id) REFERENCES classroom(classroom_id)
);

-- 4. course_event 특강 / 보강 / 휴강
CREATE TABLE course_event (
    event_id CHAR(10) PRIMARY KEY,
    course_id CHAR(10) NOT NULL,
    event_type ENUM('makeup', 'CANCEL', 'SPECIAL') NOT NULL,
    event_date DATE NOT NULL,
    time_slot_id CHAR(6),
    classroom_id CHAR(6),
    FOREIGN KEY (course_id) REFERENCES course(course_id),
    FOREIGN KEY (time_slot_id) REFERENCES time_slot(time_slot_id),
    FOREIGN KEY (classroom_id) REFERENCES classroom(classroom_id)
);

/**
  공지사항 관련 테이블
 */
-- 1. 공지사항
CREATE TABLE notice (
    notice_id CHAR(5) PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    course_id CHAR(10) NULL,
    user_id CHAR(10) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
    send_line BOOLEAN DEFAULT FALSE,
    send_calendar BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (course_id) REFERENCES course(course_id),
    FOREIGN KEY (user_id) REFERENCES user_account(user_id)
);

-- 첨부파일
CREATE TABLE notice_attachments (
    attachment_id CHAR(10) PRIMARY KEY,
    notice_id CHAR(10) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_url TEXT NOT NULL,
    uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (notice_id) REFERENCES notice(notice_id)
);

-- notice_target - 공지 대상 지정
CREATE TABLE notice_target (
    notice_target_id CHAR(10) PRIMARY KEY,
    notice_id CHAR(10) NOT NULL,
    grade_id CHAR(5),
    level_id CHAR(5),
    nationality_id CHAR(5),
    FOREIGN KEY (notice_id) REFERENCES notice(notice_id),
    FOREIGN KEY (grade_id) REFERENCES grades(grade_id),
    FOREIGN KEY (level_id) REFERENCES level(level_id),
    FOREIGN KEY (nationality_id) REFERENCES nationality(nationality_id)
);

-- notice_line 라인 전송 전송
CREATE TABLE notice_line (
    notice_id CHAR(10),
    student_id CHAR(10),
    sent_at DATETIME,
    PRIMARY KEY (notice_id, student_id),
    FOREIGN KEY (notice_id) REFERENCES notice(notice_id),
    FOREIGN KEY (student_id) REFERENCES student_entity(user_id)
);

-- ? notice calendar
CREATE TABLE notice_calendar (
    notice_id CHAR(10) PRIMARY KEY,
    google_event_id VARCHAR(255),
    html_link TEXT,
    FOREIGN KEY (notice_id) REFERENCES notice(notice_id)
);

/**
  라인 인증 및 연동 관련 테이블
 */

 -- 라인 인증 요청 토큰 저장
 CREATE TABLE line_auth_token (
     token CHAR(6) PRIMARY KEY,
     user_id CHAR(10) NOT NULL,
     student_id CHAR(10) NOT NULL,
     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
     is_verified BOOLEAN DEFAULT FALSE,
     FOREIGN KEY (user_id) REFERENCES user_account(user_id),
     FOREIGN KEY (student_id) REFERENCES student_entity(student_id)
 );

 -- line-entity 사용자 정보 연동
CREATE TABLE line_entity (
    student_id CHAR(10) PRIMARY KEY,
    user_id CHAR(10) NOT NULL,
    line_id VARCHAR(50) UNIQUE NOT NULL, -- LINE UID (UXXXXXX) 형태
    linked_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    receive_line_message BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (user_id) REFERENCES user_account(user_id),
    FOREIGN KEY (student_id) REFERENCES student_entity(student_id)
);

-- 학생 과목 연결
CREATE TABLE student_course (
    course_id CHAR(10) NOT NULL,
    student_id CHAR(10) NOT NULL,
    course_by_line TEXT,
    PRIMARY KEY (course_id, student_id),
    FOREIGN KEY (course_id) REFERENCES course(course_id),
    FOREIGN KEY (student_id) REFERENCES student_entity(student_id)
);

-- 교수 과목 연결
CREATE TABLE course_professor (
    professor_id CHAR(10) NOT NULL,
    course_id CHAR(10) NOT NULL,
    course_by_line TEXT,
    PRIMARY KEY (professor_id, course_id),
    FOREIGN KEY (professor_id) REFERENCES professor_entity(professor_id),
    FOREIGN KEY (course_id) REFERENCES course(course_id)
);

/**
  인증 / 사용자 관련 인덱스
 */
CREATE INDEX idx_user_status ON user_account(status);

-- 권한
CREATE INDEX idx_user_role_user_id ON user_role(user_id);

/**
  공지사항 인덱스
 */
CREATE INDEX idx_notice_course_id ON notice(course_id);
CREATE INDEX idx_notice_user_id ON notice(user_id);
CREATE INDEX idx_notice_created_at ON notice(created_at);

-- 타겟
CREATE INDEX idx_notice_target_notice_id ON notice_target(notice_id);
CREATE INDEX idx_notice_target_grade ON notice_target(grade_id);
CREATE INDEX idx_notice_target_level ON notice_target(level_id);
CREATE INDEX idx_notice_target_nationality ON notice_target(nationality_id);

-- 파일 첨부
CREATE INDEX idx_notice_att_notice_id ON notice_attachments(notice_id);

/**
  시간표 관련 인덱스
 */
CREATE INDEX idx_timetable_course_id ON timetable(course_id);
CREATE INDEX idx_timetable_day ON timetable(day);

CREATE INDEX idx_course_event_date ON course_event(event_date);
CREATE INDEX idx_course_event_type ON course_event(event_type);

/**
  강의 수업 관련
 */
CREATE INDEX idx_course_sec_id ON course(sec_id);
CREATE INDEX idx_course_professor_id ON course(professor_id);
CREATE INDEX idx_course_is_special ON course(is_special);

-- 타겟
CREATE INDEX idx_course_target_course_id ON course_target(course_id);

/**
  학생/교수/관리자 연결 관련 인덱스
 */
CREATE INDEX idx_student_user_id ON student_entity(user_id);
CREATE INDEX idx_student_grade_id ON student_entity(grade_id);

CREATE INDEX idx_cp_course_id ON course_professor(course_id);
CREATE INDEX idx_cp_professor_id ON course_professor(professor_id);

CREATE INDEX idx_sc_student_id ON student_course(student_id);
CREATE INDEX idx_sc_course_id ON student_course(course_id);