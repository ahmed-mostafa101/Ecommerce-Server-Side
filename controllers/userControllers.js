const User = require('../models/userModel');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); 
const crypto = require('crypto');

exports.register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'auth/email-already-in-use' });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'auth/invalid-email' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword
    });

    await user.save();

    res.status(201).json({ message: 'Account has been created successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'auth/invalid-credential' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'auth/invalid-credential' });
    }

    const accessToken = jwt.sign({ id: user._id }, "avj%234aed%2A3jbk69%2A%23ack", { expiresIn: '12h' });

    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.resetPasswordRequest = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const resetToken = crypto.randomBytes(3).toString('hex');
    const resetTokenExpiry = Date.now() + (2 * 60 * 1000);

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpiry;
    await user.save();

    res.json({ resetToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.resetPassword = async (req, res) => {
  const { resetToken, newPassword } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpires: { $gt: Date.now() } 
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    res.json({ message: 'Password has been reset successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found.'})
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.updateProfile = async (req, res) => {
  const userId = req.user.id; 

  try {
    const { firstName, lastName, email, profileImage, age, phone, address } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          ...(firstName && { firstName }), 
          ...(lastName && { lastName }),
          ...(email && { email }),
          ...(profileImage && { profileImage }),
          ...(age && { age }),
          ...(phone && { phone }),
          ...(address && { address })
        },
      },
      { new: true, runValidators: true }
    ).select('-password'); 

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json( { message: 'Profile updated successfully.'}, user);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'This email already in use.' });
    }
    res.status(500).json({ message: error.message });
  }
};
