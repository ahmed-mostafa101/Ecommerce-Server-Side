const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 20
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 20
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String, 
    default: 'https://i.ibb.co/T00Rfnt/default-profile.png' 
  },
  age: {
    type: Number,
    min: 10,
    max: 110
  },
  phone: {
    type: String, 
    sparse: true  
  },
  address: {
    country: {
      type: String,
      trim: true
    },
    city: {
      type: String,
      trim: true
    },
    street: {
      type: String,
      trim: true
    }
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date
}, { timestamps: true, versionKey: false });

const User = mongoose.model('User', userSchema);
module.exports = User;
