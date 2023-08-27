const memberService = require("../services/memberService");
const { catchAsync } = require("../utils/error");

const signUp = catchAsync(async (req, res) => {
  const {
    memberSignInId,
    memberPassword,
    memberName,
    memberPhoneNumber,
    memberEmail,
    memberBirthday,
    memberGender,
  } = req.body;

  if (
    !memberSignInId ||
    !memberPassword ||
    !memberName ||
    !memberPhoneNumber ||
    !memberEmail ||
    !memberBirthday ||
    !memberGender
  ) {
    const error = new Error("KEY_ERROR");
    error.statusCode = 400;

    throw error;
  }

  await memberService.signUp(
    memberSignInId,
    memberPassword,
    memberName,
    memberPhoneNumber,
    memberEmail,
    memberBirthday,
    memberGender
  );

  res.status(201).json("createMember");
});

const signIn = async (req, res) => {
  const { memberSignInId, memberPassword } = req.body;

  try {
    const accessToken = await memberService.signIn(memberSignInId, memberPassword);

    res.status(200).json({ accessToken: accessToken });
  } catch (error) {
    res.status(error.statusCode || 401).json({ messege: error.message });
  }
};

module.exports = {
  signUp,
  signIn,
};
