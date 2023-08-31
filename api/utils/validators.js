const validateMemberId = (memberSignInId) => {
    if (!/^[a-zA-Z0-9]{6,}$/.test(memberSignInId)) {
      const error = new Error('Invalid memberId');
      error.statusCode = 400;
      throw error;
    }
  };
  
  const validateMemberPassword = (memberPassword) => {
    if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(memberPassword)) {
      const error = new Error('Invalid password');
      error.statusCode = 400;
      throw error;
    }
  };
  
  const validateMemberEmail = (memberEmail) => {
    if (!/\S+@\S+\.\S+/.test(memberEmail)) {
      const error = new Error('Invalid email');
      error.statusCode = 400;
      throw error;
    }
  };

  const validateMemberBirthday = (memberBirthday) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(memberBirthday)) {
      const error = new Error('Invalid birthday');
      error.statusCode = 400;
      throw error;
    }
  };
  
  const validateMemberGender = (memberGender) => {
    if (!['male', 'female'].includes(memberGender)) {
      const error = new Error('Invalid gender');
      error.statusCode = 400;
      throw error;
    }
  };

  const validateMemberPhonenumber = (memberPhonenumber) => {
    if (!/^01[0-9]{9}$/.test(memberPhonenumber)) {
      const error = new Error('Invalid phone number');
      error.statusCode = 400;
      throw error;
    }
};

  module.exports = {
    validateMemberId,
    validateMemberPassword,
    validateMemberEmail,
    validateMemberBirthday,
    validateMemberGender,
    validateMemberPhonenumber
  };
  