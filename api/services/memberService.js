const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const memberDao = require('../models/memberDao');

const hashPassword = async (memberPassword) => {
    const saltRounds = 10;

    return await bcrypt.hash(memberPassword, saltRounds);
};



const signUp = async ( memberId, memberPassword, memberName, memberPhonenumber, memberEmail, memberBirthday, memberGender ) => {

    const member = await memberDao.getMemberById(memberId);
    console.log(member);
    if (member) {
        const err = new Error('duplicated member');
        err.statusCode = 400;
        throw err;
    }

    const hashedPassword = await hashPassword(memberPassword);
    const createMember = await memberDao.createMember(
        memberId,
        hashedPassword,
        memberName,
        memberPhonenumber,
        memberEmail,
        memberBirthday,
        memberGender
    );
    return createMember;
};

const signIn = async (memberId, memberPassword) => {
    const member = await memberDao.getMemberById(memberId);
    
    if(!member) {
        const err = new Error('INVALID_MEMBER');
        err.statusCode = 401;

        throw err;
    };
    
    const isMatched = await bcrypt.compare(memberPassword, member.password);
    
    if (!isMatched) {
        const err = new Error('INVALID_MEMBER');
        err.statusCode = 401;

        throw err;
    };

    const accessToken = jwt.sign({ id: member.id }, process.env.JWT_SECRET, 
        {algorithm: process.env.JWT_ALGORITHM, expiresIn: process.env.JWT_EXPIRE_IN}
    );
    return accessToken;
};

module.exports = {
    signUp,
    signIn
};