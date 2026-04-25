CREATE TABLE app.USERS (
    ID NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    FULL_NAME VARCHAR2(100) NOT NULL,
    PHONE VARCHAR2(20) UNIQUE NOT NULL,
    EMAIL VARCHAR2(100) UNIQUE NOT NULL,
    PASSWORD_HASH VARCHAR2(255) NOT NULL,
    CREATED_AT DATE DEFAULT SYSDATE
);

-- Người giám hộ
CREATE TABLE app.guardian (
    id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    full_name VARCHAR2(255) NOT NULL,
    identity_number VARCHAR2(12) NOT NULL,
    phone VARCHAR2(15) NOT NULL,
    email VARCHAR2(255),

    created_at DATE DEFAULT SYSDATE
);


-- Hồ sơ bệnh nhân --
CREATE TABLE app.patient (
    id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    full_name VARCHAR2(255) NOT NULL,
    gender VARCHAR2(10) CHECK (gender IN ('male', 'female')),
    dob DATE NOT NULL,
    identity_number VARCHAR2(12) NOT NULL,
    bhyt VARCHAR2(50),

    phone VARCHAR2(15) NOT NULL,
    email VARCHAR2(255),

    province VARCHAR2(100),
    ward VARCHAR2(100),
    address_detail VARCHAR2(255),

    job VARCHAR2(100),
    ethnicity VARCHAR2(50),

    relation VARCHAR2(50),

    guardian_id NUMBER,
    user_id NUMBER NOT NULL, -- 🔥 thêm user_id

    is_deleted NUMBER(1) DEFAULT 0 CHECK (is_deleted IN (0,1)),

    created_at DATE DEFAULT SYSDATE,

    -- 🔥 constraints
    CONSTRAINT fk_patient_guardian 
        FOREIGN KEY (guardian_id) 
        REFERENCES guardian(id),

    CONSTRAINT fk_patient_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
);

CREATE INDEX idx_patient_phone ON app.patient(phone);
CREATE INDEX idx_patient_guardian ON app.patient(guardian_id);
CREATE INDEX idx_patient_user ON app.patient(user_id);

DROP TABLE app.patient CASCADE CONSTRAINTS;

CREATE TABLE app.PAYMENTS (
    PAYMENT_ID      NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    APPOINTMENT_ID  NUMBER NOT NULL,
    AMOUNT          NUMBER(12,2) NOT NULL,
    PAYMENT_METHOD  VARCHAR2(50) NOT NULL, -- MOMO, VNPAY
    STATUS          VARCHAR2(50) NOT NULL,  -- PENDING, SUCCESS, FAILED
    ORDER_ID        VARCHAR2(100) UNIQUE NOT NULL,
    CREATED_AT      DATE DEFAULT SYSDATE,
    UPDATED_AT      DATE,

    CONSTRAINT FK_PAYMENT_APPOINTMENT
    FOREIGN KEY (APPOINTMENT_ID)
    REFERENCES app.APPOINTMENTS(APPOINTMENT_ID)
);