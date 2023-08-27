const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const memberDao = require("../models/memberDao");
const {
  validateMemberId,
  validateMemberPassword,
  validateMemberEmail,
  validateMemberPhonenumber,
  validateMemberBirthday,
  validateMemberGender,
} = require("../utils/validators");

const hashPassword = async (memberPassword) => {
  const saltRounds = 10;

  return await bcrypt.hash(memberPassword, saltRounds);
};

const signUp = async (
  memberSignInId,
  memberPassword,
  memberName,
  memberPhoneNumber,
  memberEmail,
  memberBirthday,
  memberGender
) => {
  validateMemberPassword(memberPassword);
  validateMemberEmail(memberEmail);
  validateMemberPhonenumber(memberPhoneNumber);
  validateMemberBirthday(memberBirthday);
  validateMemberGender(memberGender);
  validateMemberId(memberSignInId);

  const member = await memberDao.getMemberByMemberId(memberSignInId);
  console.log(member);
  if (member) {
    const err = new Error("duplicated member");
    err.statusCode = 400;
    throw err;
  }

  const hashedPassword = await hashPassword(memberPassword);
  const createMember = await memberDao.createMember(
    memberSignInId,
    hashedPassword,
    memberName,
    memberPhoneNumber,
    memberEmail,
    memberBirthday,
    memberGender
  );
  return createMember;
};

const signIn = async (memberSignInId, memberPassword) => {
  const member = await memberDao.getMemberByMemberId(memberSignInId);

  if (!member) {
    const err = new Error("INVALID_MEMBER");
    err.statusCode = 401;

    throw err;
  }

  const isMatched = await bcrypt.compare(memberPassword, member.password);

  if (!isMatched) {
    const err = new Error("INVALID_MEMBER");
    err.statusCode = 401;

    throw err;
  }

  const accessToken = jwt.sign({ id: member.id }, process.env.JWT_SECRET, {
    algorithm: process.env.JWT_ALGORITHM,
    expiresIn: process.env.JWT_EXPIRE_IN,
  });
  return accessToken;
};

module.exports = {
  signUp,
  signIn,
};
