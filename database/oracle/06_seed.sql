INSERT INTO app.USERS (FULL_NAME, PHONE, EMAIL, PASSWORD_HASH)
VALUES ('Nguyen Van A', '0987654321', 'user1@gmail.com', 'User123@');

COMMIT;

INSERT INTO app.guardian (full_name, identity_number, phone, email)
VALUES ('Nguyễn Văn B', '223456789012', '0988888888', 'guardian1@gmail.com');

INSERT INTO app.guardian (full_name, identity_number, phone, email)
VALUES ('Trần Thị C', '223456789013', '0977777777', 'guardian2@gmail.com');

INSERT INTO app.patient (
    full_name, gender, dob, identity_number,
    phone, email, province, ward, address_detail,
    job, ethnicity, relation, guardian_id, user_id
) VALUES (
    'Nguyễn Minh Khôi',
    'male',
    DATE '2010-05-10',
    '123456789014',
    '0901234567',
    'khoi@gmail.com',
    'HCM',
    'Quận 7',
    '123 Nguyễn Văn Linh',
    'Học sinh',
    'Kinh',
    'Con',
    1,
    1
);
COMMIT;


-- 5 Chuyên khoa
INSERT INTO app.department (name, consultation_fee) VALUES ('Nội Tổng Quát', 150000);
INSERT INTO app.department (name, consultation_fee) VALUES ('Nhi', 200000);
INSERT INTO app.department (name, consultation_fee) VALUES ('Sản Phụ', 250000);
INSERT INTO app.department (name, consultation_fee) VALUES ('Da Liễu', 180000);
INSERT INTO app.department (name, consultation_fee) VALUES ('Tai Mũi Họng', 150000);

COMMIT;

BEGIN
   -- =========================
   -- KHOA NỘI (ID: 1) - 3 BS
   -- =========================
   INSERT INTO app.doctor (name, title, department_id, short_bio, experience_years, image_url) 
   VALUES ('Nguyễn Văn Thạnh', 'TS.BS', 1, 'Chuyên gia nội khoa với hơn 20 năm kinh nghiệm.', 20, '/images/dr-thanh.jpg');

   INSERT INTO app.doctor (name, title, department_id, short_bio, experience_years, image_url) 
   VALUES ('Lê Thị Phương Thảo', 'ThS.BS', 1, 'Tốt nghiệp ĐH Y Dược, chuyên điều trị các bệnh mãn tính.', 8, '/images/dr-thao.jpg');

   INSERT INTO app.doctor (name, title, department_id, short_bio, experience_years, image_url) 
   VALUES ('Phạm Quang Huy', 'BS', 1, 'Khám và điều trị bệnh nội tổng quát, theo dõi sức khỏe định kỳ.', 6, '/images/dr-huy.jpg');


   -- =========================
   -- KHOA NHI (ID: 2) - 3 BS
   -- =========================
   INSERT INTO app.doctor (name, title, department_id, short_bio, experience_years, image_url)
   VALUES ('Trần Hoàng Nam', 'BS.CKI', 2, 'Yêu trẻ, có kỹ năng tâm lý trẻ em xuất sắc.', 12, '/images/dr-nam.jpg');

   INSERT INTO app.doctor (name, title, department_id, short_bio, experience_years, image_url)
   VALUES ('Phạm Minh Anh', 'ThS.BS', 2, 'Chuyên gia dinh dưỡng và nhi khoa tổng quát.', 6, '/images/dr-minhanh.jpg');

   INSERT INTO app.doctor (name, title, department_id, short_bio, experience_years, image_url)
   VALUES ('Nguyễn Thị Mai', 'BS', 2, 'Theo dõi phát triển thể chất và tiêm chủng cho trẻ.', 4, '/images/dr-mai.jpg');


   -- =========================
   -- KHOA SẢN (ID: 3) - 2 BS
   -- =========================
   INSERT INTO app.doctor (name, title, department_id, short_bio, experience_years, image_url)
   VALUES ('Đặng Thu Huyền', 'BS.CKII', 3, 'Chuyên gia sản phụ khoa, hỗ trợ sinh sản.', 18, '/images/dr-huyen.jpg');

   INSERT INTO app.doctor (name, title, department_id, short_bio, experience_years, image_url)
   VALUES ('Nguyễn Thị Lan', 'ThS.BS', 3, 'Theo dõi thai kỳ và tư vấn sinh sản an toàn.', 9, '/images/dr-lan.jpg');


   -- =========================
   -- KHOA DA LIỄU (ID: 4) - 2 BS
   -- =========================
   INSERT INTO app.doctor (name, title, department_id, short_bio, experience_years, image_url)
   VALUES ('Ngô Quốc Bảo', 'BS', 4, 'Điều trị mụn nội khoa và thẩm mỹ da liễu.', 5, '/images/dr-bao.jpg');

   INSERT INTO app.doctor (name, title, department_id, short_bio, experience_years, image_url)
   VALUES ('Trần Thị Yến', 'ThS.BS', 4, 'Chuyên điều trị nám, tàn nhang và trẻ hóa da.', 7, '/images/dr-yen.jpg');

   -- =========================
   -- KHOA TAI MŨI HỌNG (ID: 5) - 2 BS
   -- =========================
   INSERT INTO app.doctor (name, title, department_id, short_bio, experience_years, image_url)
   VALUES ('Vũ Đức Trọng', 'ThS.BS', 5, 'Kinh nghiệm phẫu thuật nội soi tai mũi họng.', 10, '/images/dr-trong.jpg');

   INSERT INTO app.doctor (name, title, department_id, short_bio, experience_years, image_url)
   VALUES ('Lê Minh Tuấn', 'BS.CKI', 5, 'Điều trị viêm xoang, viêm tai giữa.', 8, '/images/dr-tuan.jpg');

   COMMIT;
END;
/

DECLARE
    v_start_date DATE := TO_DATE('2026-04-27', 'YYYY-MM-DD'); -- Thứ Hai tuần tới
    v_current_date DATE;
BEGIN
    -- VÒNG LẶP QUA 6 NGÀY (Thứ 2 đến Thứ 7)
    FOR i IN 0..5 LOOP
        v_current_date := v_start_date + i;

        -- DUYỆT TẤT CẢ BÁC SĨ TRONG DANH SÁCH
        FOR r_dr IN (SELECT doctor_id FROM app.doctor) LOOP
            
            -- LOGIC ĐẢO CA: 
            -- (ID bác sĩ + số ngày offset) lẻ -> làm Sáng
            -- (ID bác sĩ + số ngày offset) chẵn -> làm Chiều
            IF MOD(r_dr.doctor_id + i, 2) <> 0 THEN
                -- CA SÁNG (3 khung giờ)
                INSERT INTO app.schedule (doctor_id, work_date, start_time, end_time, max_patients)
                VALUES (r_dr.doctor_id, v_current_date, 
                        CAST(v_current_date AS TIMESTAMP) + INTERVAL '07:30' HOUR TO MINUTE, 
                        CAST(v_current_date AS TIMESTAMP) + INTERVAL '09:00' HOUR TO MINUTE, 6);
                
                INSERT INTO app.schedule (doctor_id, work_date, start_time, end_time, max_patients)
                VALUES (r_dr.doctor_id, v_current_date, 
                        CAST(v_current_date AS TIMESTAMP) + INTERVAL '09:00' HOUR TO MINUTE, 
                        CAST(v_current_date AS TIMESTAMP) + INTERVAL '10:30' HOUR TO MINUTE, 6);

                INSERT INTO app.schedule (doctor_id, work_date, start_time, end_time, max_patients)
                VALUES (r_dr.doctor_id, v_current_date, 
                        CAST(v_current_date AS TIMESTAMP) + INTERVAL '10:30' HOUR TO MINUTE, 
                        CAST(v_current_date AS TIMESTAMP) + INTERVAL '12:00' HOUR TO MINUTE, 6);

            ELSE
                -- CA CHIỀU (3 khung giờ)
                INSERT INTO app.schedule (doctor_id, work_date, start_time, end_time, max_patients)
                VALUES (r_dr.doctor_id, v_current_date, 
                        CAST(v_current_date AS TIMESTAMP) + INTERVAL '13:30' HOUR TO MINUTE, 
                        CAST(v_current_date AS TIMESTAMP) + INTERVAL '15:00' HOUR TO MINUTE, 6);

                INSERT INTO app.schedule (doctor_id, work_date, start_time, end_time, max_patients)
                VALUES (r_dr.doctor_id, v_current_date, 
                        CAST(v_current_date AS TIMESTAMP) + INTERVAL '15:00' HOUR TO MINUTE, 
                        CAST(v_current_date AS TIMESTAMP) + INTERVAL '16:30' HOUR TO MINUTE, 6);

                INSERT INTO app.schedule (doctor_id, work_date, start_time, end_time, max_patients)
                VALUES (r_dr.doctor_id, v_current_date, 
                        CAST(v_current_date AS TIMESTAMP) + INTERVAL '16:30' HOUR TO MINUTE, 
                        CAST(v_current_date AS TIMESTAMP) + INTERVAL '18:00' HOUR TO MINUTE, 6);
            END IF;
        END LOOP;
    END LOOP;

    COMMIT;
END;
/

INSERT INTO app.appointments (
    schedule_id,
    patient_id,
    user_id,
    status,
    fee,
    note,
    expired_at
) VALUES (
    91,
    1,
    1,
    'pending',
    200000,
    'Đặt lịch khám tổng quát',
    SYSTIMESTAMP + INTERVAL '15' MINUTE-- hết hạn sau 15 phút
);
INSERT INTO app.appointments (
    schedule_id,
    patient_id,
    user_id,
    status,
    fee,
    note,
    expired_at
) VALUES (
    2,
    1,
    1,
    'cancelled',
    150000,
    'Khách huỷ do bận việc',
    SYSTIMESTAMP - INTERVAL '1' DAY -- đã hết hạn trước đó
);

INSERT INTO app.appointments (
    schedule_id,
    patient_id,
    user_id,
    status,
    fee,
    queue_number,
    note,
    expired_at
) VALUES (
    3,
    1,
    1,
    'confirmed',
    300000,
    1,
    'Khám chuyên khoa tim mạch',
    NULL -- không cần expired vì đã hoàn thành
);

DELETE FROM app.appointments;
COMMIT;

