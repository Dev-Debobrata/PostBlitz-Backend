import { Schema, model } from 'mongoose';
import { IUser } from '../utils/typings';

/**
 * @description - User Schema
 * @constructor
 * @param {string} sessionId - Session Id generated with token
 * @param {string} name - Name of the user
 * @param {string} username - Username of the user
 * @param {string} password - Hashed Password of the user
 * @param {string} image - Profile Picture of the user
 * @param {string} email - Email of the user
 * @param {string} address - Address of the user
 * @param {string} pincode - Pincode of the user
 * @param {string} country - Country of the user
 * @param {number} blogs - Number of blogs the user wrote
 * @param {number} likedBlogs - Number of blogs the user liked
 * @param {number} created_At - Created At Timestamp
 * @param {number} updated_At - Updated At Timestamp
 * @returns {string} User Schema
 */

const userSchema = new Schema<IUser>({
  sessionId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    maxlength: [100, 'Name is too long']
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    minlength: [6, 'Minimum 6 characters are required'],
    maxlength: [30, 'Username should not be more than 30 characters']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    match: [
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      'Password must be at least 8 characters with one Uppercase, one lowercase, one special character and one number'
    ]
  },
  image: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Not a valid email']
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    maxlength: [150, 'Address is too long']
  },
  pincode: {
    type: Number,
    required: [true, 'Pincode is required'],
    match: [/^[1-9][0-9]{6}$/, 'Not a valid pincode']
  },
  country: {
    type: String,
    required: [true, 'Country is required'],
    maxlength: [50, 'Country is too long']
  },
  blogs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Blog',
      required: false
    }
  ],
  likedBlogs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Blog',
      required: false
    }
  ],
  created_At: {
    type: Number,
    required: true
  },
  updated_At: {
    type: Number,
    required: true
  }
});

export const User = model<IUser>('User', userSchema);
