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

// password hashing
// UserSchema.pre('save', function (next) {
//   if (!this.isModified('password')) {
//     return next();
//   }
//   try {
//     this.password = bcrypt.hashSync(this.password, 10);
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

const User = mongoose.model('User', UserSchema);
export default User;
