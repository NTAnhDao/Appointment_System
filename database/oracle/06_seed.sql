INSERT INTO app.USERS (FULL_NAME, PHONE, EMAIL, PASSWORD_HASH)
VALUES ('Nguyen Van A', '0987654321', 'user1@gmail.com', 'User123@');

COMMIT;


INSERT INTO app.guardian (full_name, identity_number, phone, email)
VALUES ('Nguyễn Văn B', '123456789012', '0988888888', 'guardian1@gmail.com');

INSERT INTO app.guardian (full_name, identity_number, phone, email)
VALUES ('Trần Thị C', '123456789013', '0977777777', 'guardian2@gmail.com');

INSERT INTO app.patient (
    full_name, gender, dob, identity_number,
    phone, email, province, ward, address_detail,
    job, ethnicity, relation, guardian_id
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
    1
);
COMMIT;
