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
  image: {type: String, default: ""},
  imageFileName: {type: String, default: ""},

  isLoggedIn: {
    type: Boolean,
    default: false,
  },
  isActivated: {
    type: Boolean,
    default: true,
  },
  pinState: {
    type: Boolean,
    default: false,
  },

  colorScheme: {
    type: Number,
    default: 2,
  },
  tag: {
    type: String,
  },
  current: {
    type: Boolean,
    default: false,
  },
  currentCount: {
    type: Number,
    default: 0,
  },
  successfulDepositCount: {
    type: Number,
    default: 0,
  },
  succesfulWithdrawalCount: {
    type: Number,
    default: 0,
  },
  registrationDateTime: {
    type: Date,
  },
  bonus: {
    type: [
      {
        fundingType: String,
        bonusAmount: Number,
        registrationDateTime: Date,
        identifierId: String,
        status: String,
        amount: String,
        totalAmount: String,
        betId: String,
        number: Number,
        depositName: String,
        momoNumber: Number,
        companyWithdrawalAddress: String,
        withdrawalCode: String,
        withdrawalName: String,
        withdrawalNumber: Number,
        recipientName: String,
        recipientTag: String,
        service: String,
        bonusBalance: Number,
        paymentConfirmation: String,
        fedapayTransactionId: String || Number,
      },
    ],
  },

  isOutOfFunds: {
    type: Boolean,
    default: false,
  },
  isDepositsOpen: {
    type: Boolean,
    default: true,
  },
  isWithdrawalsOpen: {
    type: Boolean,
    default: true,
  },
  supplementaryBetId: {
    type: [
      {
        type: String,
      },
    ],
  },
  referrals: {
    type: [
      {
        type: String,
      },
    ],
  },
  bonusBalance: {
    type: Number,
    default: 0,
  },
  restrictedBonusBalance: {
    type: Number,
    default: 0,
  },
  disbursedBonusBalance: {
    type: Number,
    default: 0,
  },
  referer: {type: String, default: ""},
  pendingDeposit: {
    type: [
      {
        fedapayTransactionId: String || Number,
        transactionId: String,
        createdAt: String,
        status: String,
        amount: String || Number,
        betId: String || Number,
        momoName: String || Number,
        momoNumber: String || Number,
        paymentConfirmation: String,
        totalAmount: String,
        authenticatedDeposit: {
          type: Boolean,
          default: true,
        },
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
        recipientid: String,
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
        userEmail: String,
        subadminEmail: String,
        fedapayTransactionId: String || Number,
        service: String,
        bonusBalance: Number,
        paymentConfirmation: String,
        totalAmount: String,
        QrCodeDepositsId: String,
        authenticatedDeposit: {
          type: Boolean,
          default: true,
        },
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

const adminSchema = new Schema({
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
  image: {type: String, default: ""},
  imageFileName: {type: String, default: ""},

  isLoggedIn: {
    type: Boolean,
    default: false,
  },
  isActivated: {
    type: Boolean,
    default: true,
  },
  pinState: {
    type: Boolean,
    default: false,
  },
  bonusBalance: {
    type: Number,
    default: 0,
  },
  pin: {
    type: String,
  },
  bonus: {
    type: [
      {
        type: String,
        bonusAmount: Number,
        time: Date,
        transactionId: String,
        status: String,
        mainAmount: String,
        totalAmount: String,
        betId: String,
        number: Number,
        depositName: String,
        depositNumber: Number,
        companyWithdrawalAddress: String,
        withdrawalCode: String,
        withdrawalName: String,
        withdrawalNumber: Number,
        recipientName: String,
        recipientTag: String,
        service: String,
        bonusBalance: Number,
        fedapayTransactionId: String || Number,
      },
    ],
  },
  colorScheme: {
    type: Number,
    default: 2,
  },
  tag: {
    type: String,
  },
  current: {
    type: Boolean,
    default: false,
  },
  currentCount: {
    type: Number,
    default: 0,
  },
  successfulDepositCount: {
    type: Number,
    default: 0,
  },
  succesfulWithdrawalCount: {
    type: Number,
    default: 0,
  },
  registrationDateTime: {
    type: String,
  },

  isOutOfFunds: {
    type: Boolean,
    default: false,
  },
  isDepositsOpen: {
    type: Boolean,
    default: true,
  },
  isWithdrawalsOpen: {
    type: Boolean,
    default: true,
  },
  supplementaryBetId: {
    type: [
      {
        type: String,
      },
    ],
  },
  referrals: {
    type: [
      {
        type: String,
      },
    ],
  },
  pendingDeposit: {
    type: [
      {
        fedapayTransactionId: String || Number,
        transactionId: String,
        createdAt: String,
        status: String,
        amount: String || Number,
        betId: String || Number,
        momoName: String || Number,
        momoNumber: String || Number,
        paymentConfirmation: String,
        totalAmount: String,
        authenticatedDeposit: {
          type: Boolean,
          default: true,
        },
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
        recipientid: String,
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
        userEmail: String,
        subadminEmail: String,
        service: String,
        paymentConfirmation: String,
        totalAmount: String,
        fedapayTransactionId: String || Number,
        QrCodeDepositsId: String,
        authenticatedDeposit: {
          type: Boolean,
          default: true,
        },
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

const subAdminSchema = new Schema({
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
  image: {type: String, default: ""},
  imageFileName: {type: String, default: ""},

  isLoggedIn: {
    type: Boolean,
    default: false,
  },
  isActivated: {
    type: Boolean,
    default: true,
  },
  pinState: {
    type: Boolean,
    default: false,
  },

  colorScheme: {
    type: Number,
    default: 2,
  },
  tag: {
    type: String,
  },
  current: {
    type: Boolean,
    default: false,
  },
  currentCount: {
    type: Number,
    default: 0,
  },
  successfulDepositCount: {
    type: Number,
    default: 0,
  },
  succesfulWithdrawalCount: {
    type: Number,
    default: 0,
  },
  registrationDateTime: {
    type: String,
  },

  isOutOfFunds: {
    type: Boolean,
    default: false,
  },
  isDepositsOpen: {
    type: Boolean,
    default: true,
  },
  isWithdrawalsOpen: {
    type: Boolean,
    default: true,
  },
  supplementaryBetId: {
    type: [
      {
        type: String,
      },
    ],
  },
  referrals: {
    type: [
      {
        type: String,
      },
    ],
  },
  pendingDeposit: {
    type: [
      {
        fedapayTransactionId: String || Number,
        transactionId: String,
        createdAt: String,
        status: String,
        amount: String || Number,
        betId: String || Number,
        momoName: String || Number,
        momoNumber: String || Number,
        paymentConfirmation: String,
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
        userEmail: String,
        subadminEmail: String,
        paymentConfirmation: String,
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

const GenerateQrCodeSchema = new Schema({
  betId: {type: String, required: true},
  amount: {type: Number, required: true},
  email: String,
  createdAt: String,
  validUntil: String,
  qrcodeStatus: {type: String, required: true, default: "Pending"},
  number: Number,
  fullname: String,
  service: String,
  used: {type: Boolean, required: true, default: false},
  paymentConfirmation: {type: String, required: true, default: "Pending"},
});

const QrCodeDeposits =
  models.qrcodedeposits || model("qrcodedeposits", GenerateQrCodeSchema);
const User = models.users || model("users", userSchema);
const AdminUser = models.admins || model("admins", adminSchema);
const SubAdminUser = models.subadmins || model("subadmins", subAdminSchema);

export {User as default, AdminUser, SubAdminUser, QrCodeDeposits};

