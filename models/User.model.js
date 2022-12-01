const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    phone: Number, 
    Address: String,   
    accountType: {
      type: String,
      enum: ['admin', 'client'],
      required: [true, "Account type is required."],
    },  
    book: { type: Schema.Types.ObjectId, ref: 'Book'}    
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
