import { Schema, model } from 'mongoose'
import { IUser, UserModel } from './user.interface'



const userSchema = new Schema<IUser>(
  {
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },

    role: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        middleName: {
          type: String
        },
        lastName: {
          type: String,
          required: true,
        }

      }
    },

    address: {
      type: String,
      required: true,
    },

    buyer: {
      type: Schema.Types.ObjectId,
      ref: 'Buyer'
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'Seller'
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true
    }
  }
)

export const User = model<IUser, UserModel>('User', userSchema)
