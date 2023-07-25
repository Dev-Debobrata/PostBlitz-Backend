import { Schema, model } from 'mongoose';
import { IAdmin } from '../utils/types';

/**
 * @description - Admin Schema
 * @constructor
 * @param {string} sessionId - Session Id generated with token
 * @param {string} name - Name of the user
 * @param {string} username - Username of the user
 * @param {string} password - Hashed Password of the user
 * @param {string} email - Email of the user
 * @param {string} address - Address of the suer
 * @param {string} pincode - Pincode of the user
 * @param {string} country - Country of the user
 * @param {number} created_At - Created At Timestamp
 * @param {number} updated_At - Updated At Timestamp
 * @returns {string} Admin Schema
 */

const adminSchema = new Schema<IAdmin>({
  sessionId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  pincode: {
    type: Number,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  created_At: {
    type: Number,
    required: true
  },
  updated_At: {
    type: Number,
    required: true
  }
});

export const Admin = model<IAdmin>('Admin', adminSchema);
