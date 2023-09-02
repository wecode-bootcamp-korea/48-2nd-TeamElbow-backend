const jwt = require("jsonwebtoken");
const memberService = require("../services/memberService");

const loginRequired = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization;
    if (!accessToken) {
      const error = new Error("NEED_ACCESS_TOKEN");
      error.statusCode = 401;
      return res.status(error.statusCode).json({ message: error.message });
    }

    const payload = await jwt.verify(accessToken, process.env.JWT_SECRET);

    const member = await memberService.getMemberByMemberId(payload["member_sign_in_id"]);

    if (!member) {
      const error = new Error("USER_DOES_NOT_EXIST");
      error.statusCode = 404;
      return res.status(error.statusCode).json({ message: error.message });
    }

    req.member = member;
    next();
  } catch {
    const error = new Error("INVALID_ACCESS_TOKEN");
    error.statusCode = 401;
    return res.status(error.statusCode).json({ message: error.message });
  }
};
module.exports = { loginRequired };
