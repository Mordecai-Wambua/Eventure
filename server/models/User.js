import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'organizer'], required: true },
  created_at: { type: Date, default: Date.now },
});

const User = mongoose.model('User', UserSchema);
export default User;
