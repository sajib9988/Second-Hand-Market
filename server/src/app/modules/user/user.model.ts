import mongoose, { Schema } from 'mongoose';
import { IUser, UserModel, UserRole } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
import AppError from '../../errors/appError';
import { StatusCodes } from 'http-status-codes';

// Create the User schema based on the interface
const userSchema = new Schema<IUser, UserModel>(
   {
      name: {
         type: String,
         required: true,
      },
      email: {
         type: String,
         required: true,
         unique: true,
         lowercase: true,
      },
      password: {
         type: String,
         required: true,
      },
      role: {
         type: String,
         enum: [UserRole.ADMIN, UserRole.USER],
         default: UserRole.USER,
      },

  
   
      lastLogin: {
         type: Date,
         default: Date.now,
      },
      isBlocked: {
         type: Boolean,
         default: false,
      },
      otpToken: {
         type: String,
         default: null
      },
   },
   {
      timestamps: true,
   }
);

userSchema.pre<IUser>('save', async function (next) {
   const user = this;

   user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_rounds)
   );

   next();
});

userSchema.post('save', function (doc, next) {
   doc.password = '';
   next();
});

userSchema.set('toJSON', {
   transform: (_doc, ret) => {
      delete ret.password;
      return ret;
   },
});

userSchema.statics.isPasswordMatched = async function (
   plainTextPassword,
   hashedPassword
) {
   return await bcrypt.compare(plainTextPassword, hashedPassword);
};

userSchema.statics.isUserExistsByEmail = async function (email: string) {
   return await User.findOne({ email }).select('+password');
};

userSchema.statics.checkUserExist = async function (userId: string) {
   const existingUser = await this.findById(userId);

   if (!existingUser) {
      throw new AppError(StatusCodes.NOT_ACCEPTABLE, 'User does not exist!');
   }

  

   return existingUser;
};

const User = mongoose.model<IUser, UserModel>('User', userSchema);
export default User;
