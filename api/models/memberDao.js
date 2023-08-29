const {dataSource} = require('./dataSource');

const createMember = async (memberSignInId, hashedPassword, memberName, memberPhoneNumber, memberEmail, memberBirthday, memberGender) => {
    try {
        const result = await dataSource.query(
            `INSERT INTO members (
                member_sign_in_id,
                password,
                name,
                phone_number,
                email,
                birthday,
                gender
            ) VALUES (
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?
            );
            `, 
            [memberSignInId, hashedPassword, memberName, memberPhoneNumber, memberEmail, memberBirthday, memberGender]
        );
        return result;
    } catch (err) {
        const error = new Error('dataSource Error');
        error.statusCode = 400;
        throw error;
    }
};

const getMemberByMemberId = async (memberSignInId) => {
    const [member] = await dataSource.query(
        `
        SELECT
        id,
        member_sign_in_id,
        password,
        name,
        phone_number,
        email,
        birthday,
        membership_id,
        point,
        gender
        FROM members
        WHERE member_sign_in_id = ?
        `,
        [memberSignInId]
    );
    return member;
};

module.exports = {
    createMember,
    getMemberByMemberId
};