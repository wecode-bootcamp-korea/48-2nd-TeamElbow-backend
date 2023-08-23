const dataSource = require('./dataSource');

const createMember = async (memberId, hashedPassword, memberName, memberPhonenumber, memberEmail, memberBirthday, memberGender) => {
    try {
        const result = await dataSource.query(
            `INSERT INTO members (
                member_id,
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
            )
            `,
            [memberId, hashedPassword, memberName, memberPhonenumber, memberEmail, memberBirthday, memberGender]
        );
        return result;
    } catch (err) {
        const error = new Error('dataSource Error');
        error.statusCode = 400;
    throw error;
    }
};

const getMemberById = async (memberId) => {
    const [member] = await dataSource.query(
            `
            SELECT
            member_id,
            password,
            name,
            phone_number,
            email,
            birthday,
            gender
            FROM members
            WHERE member_id = ?
            `,
            [memberId]
        );
        return member;
    } ;

module.exports = { 
    createMember,
    getMemberByMemberId
 };