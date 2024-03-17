const { user, role, otp } = require("../lib/database.connection");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const {
  passwordMismatchException,
} = require("../exceptions/passwordMismatch.exception");
const {
  alreadyExistsException,
} = require("../exceptions/alreadyExists.exception");
const { notFoundException } = require("../exceptions/notFound.exception");

const generateToken = require("../utils/tokenGenerator");
const { SendMail } = require("../utils/sendMail");
const {
  tokenExpiredException,
} = require("../exceptions/tokenExpired.exception");
const { hashPassword } = require("../utils/hashPassword");

class UserService {
  async create(payload) {
    let userData = await user.findOne({ where: { email: payload.email } }); //fetch user email
    if (userData == null) {
      if (payload.password == payload.confirmPassword) {
        const { password } = payload;
        payload.password = await hashPassword(password);
        const userData = await user.create(payload); //user create
        userData.password = undefined;

     

        return userData;
      } else {
        throw new passwordMismatchException();
      }
    } else {
      throw new alreadyExistsException("User");
    }
  }

  async sendOtp(payload) {
    const otpNum = this.generateOTP();
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 5);
    const otpData = {
     otp: otpNum,
      userId: payload.id,
      expiresAt,
    };
   await otp.create(otpData);
    const html = `Hi ${payload.fullName} \n Your OTP is ${otpNum}`;
    const sendEmail = new SendMail(payload.email, "OTP Email", html);
    sendEmail.send();
  }

  async verifyOtp(payload) {
    const otpData = await otp.findOne({
      where: { otp:payload.otp},  
    });
    if (otpData) {
      if (otpData.expiresAt < new Date()) {
        throw new tokenExpiredException();
      }
      otpData.verified = true;
      await otpData.save();
      const userData = await user.findByPk(otpData.userId);
      userData.otpVerified = true;
      await userData.save();
      return true;
    }
    throw new notFoundException("OTP"); 
  }


  generateOTP() {
    const randomNum = crypto.randomInt(100000, 999999);
    const otp = randomNum.toString();
    return otp;
  }



  async update(payload, _user) {
    if (payload.profilePic) {
      // Aes.encrypt("big secret", "pāşšŵōřđ", 256);
      payload.profilePic = IAes.encrypt(
        payload.profilePic,
        process.env.ENCRYPTION_SECRET,
        256
      );
      if (_user.profilePic) {
        const prevImage = IAes.decrypt(
          _user.profilePic,
          process.env.ENCRYPTION_SECRET,
          256
        );
        const deleted = deleteImage(prevImage);
        if (!deleted) {
          throw new Error("Failed to delete");
        }
      }
    }
    return await user.update(payload, {
      where: { id: _user.id },
    });
  }

  async findById(id) {
    const returnData = await user.findOne({ where: { id } });
    if (returnData === null) {
      throw new notFoundException("User");
    }
    return returnData;
  }

  async login(payload) {
    // const decryptedData = DecryptUser(payload);

    // const encryptedUser = EncryptUser(payload);
    const { email, password, deviceToken } = payload;
    let _user = await user.findOne({
      where: { email },
    });
    _user.deviceToken = deviceToken;
    await _user.save();
    if (_user != null) {
      const compared = await bcrypt.compare(password, _user.password); //compare hashed password
      if (compared) {
        const token = generateToken(_user, 68400); //jwt token
           await this.sendOtp(_user);
        return { token: token,verified:_user.otpVerified };
      } else {
        throw new passwordMismatchException();
      }
    } else {
      throw new notFoundException("User");
    }
  }

  async forgotPassword(host, payload) {
    const _user = await user.findOne({ where: { email: payload.email } });
    if (!_user) {
      throw new notFoundException("User with this email");
    }
    _user.resetPasswordToken = generateToken(user, 68400);
    _user.resetPasswordExpires = Date.now() + 3600000; // expires in an hour
    await _user.save();
    const link = `http://localhost:5173/updatePassword/${_user.id}?token=${_user.resetPasswordToken}`;
    const html = `Hi ${_user.username} \n
      Please click on the following link <a href="${link}">click here</a> to reset your password. \n\n
      If you did not request this, please ignore this email and your password will remain unchanged.\n`;
    const sendEmail = new SendMail(_user.email, "Password Reset Email", html);
    sendEmail.send();
    return true;
  }

  //verify token
  async verifyToken(payload, id) {
    const _user = await user.findOne({
      where: { resetPasswordToken: payload.token, id: id },
    });
    if (!_user) throw new notFoundException("User");
    if (await this.checkExpiryDate(_user)) throw new tokenExpiredException();
    return true;
  }

  //reset password
  async resetPassword(payload, id) {
    await this.verifyToken(payload.token, id);

    const _user = await this.findById(id);

    const { password } = payload;
    payload.password = hashPassword(password);
    await user.update(payload, {
      where: { id: _user.id },
    });

    const html = `Hi ${_user.username} \n
        Your password has been successfully reset.`;
    const sendEmail = new SendMail(_user.email, "Password Reset Email", html);
    sendEmail.send();
    return true;
  }

  async checkExpiryDate(_user) {
    const expiryDate = _user.resetPasswordExpires;
    return expiryDate < new Date() ? true : false;
  }

  async getRoleOfUser(userId) {
    const userData = await this.findById(userId);
    const roleData = await role.findByPk(userData.roleId);
    return roleData;
  }
}

module.exports = new UserService();
