import { Schema, model, models } from "mongoose";
const userSchema = new Schema({
  fullname: {
    type: String,
    required: [true, "Please provide a fullname"],
  },
  betId: {
    type: String,
    required: [true, "Please provide your betId"],
  },
  number: {
    type: Number,
    required: [true, "Please provide a phone"],
  },

  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
fedapayId: {
  type: Number,
},
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isUser: {
    type: Boolean,
    default: false,
  },

  isSubAdminDeposits: {
    type: Boolean,
    default: false,
  },

  isSubAdminWithdrawals: {
    type: Boolean,
    default: false,
  },

  cashdeskDialcode: {
    type: String,
  },

  isLoggedIn: {
    type: Boolean,
    default: false,
  },

  isOutOfFunds: {
    type: Boolean,
    default: false,
  },

  supplementaryBetId: {
    type: [
      {
        type: String,
      },
    ],
  },

  cashdeskAddress: {
    type: {
      city: String,
      street: String,
    },
  },
  sessionId: {
    type: String,
  },
  transactionHistory: {
    type: [
      {
        username: String,
        userNumber: Number,
        userid: String,
        status: String,
        registrationDateTime: Date,
        withdrawalCode: String,
        momoName: String,
        momoNumber: Number,
        amount: Number,
        network: String,
        betId: String,
        transactionId: String,
        fundingType: String,
        identifierId: String,
        isSubmitted: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },

  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
});

const User = models.users || model("users", userSchema);

export default User;
